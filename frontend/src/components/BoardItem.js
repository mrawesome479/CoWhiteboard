import React, { useState } from 'react';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';
import EditBoardComponent from './EditBoardDialog';

const BoardItem = ({ name, description, role, memberCnt, lastAccessedAt }) => {

    const [openEditDialog, setOpenEditDialog] = useState(false); 

    const handleEditClick = () => {
        console.log(`open dialog clicked`);
        setOpenEditDialog(true); 
    };

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
    };

    return (
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <Grid container>
                  <Grid item xs={6}>
                      <Typography variant="h6" component="div">
                          {name}
                      </Typography>
                      <Typography variant="body2">{description}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                      <Stack direction="row" spacing={1}>
                          {(role === 'EDITOR' || role === 'OWNER') && <Button variant="outlined" color='error' startIcon={<DeleteIcon />}>
                              Delete
                          </Button>}
                          <Button variant="outlined" startIcon={<VisibilityIcon />}>
                              Open
                          </Button>
                          {(role === 'EDITOR' || role === 'OWNER') && <Button variant="outlined" startIcon={<EditIcon />}  onClick={handleEditClick}>
                              Edit
                          </Button>}
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

          <EditBoardComponent open={openEditDialog} handleClose={handleCloseEditDialog} /> 
        </Grid>
      );      
}
export default BoardItem;
