import Login from "./components/Profile Related/Login"
import Body from "./components/Body"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Profile from "./components/Profile Related/Profile"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"
import Feed from "./components/Feed"
import ErrorPage from "./components/ErrorPage"
import Connections from "./components/Connection Related/Connections"
import Requests from "./components/Connection Related/requests"

function App() {

  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/error" element={<ErrorPage />} />
               <Route path="/connections" element={<Connections />} />
                <Route path="/requests" element={<Requests />} />
              <Route path="*" element={<ErrorPage />} /> {/* Catch-all route for 404 */}
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>

    </>
  )
}
export default App