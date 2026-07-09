import { useState } from 'react'
import { ThemeProvider } from "@/components/theme-provider"


import './App.css'
import Hinzufuegen from './Hinzufuegen'

function App() {
  

  return (
    <>
      
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {<Hinzufuegen></Hinzufuegen>}
    </ThemeProvider>
    </>
  )
}

export default App
