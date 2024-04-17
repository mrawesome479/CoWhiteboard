import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { connectWithSocketServer } from "./socketConn/socketConn";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Registration } from "./pages/Registration";
import { WhiteBoardsPage } from "./pages/WhiteBoardsPage";
import { Navbar } from "./components/Navbar";
import { WhiteBoardPage } from "./pages/WhiteBoardPage";

const routes = [
  { path: "/", element: <Home />, navbar: true },
  { path: "/login", element: <Login />, navbar: true },
  { path: "/registration", element: <Registration />, navbar: true },
  { path: "/whiteboards", element: <WhiteBoardsPage />, navbar: false },
  { path: "/whiteboard/:boardId", element: <WhiteBoardPage />, navbar: false }
];

function App() {

  useEffect(() => {
    connectWithSocketServer();
  }, [])

  return (
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
