import React, { useEffect } from "react";
import Whiteboard from "./Whiteboard/Whiteboard";
import { connectWithSocketServer } from "./socketConn/socketConn";
import CursorOverlay from "./CursorOverlay/CursorOverlay";

function App() {

  useEffect(() => {
    connectWithSocketServer();
  }, [])

  return (
    <div>
      <Whiteboard />
      <CursorOverlay />
    </div>
  );
}

export default App;
