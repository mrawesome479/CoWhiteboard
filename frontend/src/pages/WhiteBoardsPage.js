import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Grid } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { fetchBoardsForUser } from '../services/apiService';
import BoardItem from '../components/BoardItem';
import CreateNewBoard from '../components/CreateNewBoard';

export const WhiteBoardsPage = () => {
    const [isCreateNewBoardPage, setIsCreateNewBoardPage] = useState(false);
    const [boards, setBoards] = useState([]);

    useEffect(() => {
      const fetchDataAsync = async () => {
        try {
          const responseData = await fetchBoardsForUser('661be3fab29b01e73b199d14'); // to get userId dynamically from local store after login
          console.log(responseData);
          setBoards(responseData.respBoard);
        } catch (error) {
          // setError(error.message);
          console.log(`error while loading boads for user : ${error}`);
        } finally {
          // setLoading(false);
        }
      };
  
      fetchDataAsync();
    }, []);

    function handleToggleNewBoard() {
      setIsCreateNewBoardPage(!isCreateNewBoardPage)
    }
    
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              CoSketch
            </Typography>
            <IconButton>
              <AccountCircleIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Grid container spacing={2} sx={{ padding: '20px' }}>
          <Grid item xs={12} md={12}>
            {!isCreateNewBoardPage && <Button variant="contained" onClick={handleToggleNewBoard}>Create New Board</Button>}
          </Grid>

          {!isCreateNewBoardPage && boards.map((board) => (
            <BoardItem key={board._id} name={board.boardTitle} description={board.boardDescription}
            role={board.role}
            memberCnt={board.members.length}
            lastAccessedAt={board.lastAccessedAt} />
          ))}

          {isCreateNewBoardPage && <CreateNewBoard canBtnHandler={handleToggleNewBoard} />}
        
        </Grid>
      </div>
    );
}
