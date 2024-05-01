import React, { useState } from 'react';
import { Button, Grid, TextField, Typography} from '@mui/material';

const CreateNewBoard = ({canBtnHandler}) => {

    const [boardTitle, setBoardTitle] = useState('');
    const [boardDescription, setBoardDescription] = useState('');

    const handleBoardTitleChange = (event) => {
        setBoardTitle(event.target.value);
    };

    const handleBoardDescriptionChange = (event) => {
        setBoardDescription(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Add your logic to handle form submission (e.g., API call to create a new board)
        console.log(`${boardTitle} ${boardDescription}`);
    };

    return (
        <>
            <Grid sx={{ padding: '10px'}}>
                <Typography variant="h5">Create New Board</Typography>
            </Grid>
            <Grid container spacing={2} sx={{ padding: '20px' }}>
                <Grid item xs={6} md={6}>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Board Title"
                            variant="outlined"
                            value={boardTitle}
                            onChange={handleBoardTitleChange}
                        />
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            label="Board Description"
                            variant="outlined"
                            value={boardDescription}
                            onChange={handleBoardDescriptionChange}
                            sx={{ marginTop: 2 }}
                        />
                        <Button variant="outlined" color="error" onClick={canBtnHandler} sx={{ marginTop: 2 }}>
                            Cancel
                        </Button>
                        <Button className='ml-20' type="submit" variant="contained" sx={{ marginTop: 2, marginLeft: 1.5 }}>
                            Create New Board
                        </Button>
                    </form>
                </Grid>
                <Grid item xs={6} md={6}>
                    Users to be added in board
                </Grid>
            </Grid>
        </>
    )
}

export default CreateNewBoard;