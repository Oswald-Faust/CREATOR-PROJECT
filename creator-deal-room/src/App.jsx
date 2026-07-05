

import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Accueil from './Pages/Accueil'
import Createurs from './Pages/Createurs'
import Campagnes from './Pages/Campagnes'
import Dashboard from './Pages/Dashboard'

import Login from './Pages/Login'
import Signup from './Pages/Signup'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/createurs" element={<Createurs />} />
        <Route path="/campagnes" element={<Campagnes />} />
        
        {/* Nouvelles routes d'authentification intégrées ! */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Le Dashboard sécurisé qui appelle l'API avec le token */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App