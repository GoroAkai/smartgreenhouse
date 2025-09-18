import './amplify-config'; // ← Amplify.configure() を実行
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GreenhouseSetup from './pages/GreenhouseSetup';
import SensorDashboard from './pages/SensorDashboard';
import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react'; // ✅ 追加
const system = createSystem(defaultConfig, {
  theme: {
    semanticTokens: {
      colors: {
        bg: {
          subtle: {
            value: {
              _light: '{colors.gray.100}',
              _dark: '{colors.gray.800}',
            },
          },
        },
        text: {
          primary: {
            value: {
              _light: '{colors.black}',
              _dark: '{colors.white}',
            },
          },
        },
      },
    },
  },
});


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider value={system}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/dashboard" element={<SensorDashboard />} />
          <Route path="/greenhousesetup" element={<GreenhouseSetup />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);


// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// const root = ReactDOM.createRoot(
//   document.getElementById('root')!
// );
// root.render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
