import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import './index.scss';
import { App } from './App.tsx';

// Enregistrer le Service Worker pour le mode PWA
const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("Une nouvelle version est disponible. Voulez-vous recharger ?")) {
      updateSW(true);
    }
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
