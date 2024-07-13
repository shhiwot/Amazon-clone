import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { DataProvider } from './Component/DataProvider/DataProvider.jsx';
import {initialstate,reducer} from './Utility/reducer.js'
ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <DataProvider reducer={reducer} initialstate={initialstate}  >
      <App />
    </DataProvider>
  </>
);
