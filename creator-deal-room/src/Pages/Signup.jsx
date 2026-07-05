import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  // On gère l'état du formulaire (les champs que l'utilisateur tape)
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    motDePasse: '',
    typeCompte: 'creator' // Par défaut on s'inscrit en tant que Créateur
  });
  
  const [message, setMessage] = useState('');

  // Met à jour l'état quand l'utilisateur tape dans les champs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Ce qui se passe quand on clique sur "S'inscrire"
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche la page de se recharger
    
    try {
      // On choisit la bonne route backend en fonction du type de compte
      const route = formData.typeCompte === 'creator' 
        ? '/api/auth/register-creator' 
        : '/api/auth/register-entreprise';
      
      // On envoie les données à notre backend !
      const response = await axios.post(`http://localhost:5000${route}`, {
        nom: formData.nom,
        prenom: formData.prenom,
        nomEntreprise: formData.nom, // Si c'est une entreprise, on utilise le champ nom pour nomEntreprise
        email: formData.email,
        motDePasse: formData.motDePasse
      });

      setMessage(response.data.message); // Affiche "Créateur inscrit avec succès !"
      
      // On redirige vers la page de login après 2 secondes
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (error) {
      // S'il y a une erreur (ex: email déjà pris), le backend renvoie un message
      setMessage(error.response?.data?.message || 'Erreur lors de l\'inscription');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', fontFamily: 'sans-serif' }}>
      <h2>Créer un compte</h2>
      
      {/* Affichage des messages de succès ou d'erreur */}
      {message && <div style={{ padding: '10px', background: '#f0f0f0', marginBottom: '15px' }}>{message}</div>}
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <select name="typeCompte" value={formData.typeCompte} onChange={handleChange} style={{ padding: '8px' }}>
          <option value="creator">Je suis un Créateur</option>
          <option value="entreprise">Je suis une Entreprise</option>
        </select>

        <input 
          type="text" 
          name="nom" 
          placeholder={formData.typeCompte === 'creator' ? 'Nom' : "Nom de l'entreprise"} 
          value={formData.nom} 
          onChange={handleChange} 
          required 
          style={{ padding: '8px' }}
        />
        
        {formData.typeCompte === 'creator' && (
          <input 
            type="text" 
            name="prenom" 
            placeholder="Prénom" 
            value={formData.prenom} 
            onChange={handleChange} 
            required 
            style={{ padding: '8px' }}
          />
        )}

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
          S'inscrire
        </button>
      </form>
    </div>
  );
};

export default Signup;
