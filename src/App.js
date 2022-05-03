import Home from "./pages/static/Home"
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'

import DashHome from "./pages/dashboard/DashHome"

// style
import "./scss/main.scss"

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="join" element={<Login />} />
            <Route path="sign-up" element={<Signup />} />
            <Route path="dashboard">
              <Route index element={<DashHome />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
