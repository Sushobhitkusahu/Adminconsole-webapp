import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
//import '@fontsource/roboto';
import './index.css';
import store from './UserandDeviceData/Store.jsx';
//import { FirebaseProvider } from './Context/FireBaseContext.jsx';
//import DarkModeWrapper from './DarkMode.jsx';
import {Provider} from 'react-redux'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    
<Provider store={store}>

      <App />

    </Provider>
    
  </StrictMode>,
);
