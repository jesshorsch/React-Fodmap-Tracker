
import { ThemeProvider } from "@/components/theme-provider"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { NavBar } from "@/components/organisms/NavBar"
import './App.css'
import Hinzufuegen from './Hinzufuegen'
import Home from "./Home"
import Woche from "./Woche"
import Einstellungen from "./Einstellungen"



function App() {
  

  return (
    
      
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      

      <BrowserRouter>
      <NavBar/>
      <Routes>
      
        <Route path="/hinzufuegen" element={<Hinzufuegen/>} />
        <Route path="/" element={<Home/>} />
        <Route path="woche" element={<Woche/>} />
        <Route path="einstellungen" element={<Einstellungen/>} />
      </Routes>
      </BrowserRouter>


    </ThemeProvider>


    
  )
}

export default App
