
import './Navbar.css'
import { Link } from 'react-router-dom'
import Button from './Button'

const LIENS_NAV = [
  { nom: "Accueil",   lien: "/"           },
  { nom: "Créateurs", lien: "/createurs"  },
  { nom: "Campagnes", lien: "/campagnes"  },
  { nom: "Dashboard", lien: "/dashboard"  },
]

function Navbar() {
  return (
    <nav>
      <span className="logo">Creator Deal Room</span>
      <ul>
        {LIENS_NAV.map((item, index) => (
          <li key={index}>
            <Link to={item.lien}>{item.nom}</Link>
          </li>
        ))}
      </ul>
      <div className="nav-actions">
        <Button texte="Connexion" variante="secondary" />
        <Button texte="Essayer gratuitement" variante="primary" />
      </div>
    </nav>
  )
}

export default Navbar