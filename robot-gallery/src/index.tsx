import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AppStateProvider } from './AppState';

// const defaultContextValue = {
//   username: '威尔'
// }
// export const appContext = React.createContext(defaultContextValue)

const username = 'will'

// ReactDOM.render(
//   <React.StrictMode>
//     <appContext.Provider value={defaultContextValue}>
//       <App username={username} />
//     </appContext.Provider>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

ReactDOM.render(
  <React.StrictMode>
    <AppStateProvider>
      <App username={username} />
    </AppStateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
