import React, { useState } from 'react';
import { Grid, Card, CardContent, Typography, Button, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import EditBoardDialog from './EditBoardDialog';
import ConfirmModal from './ConfirmModal';

const BoardItem = ({ name, description, role, memberCount, lastAccessedAt }) => {
    const [openEditDialog, setOpenEditDialog] = useState(false); 
    const [openDeleteConfirmDialog, setOpenDeleteConfirmDialog] = useState(false);
    const [openOpenBoardConfirmDialog, setOpenOpenBoardConfirmDialog] = useState(false);

    const handleEditClick = () => {
        setOpenEditDialog(true); 
    };

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
    };

    const handleDeleteBoard = () => {
        setOpenDeleteConfirmDialog(true);
    };
    
    const handleDeleteClose = () => {
        setOpenDeleteConfirmDialog(false);
    };

    const handleOpenBoard = () => {
        setOpenOpenBoardConfirmDialog(true);
    };

    const handleCloseOpenBoardDialog = () => {
        setOpenOpenBoardConfirmDialog(false);
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
                                {(role === 'EDITOR' || role === 'OWNER') && 
                                    <Button variant="outlined" color='error' startIcon={<DeleteIcon />} onClick={handleDeleteBoard}>
                                        Delete
                                    </Button>}
                                <Button variant="outlined" startIcon={<VisibilityIcon />} onClick={handleOpenBoard}>
                                    Open
                                </Button>
                                {(role === 'EDITOR' || role === 'OWNER') && 
                                    <Button variant="outlined" startIcon={<EditIcon />}  onClick={handleEditClick}>
                                        Edit
                                    </Button>}
                            </Stack>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body2" className='mt-5'>
                                <Typography variant="body3"> 
                                    <span className='f-bold'>Role: </span> {role} 
                                </Typography>
                                <Typography variant="body3"> 
                                    <span className='f-bold ml-20'>Members: </span> {memberCount} 
                                </Typography>
                                <Typography variant="body3"> 
                                    <span className='f-bold ml-20'>Last accessed at:</span> { lastAccessedAt === null ? 'you haven\'t accessed yet.' : new Date().toDateString()} 
                                </Typography>
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            <EditBoardDialog open={openEditDialog} handleClose={handleCloseEditDialog} /> 
            <ConfirmModal
                open={openDeleteConfirmDialog}
                title="Delete Confirmation"
                content="Are you sure you want to delete this item?"
                onConfirm={handleDeleteBoard}
                onClose={handleDeleteClose}
            />
            <ConfirmModal
                open={openOpenBoardConfirmDialog}
                title="Open Board Confirmation"
                content="Are you sure you want to open this board?"
                onConfirm={handleOpenBoard}
                onClose={handleCloseOpenBoardDialog}
            />
        </Grid>
    );      
};

export default BoardItem;
