import { BrowserRouter, Route, Routes } from "react-router-dom"
import InterfaceJuego from "./components/InterfaceJuego"


function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InterfaceJuego />}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
