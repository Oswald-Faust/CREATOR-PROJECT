import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    motDePasse: ''
  });

  
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // On appelle la route de connexion (qui gère créateurs ET entreprises)
      const response = await axios.post('http://localhost:5001/api/auth/login', formData);
      
      // On récupère le fameux "Token" de la réponse !
      const token = response.data.token;
      
      localStorage.setItem('token', token);
      
      setMessage('Connexion réussie ! Redirection...');
      
      // On redirige vers le Dashboard sécurisé
      setTimeout(() => navigate('/dashboard'), 1500);

    } catch (error) {
      setMessage(error.response?.data?.message || 'Erreur lors de la connexion');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', fontFamily: 'sans-serif' }}>
      <h2>Se connecter</h2>
      {message && <div style={{ padding: '10px', background: '#f0f0f0', marginBottom: '15px' }}>{message}</div>}
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
          style={{ padding: '8px' }}
        />
        <input 
          type="password" 
          name="motDePasse" 
          placeholder="Mot de passe" 
          value={formData.motDePasse} 
          onChange={handleChange} 
          required 
          style={{ padding: '8px' }}
        />
        <button type="submit" style={{ padding: '10px', background: 'black', color: 'white', border: 'none', cursor: 'pointer' }}>
          Connexion
        </button>
      </form>
      <p style={{ marginTop: '20px' }}>
        Pas encore de compte ? <a href="/signup" style={{ color: 'blue' }}>S'inscrire</a>
      </p>
    </div>
  );
};

export default Login;
