import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Whiteboard from "./Whiteboard/Whiteboard";
import { connectWithSocketServer } from "./socketConn/socketConn";
import CursorOverlay from "./CursorOverlay/CursorOverlay";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Registration } from "./pages/Registration";
import { WhiteBoard } from "./pages/WhiteBoard";
import { Navbar } from "./components/Navbar";

const routes = [
  { path: "/", element: <Home />, navbar: true },
  { path: "/login", element: <Login />, navbar: true },
  { path: "/registration", element: <Registration />, navbar: true },
  { path: "/whiteboards", element: <WhiteBoard />, navbar: false }
];

function App() {

  useEffect(() => {
    connectWithSocketServer();
  }, [])

  return (
    // <div>
    //    <Whiteboard />
    //   <CursorOverlay /> 
    // </div>

    <Router>
      <div>
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                <>
                  {route.navbar && <Navbar />}
                  {route.element}
                </>
              }
            />
          ))}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
