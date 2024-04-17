import { useParams } from "react-router-dom";

import Whiteboard from "../Whiteboard/Whiteboard";
import CursorOverlay from "../CursorOverlay/CursorOverlay"
import { useEffect } from "react";

export const WhiteBoardPage = () => {
  const { boardId } = useParams()

  useEffect(() => {
    console.log(`white board called with boardId : ${boardId}`);
  }, [boardId])

  return (
    <div>
      <Whiteboard />
      <CursorOverlay /> 
    </div>
  )
}

