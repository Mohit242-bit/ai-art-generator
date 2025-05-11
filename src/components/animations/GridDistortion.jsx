import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import './GridDistortion.css';

const vertexShader = `
uniform float time;
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vUv = uv;
  vPosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

const fragmentShader = `
uniform sampler2D uDataTexture;
uniform sampler2D uTexture;
uniform vec4 resolution;
uniform float time;
uniform float hoverIntensity;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  vec4 offset = texture2D(uDataTexture, vUv);
  
  // Add subtle wave effect when hovering
  float waveX = sin(uv.y * 10.0 + time * 0.5) * 0.005 * hoverIntensity;
  float waveY = cos(uv.x * 10.0 + time * 0.5) * 0.005 * hoverIntensity;
  
  // Combine data texture offset with wave effect
  vec2 finalOffset = offset.rg + vec2(waveX, waveY);
  
  // Apply stronger effect when hovering
  finalOffset *= (1.0 + hoverIntensity * 0.5);
  
  gl_FragColor = texture2D(uTexture, uv - 0.02 * finalOffset);
}`;

const GridDistortion = ({
  grid = 15,
  mouse = 0.1,
  strength = 0.15,
  relaxation = 0.9,
  imageSrc,
  className = '',
  hoverStrength = 1.5, // Multiplier for distortion strength on hover
  animationSpeed = 1.0 // Speed of the hover animation
}) => {
  const containerRef = useRef(null);
  const imageAspectRef = useRef(1);
  const cameraRef = useRef(null);
  const initialDataRef = useRef(null);
  const uniformsRef = useRef(null);
  const isHoveringRef = useRef(false);
  const hoverIntensityRef = useRef(0);
  const requestAnimationFrameId = useRef(null);
  
  // State for animating hover transition
  const [hoverIntensity, setHoverIntensity] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const camera = new THREE.OrthographicCamera(0, 0, 0, 0, -1000, 1000);
    camera.position.z = 2;
    cameraRef.current = camera;

    const uniforms = {
      time: { value: 0 },
      resolution: { value: new THREE.Vector4() },
      uTexture: { value: null },
      uDataTexture: { value: null },
      hoverIntensity: { value: 0 } // New uniform for hover intensity
    };
    uniformsRef.current = uniforms;

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(imageSrc, (texture) => {
      texture.minFilter = THREE.LinearFilter;
      imageAspectRef.current = texture.image.width / texture.image.height;
      uniforms.uTexture.value = texture;
      handleResize();
    });

    const size = grid;
    const data = new Float32Array(4 * size * size);
    for (let i = 0; i < size * size; i++) {
      data[i * 4] = Math.random() * 255 - 125;
      data[i * 4 + 1] = Math.random() * 255 - 125;
    }

    initialDataRef.current = new Float32Array(data);

    const dataTexture = new THREE.DataTexture(
      data,
      size,
      size,
      THREE.RGBAFormat,
      THREE.FloatType
    );
    dataTexture.needsUpdate = true;
    uniforms.uDataTexture.value = dataTexture;

    const material = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      uniforms,
      vertexShader,
      fragmentShader,
    });
    const geometry = new THREE.PlaneGeometry(1, 1, size - 1, size - 1);
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    const handleResize = () => {
      const width = container.offsetWidth;
      const height = container.offsetHeight;
      const containerAspect = width / height;
      const imageAspect = imageAspectRef.current;

      renderer.setSize(width, height);

      const scale = Math.max(containerAspect / imageAspect, 1);
      plane.scale.set(imageAspect * scale, scale, 1);

      const frustumHeight = 1;
      const frustumWidth = frustumHeight * containerAspect;
      camera.left = -frustumWidth / 2;
      camera.right = frustumWidth / 2;
      camera.top = frustumHeight / 2;
      camera.bottom = -frustumHeight / 2;
      camera.updateProjectionMatrix();

      uniforms.resolution.value.set(width, height, 1, 1);
    };

    const mouseState = { x: 0, y: 0, prevX: 0, prevY: 0, vX: 0, vY: 0 };

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1 - (e.clientY - rect.top) / rect.height;
      mouseState.vX = x - mouseState.prevX;
      mouseState.vY = y - mouseState.prevY;
      Object.assign(mouseState, { x, y, prevX: x, prevY: y });
    };

    const handleMouseEnter = () => {
      isHoveringRef.current = true;
    };

    const handleMouseLeave = () => {
      isHoveringRef.current = false;
      Object.assign(mouseState, { x: 0, y: 0, prevX: 0, prevY: 0, vX: 0, vY: 0 });
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);
    handleResize();

    const animate = () => {
      requestAnimationFrameId.current = requestAnimationFrame(animate);
      
      // Update time uniform
      uniforms.time.value += 0.05 * animationSpeed;

      // Smooth hover intensity transition
      if (isHoveringRef.current && hoverIntensityRef.current < 1) {
        hoverIntensityRef.current = Math.min(hoverIntensityRef.current + 0.05, 1);
      } else if (!isHoveringRef.current && hoverIntensityRef.current > 0) {
        hoverIntensityRef.current = Math.max(hoverIntensityRef.current - 0.05, 0);
      }
      
      uniforms.hoverIntensity.value = hoverIntensityRef.current;
      setHoverIntensity(hoverIntensityRef.current);

      const data = dataTexture.image.data;
      for (let i = 0; i < size * size; i++) {
        data[i * 4] *= relaxation;
        data[i * 4 + 1] *= relaxation;
      }

      const gridMouseX = size * mouseState.x;
      const gridMouseY = size * mouseState.y;
      const maxDist = size * mouse;
      
      // Apply stronger effects when hovering
      const currentStrength = strength * (1 + hoverStrength * hoverIntensityRef.current);

      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          const distance = Math.pow(gridMouseX - i, 2) + Math.pow(gridMouseY - j, 2);
          if (distance < maxDist * maxDist) {
            const index = 4 * (i + size * j);
            const power = Math.min(maxDist / Math.sqrt(distance), 10);
            
            // Apply mouse movement effect
            data[index] += currentStrength * 100 * mouseState.vX * power;
            data[index + 1] -= currentStrength * 100 * mouseState.vY * power;
            
            // Add subtle autonomous movement when hovering
            if (isHoveringRef.current) {
              const noiseX = Math.sin(i / 3 + uniforms.time.value * 0.1) * 2;
              const noiseY = Math.cos(j / 3 + uniforms.time.value * 0.1) * 2;
              data[index] += noiseX * power * hoverIntensityRef.current;
              data[index + 1] += noiseY * power * hoverIntensityRef.current;
            }
          }
        }
      }

      dataTexture.needsUpdate = true;
      renderer.render(scene, camera);
    };
    
    animate();

    return () => {
      if (requestAnimationFrameId.current) {
        cancelAnimationFrame(requestAnimationFrameId.current);
      }
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      dataTexture.dispose();
      if (uniforms.uTexture.value) uniforms.uTexture.value.dispose();
    };
  }, [grid, mouse, strength, relaxation, imageSrc, hoverStrength, animationSpeed]);

  return (
    <div 
      ref={containerRef} 
      className={`distortion-container ${className}`}
      style={{ 
        cursor: 'pointer',
        transition: 'transform 0.3s ease-out', 
        transform: hoverIntensity > 0 ? `scale(${1 + hoverIntensity * 0.03})` : 'scale(1)' 
      }}
    />
  );
};

export default GridDistortion;s
