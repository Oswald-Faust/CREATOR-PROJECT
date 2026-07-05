
import './Features.css'

const FEATURES = [
  {
    titre: "Gérez vos collaborations comme un pro",
    points: [
      { titre: "Profils vérifiés", desc: "Accédez aux statistiques d'audience et d'engagement de chaque créateur en un coup d'œil." },
      { titre: "Filtres puissants", desc: "Filtrez par niche, nombre d'abonnés et taux d'engagement facilement." },
    ],
    image: "left",
  },
  {
    titre: "Créez des campagnes en quelques clics",
    points: [
      { titre: "Campagnes fictives", desc: "Simulez vos campagnes avant tout engagement financier réel." },
      { titre: "Association facile", desc: "Associez des créateurs à vos campagnes en un seul clic." },
    ],
    image: "right",
  },
  {
    titre: "Suivez vos performances en temps réel",
    points: [
      { titre: "Dashboard complet", desc: "Toutes vos métriques au même endroit, claires et accessibles." },
      { titre: "Statistiques détaillées", desc: "Analysez l'impact de chaque collaboration sur votre marque." },
    ],
    image: "left",
  },
  {
    titre: "Trouvez le créateur idéal rapidement",
    points: [
      { titre: "Recherche avancée", desc: "Cherchez par niche, plateforme, localisation et bien plus." },
      { titre: "Profils complets", desc: "Chaque créateur a une fiche détaillée avec son audience et ses stats." },
    ],
    image: "right",
  },
]

function FeatureBlock({ data, index }) {
  const isLeft = data.image === "left"

  return (
    <div className={`feature-block ${isLeft ? "image-left" : "image-right"}`}>

      <div className="feature-block-image">
        <div className="image-placeholder">
          <span>0{index + 1}</span>
        </div>
      </div>

      <div className="feature-block-text">
        <h2>{data.titre}</h2>
        <div className="features-points">
          {data.points.map((point, i) => (
            <div className="features-point" key={i}>
              <span className="check"></span>
              <div>
                <strong>{point.titre}</strong>
                <p>{point.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

function Features() {
  return (
    <section className="features-section">
      {FEATURES.map((feat, index) => (
        <FeatureBlock key={index} data={feat} index={index} />
      ))}
    </section>
  )
}

export default Features