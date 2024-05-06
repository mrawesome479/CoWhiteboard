import { useParams } from "react-router-dom";

import Whiteboard from "../Whiteboard/Whiteboard";
import CursorOverlay from "../CursorOverlay/CursorOverlay"
import { useEffect } from "react";
import { connectWithSocketServer } from "../socketConn/socketConn";

export const WhiteBoardPage = () => {
  const { boardId } = useParams()

  useEffect(() => {
    console.log(`white board called with boardId : ${boardId}`);
  
    connectWithSocketServer(boardId);
  }, [boardId])

  return (
    <div>
      <Whiteboard />
      <CursorOverlay /> 
    </div>
  )
}

