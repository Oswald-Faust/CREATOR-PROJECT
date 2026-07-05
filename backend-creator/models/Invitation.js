const mongoose = require('mongoose');

const invitationSchema = new mongoose.Schema({
  // Bonne pratique backend : Lier les documents entre eux grâce à leurs IDs (Clés étrangères)
  
  entrepriseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Entreprise', // Fait le lien avec le modèle "Entreprise"
    required: true
  },
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Creator', // Fait le lien avec le modèle "Creator"
    required: true
  },
  messageEntreprise: {
    type: String,
    required: true // L'entreprise doit expliquer ce qu'elle veut (le brief)
  },
  delaiAcceptation: {
    type: Date // La date limite pour que le créateur réponde
  },
  statut: {
    type: String,
    // "enum" permet de restreindre les valeurs possibles aux choix ci-dessous. 
    // C'est beaucoup plus clair et évolutif que de simples "yes" ou "no".
    enum: ['En attente', 'Acceptée', 'Refusée', 'Expirée'],
    default: 'En attente' // L'état de base quand on crée l'invitation
  }
  // Pas besoin d'ajouter manuellement "Date et heure de l'invitation" 
  // car l'option timestamps = true va créer automatiquement un champ 'createdAt' !
}, {
  timestamps: true
});

module.exports = mongoose.model('Invitation', invitationSchema);
