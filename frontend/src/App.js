import React, { useEffect } from "react";
import Whiteboard from "./Whiteboard/Whiteboard";
import { connectWithSocketServer } from "./socketConn/socketConn";

function App() {

  useEffect(() => {
    connectWithSocketServer();
  }, [])

  return (
    <div>
      <Whiteboard />
    </div>
  );
}

export default App;
