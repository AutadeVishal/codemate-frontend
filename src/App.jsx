import Login from "./components/Profile Related/Login"
import Body from "./components/Body"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Profile from "./components/Profile Related/Profile"
function App() {

  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}
export default App
