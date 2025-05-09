import { BrowserRouter, Route, Routes } from "react-router-dom"
import InterfaceJuego from "./components/interface/InterfaceJuego"
import CreateSkills from "./pages/CreateSkills"
import TodosList from "./utils/TodosList"



function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InterfaceJuego />}/>
        <Route path="/createskill" element={<CreateSkills />} />
        <Route path="/todos" element={<TodosList />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
