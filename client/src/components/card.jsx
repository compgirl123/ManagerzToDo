import React, { useState} from "react";
import "./card.css"
import FormDialog from "./dialog/dialog";
import axios from "axios";


const Card = (props) => {
    const [open, setOpen] = React.useState(false);

    const cardOpen = () => {
        console.log(props);
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    };

    const handleDeleteGame = () => {
        console.log(props);
        axios.delete(`http://localhost:3001/delete/${props.id}`);
    }

    return (
        <>
        <FormDialog open={open} setOpen={setOpen} id={props.id} name={props.name} cost={props.cost} category={props.category} />
        <div className="game-card">
            <div className="info">
                <h4>{props.name}</h4>
                <p>{props.category}</p>
            </div>
            <div className="actions">
                <button className="edit" onClick={cardOpen}>Edit</button>
                <button className="delete" onClick={handleDeleteGame}>Delete</button>
            </div>
        </div>
        </>
    );
};

export default Card;
