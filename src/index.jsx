import React, { ErrorBoundary } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { CrowdfundingProvider} from './context/CrowdfundingContext';

   
 const root = ReactDOM.createRoot(document.getElementById('root'))
 root.render(
  <CrowdfundingProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
   </CrowdfundingProvider>
);

