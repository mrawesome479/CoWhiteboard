import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Grid, Card, CardContent, Avatar } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Stack from '@mui/material/Stack';
import { fetchBoardsForUser } from '../services/apiService';

const BoardItem = ({ name, description, role, memberCnt, lastAccessedAt }) => (
  <Grid item xs={4}>
    <Card>
      <CardContent>
        <Grid container>
            <Grid item xs={8}>
                <Typography variant="h6" component="div">
                    {name}
                </Typography>
                <Typography variant="body2">{description}</Typography>
            </Grid>
            <Grid item xs={4}>
                <Stack direction="row" spacing={2}>
                    <Button variant="outlined" color='error' startIcon={<DeleteIcon />}>
                        Delete
                    </Button>
                    <Button variant="contained" startIcon={<VisibilityIcon />}>
                        Open
                    </Button>
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body2" className='mt-5'>
                    <Typography variant="body3"> <span className='f-bold'>Role: </span> {role} </Typography>
                    <Typography variant="body3"> <span className='f-bold ml-20'>Members: </span> {memberCnt} </Typography>
                    <Typography variant="body3"> <span className='f-bold ml-20'>Last accessed at:</span> { lastAccessedAt === null ? 'you haven\'t accessed yet.' : new Date().toDateString()} </Typography>
                </Typography>
            </Grid>
        </Grid>
      </CardContent>
    </Card>
  </Grid>
);

export const WhiteBoardsPage = () => {
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
          {boards.map((board) => (
            <BoardItem key={board._id} name={board.boardTitle} description={board.boardDescription}
            role={board.role}
            memberCnt={board.members.length}
            lastAccessedAt={board.lastAccessedAt} />
          ))}
        </Grid>
      </div>
    );
}
