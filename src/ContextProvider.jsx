import { createContext, useContext } from "react"
import { useState } from "react"
const colorContext=createContext()
const usecolor=()=>{
  return useContext (colorContext)
}
const ThemeProvider=({children})=>{
  const[color,setcolor]=useState('light')
const colorToggler=()=>{
  setcolor((pre)=>pre==='light'?'dark':'light')
}
return(
<colorContext.Provider value={{color,colorToggler}}>
{children}
</colorContext.Provider>
)
}



