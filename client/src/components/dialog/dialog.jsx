import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {useState} from "react";
import axios from "axios";

export default function FormDialog(props) {
    const [editValues, setEditValues] = useState({
        id: props.id,
        name: props.name,
        category: props.category,
    });


    const handleEditValues = () => {
        console.log(props.baseUrl)
        axios.put(`http://localhost:3001/edit`, {
        //axios.put(`https://managerztododb.onrender.com/edit`, {
            id: editValues.id,
            name: editValues.name,
            category: editValues.category,
        });
        handleClose();

    }

    const handleDeleteGame = () => {
        //axios.delete(`https://managerztododb.onrender.com/delete/${editValues.id}`)
        axios.delete(`http://localhost:3001/delete/${editValues.id}`)
    }

    const handleChangeValues = (value)=>{
        setEditValues(prevValues=>({
                ...prevValues,
                [value.target.id]: value.target.value,
            })
        )
    }

    const handleClickOpen = () => {
        props.setOpen(true);
    };

    const handleClose = () => {
        props.setOpen(false);
    };

    return (
        <div>
            <Dialog open={props.open} onClose={handleClose}>
                <DialogTitle>Edit</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Title"
                        defaultValue={props.name}
                        type="text"
                        onChange={handleChangeValues}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="category"
                        label="Category"
                        defaultValue={props.category}
                        type="text"
                        onChange={handleChangeValues}
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleEditValues}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
