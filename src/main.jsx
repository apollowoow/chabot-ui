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


const devStyles = document.querySelectorAll('style[data-vite-dev-id]');
devStyles.forEach(style => shadowRoot.appendChild(style.cloneNode(true)));

if (import.meta.env.PROD) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = './assets/index.css'; 
  
  shadowRoot.appendChild(link);
}

createRoot(reactRootContainer).render(
  <StrictMode>
    <App />
  </StrictMode>
);