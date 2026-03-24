import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import PrivacyPolicyPage from './PrivacyPolicyPage.tsx';
import TermsPage from './TermsPage.tsx';
import './index.css';

const path = window.location.pathname.replace(/\/+$/, '') || '/';
const isPrivacyPage = path === '/privacy';
const isTermsPage = path === '/terms';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isPrivacyPage ? <PrivacyPolicyPage /> : isTermsPage ? <TermsPage /> : <App />}
  </StrictMode>,
);
