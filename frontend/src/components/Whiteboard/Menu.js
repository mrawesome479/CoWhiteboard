import React from "react";
import rectangleIcon from "./../../resources/icons/rectangle.svg"; 
import lineIcon from './../../resources/icons/line.svg';
import rubberIcon from './../../resources/icons/rubber.svg';
import pencilIcon from './../../resources/icons/pencil.svg';
import textIcon from './../../resources/icons/text.svg';
import selectionIcon from './../../resources/icons/selection.svg';
import circleIcon from './../../resources/icons/circle.svg';
import { toolTypes } from "./../../constants";
import { useDispatch, useSelector } from "react-redux";
import { setElements, setToolType } from "./whiteboardSlice";
import { disconnectSocketConnection, emitClearWhiteboard } from "./../../socketConn/socketConn";

import { Button } from '@mui/material';
import { ArrowBack, Info, Edit } from '@mui/icons-material';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import { useNavigate } from "react-router-dom";

const CustomIconButton = ({ src, type, isRubber }) => {
  const dispatch = useDispatch();

  const selectedToolType = useSelector((state) => state.whiteboard.tool);

  const handleToolChange = () => {
    dispatch(setToolType(type));
  };

  const handleClearCanvas = () => {
    dispatch(setElements([]));
    emitClearWhiteboard();
  }

  return (
    <button
      onClick={isRubber ? handleClearCanvas : handleToolChange}
      className={
        selectedToolType === type ? "menu_button_active" : "menu_button"
      }
    >
      <img width="80%" height="80%" src={src} />
    </button>
  );
};

const Menu = () => {
  const navigate = useNavigate();
  const boardMembers = ["Remy Sharp", "Travis Howard", "Cindy Baker", "Agnes Walker", "Trevor Henderson"];

  const handleBackButtonClick = () => {
    disconnectSocketConnection()
    localStorage.removeItem('boardId')
    navigate('../../whiteboards')
  }

  return (
    <>   
      <div className="menu_container">
        
          <Button
            variant="contained"
            startIcon={<ArrowBack />}
            onClick={handleBackButtonClick}
          >
            Back
          </Button>
        
          <CustomIconButton className='ml-20' src={rectangleIcon} type={toolTypes.RECTANGLE} />
          <CustomIconButton src={circleIcon} type={toolTypes.CIRCLE} />
          <CustomIconButton src={lineIcon} type={toolTypes.LINE} />
          <CustomIconButton src={rubberIcon} isRubber />
          <CustomIconButton src={pencilIcon} type={toolTypes.PENCIL} />
          <CustomIconButton src={textIcon} type={toolTypes.TEXT} />
          <CustomIconButton src={selectionIcon} type={toolTypes.SELECTION} />

          <Button
            variant="contained"
            startIcon={<Info />}
          >
            Info
          </Button>

          <Button
            variant="contained"
            startIcon={<Edit />}
          >
            Manage Members
          </Button>

          <AvatarGroup max={4}>
            {boardMembers.map((name, index) => (
              <Avatar alt={name.charAt(0)} key={index}>{name.charAt(0)}</Avatar>
            ))}
        </AvatarGroup>
      </div>
    </>
  );
};

export default Menu;
