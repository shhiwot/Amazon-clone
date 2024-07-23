import { useContext, useEffect, useState } from 'react'

import './App.css'
//import Home from './Page/Home'
import Landing from './Page/Landing/Landing'
import Router  from './Page/Router'
import Layout from './Component/Layout/Layout'
import { DataContext } from './Component/DataProvider/DataProvider'
import { auth } from "./Utility/fireBase";
import { Type } from './Utility/actiontype'
function App() {
const [{user},dispatch]=useContext(DataContext)
useEffect(()=>{
auth.onAuthStateChanged((authuser)=>{
if (authuser) {
  console.log(authuser);
//sign in block
dispatch({type:Type.SET_USER,
user:authuser
})

}
if(!authuser){
 // sign out  block
  dispatch({ type: Type.SET_USER, 
    user:null
  
  });
}

})


},[])
  return (
    <>

     <Router/>
    </>
  )
}

export default App
