import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Grid, Card, CardContent, Avatar } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Stack from '@mui/material/Stack';

const BoardItem = ({ name, description }) => (
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
                    <Typography variant="body3"> <span className='f-bold'>Role: </span> ADMIN </Typography>
                    <Typography variant="body3"> <span className='f-bold ml-20'>Members: </span> 10 </Typography>
                    <Typography variant="body3"> <span className='f-bold ml-20'>Last accessed at:</span> { new Date().toDateString()} </Typography>
                </Typography>
            </Grid>
        </Grid>
      </CardContent>
    </Card>
  </Grid>
);

export const WhiteBoardsPage = () => {
    const boards = [
        { id: 1, name: 'Board 1', description: 'Description for Board 1' },
        { id: 2, name: 'Board 2', description: 'Description for Board 2' },
        { id: 3, name: 'Board 3', description: 'Description for Board 3' },
        { id: 4, name: 'Board 1', description: 'Description for Board 1' },
        { id: 5, name: 'Board 2', description: 'Description for Board 2' },
        { id: 6, name: 'Board 3', description: 'Description for Board 3' },
        { id: 7, name: 'Board 1', description: 'Description for Board 1' },
        { id: 8, name: 'Board 2', description: 'Description for Board 2' },
        { id: 9, name: 'Board 3', description: 'Description for Board 3' },
        { id: 10, name: 'Board 1', description: 'Description for Board 1' },
        { id: 11, name: 'Board 2', description: 'Description for Board 2' },
        // { id: 12, name: 'Board 3', description: 'Description for Board 3' },
        // { id: 13, name: 'Board 1', description: 'Description for Board 1' },
        // { id: 14, name: 'Board 2', description: 'Description for Board 2' },
        // { id: 15, name: 'Board 3', description: 'Description for Board 3' },
        // { id: 16, name: 'Board 1', description: 'Description for Board 1' },
        // { id: 17, name: 'Board 2', description: 'Description for Board 2' },
        // { id: 18, name: 'Board 3', description: 'Description for Board 3' },
        // { id: 19, name: 'Board 1', description: 'Description for Board 1' },
        // { id: 20, name: 'Board 2', description: 'Description for Board 2' },
        // Add more board items as needed
      ];
    
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
              <BoardItem key={board.id} name={board.name} description={board.description} />
            ))}
          </Grid>
        </div>
      );
}
