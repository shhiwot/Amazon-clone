import { useState } from 'react'

import './App.css'
//import Home from './Page/Home'
import Landing from './Page/Landing/Landing'
import Router  from './Page/Router'
import Layout from './Component/Layout/Layout'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Router/>
    </>
  )
}

export default App
