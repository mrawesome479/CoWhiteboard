import React, { useState } from "react";
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
import { ArrowBack, Info } from '@mui/icons-material';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { fetchBoardInfo } from "../../services/apiService";

const CustomIconButton = ({ src, type, isRubber }) => {
  const dispatch = useDispatch();
  const selectedToolType = useSelector((state) => state.whiteboard.tool);

  const handleToolChange = () => {
    dispatch(setToolType(type));
  };

  const handleClearCanvas = () => {
    dispatch(setElements([]));
    emitClearWhiteboard();
  };

  return (
    <button
      onClick={isRubber ? handleClearCanvas : handleToolChange}
      className={
        selectedToolType === type ? "menu_button_active" : "menu_button"
      }
    >
      <img width="80%" height="80%" src={src} alt={`${type} icon`} />
    </button>
  );
};

const Menu = () => {
  const navigate = useNavigate();
  const boardMembers = useSelector((state) => state.whiteboard.activeUsers);
  
  const [openBoardDetails, setOpenBoardDetails] = useState(false);
  const [openActiveMembers, setOpenActiveMembers] = useState(false);
  const [boardInfo, setBoardInfo] = useState(null);

  const handleClickOpenBoardInfo = async () => {
    try {
      const response = await fetchBoardInfo(localStorage.getItem('boardId'));
      console.log(response);
      setBoardInfo(response.board);
      setOpenBoardDetails(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseBoardInfo = () => {
    setOpenBoardDetails(false);
  };

  const handleAvatarIconsClick = () => {
    setOpenActiveMembers(true);
  }

  const handleActiveIconsClose = () => {
    setOpenActiveMembers(false);
  }

  const handleBackButtonClick = () => {
    disconnectSocketConnection();
    localStorage.removeItem('boardId');
    navigate('../../whiteboards');
  };

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
          onClick={handleClickOpenBoardInfo}
        >
          Info
        </Button>

        <AvatarGroup max={4} onClick={handleAvatarIconsClick}>
          {boardMembers.map((member, index) => (
            <Avatar alt={member.firstName} key={index}>{member.firstName.charAt(0)}</Avatar>
          ))}
        </AvatarGroup>
      </div>

      {boardInfo && (
        <Dialog open={openBoardDetails} onClose={handleCloseBoardInfo} aria-labelledby="board-details-dialog-title">
          <DialogTitle id="board-details-dialog-title">Board Details</DialogTitle>
          <DialogContent>
            <Typography variant="h6" component="div">
              {boardInfo.boardTitle}
            </Typography>
            <Typography variant="body2" color="textPrimary" component="div" style={{ marginTop: 2 }}>
              Description: {boardInfo.boardDescription}
            </Typography>
            <Typography variant="body2" color="textPrimary" component="div" style={{ marginTop: 1 }}>
              Members: {boardInfo.members.length}
            </Typography>
            <Typography variant="body2" color="textPrimary" component="div" style={{ marginTop: 1 }}>
              Created At: {boardInfo.createdAt}
            </Typography>
            <Typography variant="body2" color="textPrimary" component="div" style={{ marginTop: 1 }}>
              Updated At: {boardInfo.updatedAt}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseBoardInfo} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}

      <Dialog open={openActiveMembers} onClose={handleActiveIconsClose} aria-labelledby="active-members-dialog-title">
        <DialogTitle id="active-members-dialog-title">Active Members</DialogTitle>
        <DialogContent>
          {boardMembers && boardMembers.map((member, index) => (
            <Typography key={index} variant="body2" color="textPrimary" component="div" style={{ marginTop: 1 }}>
              {member.email} | {member.username} | {member.firstName} | {member.lastName}
            </Typography>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleActiveIconsClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Menu;
