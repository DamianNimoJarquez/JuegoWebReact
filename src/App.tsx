import { BrowserRouter, Route, Routes } from "react-router-dom"
import InterfaceJuego from "./components/interface/InterfaceJuego"
import CreateSkills from "./pages/CreateSkills"



function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InterfaceJuego />}/>
        <Route path="/createskill" element={<CreateSkills />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
