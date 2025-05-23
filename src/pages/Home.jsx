import React from 'react';

const Home = () => {
  return (
    <div style={{
      minHeight: '500px',
      backgroundColor: '#000000',
      color: '#ffffff',
      padding: '40px 20px',
      textAlign: 'center'
    }}>
      <h1 style={{
        fontSize: '48px',
        fontWeight: 'bold',
        marginBottom: '20px',
        color: '#ffffff'
      }}>
        AI-KUDO
      </h1>
      
      <h2 style={{
        fontSize: '24px',
        color: '#9CA3AF',
        marginBottom: '30px',
        fontWeight: 'normal'
      }}>
        Unleash the Dark Arts of AI Creation
      </h2>
      
      <p style={{
        fontSize: '18px',
        color: '#6B7280',
        marginBottom: '40px',
        lineHeight: '1.6',
        maxWidth: '600px',
        margin: '0 auto 40px auto'
      }}>
        Step into the shadows of creativity where artificial intelligence meets artistic mystique.
      </p>
      
      <button style={{
        backgroundColor: '#7C3AED',
        color: '#ffffff',
        padding: '15px 30px',
        fontSize: '18px',
        fontWeight: '600',
        border: 'none',
        borderRadius: '25px',
        cursor: 'pointer',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease'
      }}>
        Enter the Void
      </button>
      
      <div style={{
        marginTop: '60px',
        fontSize: '14px',
        color: '#6B7280'
      }}>
        <p>Ready to create dark, mystical artwork?</p>
      </div>
    </div>
  );
};

export default Home;
