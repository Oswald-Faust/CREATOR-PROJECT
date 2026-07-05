import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [profil, setProfil] = useState(null);
  const [erreur, setErreur] = useState('');

  // "useEffect" s'exécute dès que la page s'affiche
  useEffect(() => {
    const fetchProfil = async () => {
      // On récupère le token qu'on avait caché dans le localStorage au moment du login
      const token = localStorage.getItem('token');
      
      if (!token) {
        // Pas de token ? On renvoie à la page de connexion !
        navigate('/login');
        return;
      }

      try {
        // On fait une requête GET vers notre route protégée (/api/users/profile)
        // ATTENTION : On doit envoyer le token dans les "Headers" (en-têtes) de la requête !
        const response = await axios.get('http://localhost:5000/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}` // C'est ici qu'on montre patte blanche !
          }
        });
        
        // Si ça marche, on met les données du profil dans notre "state" React
        setProfil(response.data);
      } catch (error) {
        setErreur('Session expirée ou invalide. Veuillez vous reconnecter.');
        localStorage.removeItem('token'); // On nettoie le faux token
        setTimeout(() => navigate('/login'), 2000);
      }
    };

    fetchProfil();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token'); // On supprime le token pour se déconnecter
    navigate('/login');
  };

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', fontFamily: 'sans-serif' }}>
      <h2>Mon Espace Sécurisé 🔒</h2>
      
      {erreur && <div style={{ color: 'red' }}>{erreur}</div>}
      
      {profil ? (
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
          <h3>Bienvenue, {profil.nom || profil.nomEntreprise} !</h3>
          <p><strong>Email :</strong> {profil.email}</p>
          <p><strong>Rôle (identifiant caché) :</strong> Ce profil vient de la base de données protégée.</p>
          
          <button onClick={handleLogout} style={{ marginTop: '20px', padding: '10px', background: 'red', color: 'white', border: 'none', cursor: 'pointer' }}>
            Se déconnecter
          </button>
        </div>
      ) : (
        !erreur && <p>Chargement du profil sécurisé...</p>
      )}
    </div>
  );
};

export default Dashboard;