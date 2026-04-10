import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const host = document.createElement('div');
host.id = 'chatbot-widget-host';
document.body.appendChild(host);

const shadowRoot = host.attachShadow({ mode: 'open' });
const reactRootContainer = document.createElement('div');
reactRootContainer.id = 'chatbot-root';
shadowRoot.appendChild(reactRootContainer);

// Clones Vite styles into the Shadow DOM during development
const styles = document.querySelectorAll('style[data-vite-dev-id]');
styles.forEach(style => shadowRoot.appendChild(style.cloneNode(true)));

createRoot(reactRootContainer).render(
  <StrictMode><App /></StrictMode>
);