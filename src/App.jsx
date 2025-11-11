import { useState } from 'react'

import './App.css'
export default
// Composant MultipleStates
function MultipleStates() {
  const [state, setState] = useState('idle'); // idle, loading, success, error
  const [data, setData] = useState(null);

  const simulateApiCall = () => {
    setState('loading');
    setTimeout(() => {
      if (Math.random() > 0.3) {
        setData(['Article 1', 'Article 2', 'Article 3']);
        setState('success');
      } else {
        setState('error');
      }
    }, 1500);
  };

  const reset = () => {
    setState('idle');
    setData(null);
  };

  // Early return pour chaque état
  if (state === 'loading') {
    return (
      <div className="card" style={{ textAlign: 'center' }}>
        <h3>⏳ Chargement en cours...</h3>
        <p>Veuillez patienter</p>
        <div style={{ marginTop: '1rem' }}>
          <button onClick={reset}>Annuler</button>
        </div>
      </div>
    );
  }

  if (state === 'error') {
    return (
      <div className="card" style={{ backgroundColor: '#f8d7da', color: '#721c24' }}>
        <h3>❌ Erreur de chargement</h3>
        <p>Impossible de charger les données. Veuillez réessayer.</p>
        <button onClick={simulateApiCall}>Réessayer</button>
        <button onClick={reset} style={{ marginLeft: '0.5rem' }}>Retour</button>
      </div>
    );
  }

  if (state === 'success') {
    return (
      <div className="card" style={{ backgroundColor: '#d4edda', color: '#155724' }}>
        <h3>✅ Données chargées avec succès !</h3>
        <ul>
          {data.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <button onClick={reset}>Charger de nouvelles données</button>
      </div>
    );
  }

  // État idle (par défaut)
  return (
    <div className="card" style={{ textAlign: 'center' }}>
      <h3>Bienvenue !</h3>
      <p>Cliquez sur le bouton pour charger des données</p>
      <button onClick={simulateApiCall}>Charger les données</button>
    </div>

  );
}