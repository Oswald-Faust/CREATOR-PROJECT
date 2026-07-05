
import './CTA.css'

function CTA() {
  return (
    <section className="cta-section">
      <h2 className="cta-titre">
        Prêt à trouver vos créateurs idéaux ?
      </h2>
      <p className="cta-sous-titre">
        Rejoignez les marques qui optimisent déjà leurs collaborations.
        Lancez-vous gratuitement, sans engagement.
      </p>
      <div className="cta-actions">
        <a href="#" className="btn btn-primary">Essayer gratuitement pendant 14 jours</a>
        <a href="#" className="btn btn-secondary">Voir une démo</a>
      </div>
      <p className="cta-note">Sans carte bancaire · Annulation à tout moment</p>
    </section>
  )
}

export default CTA