import React from 'react';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';

const BoardItem = ({ name, description, role, memberCnt, lastAccessedAt }) => (
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
                    {(role === 'EDITOR' || role === 'OWNER') && <Button variant="outlined" startIcon={<EditIcon />}>
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
  </Grid>
);

export default BoardItem;
