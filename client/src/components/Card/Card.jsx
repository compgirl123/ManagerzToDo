import React from "react";
import "./Card.css"
import axios from "axios";

const Card = (props) => {
    const handleDeleteGame = () => {
        axios.delete(`https://managerztododb.onrender.com/delete/${props.id}`).then(() => {
          props.onDeleteTask();
        });
    }

    return (
        <>
        <div className="game-card">
          <div className="info">
            <h4>{props.name}</h4>
          </div>
          <div className="actions">
            {props.category && (
              <button className="category" style={{ '--button-color': props.color }}>
                {props.category}
              </button>
            )}
            <button className="delete" style={{ '--button-color': props.color }} onClick={handleDeleteGame}>
              Delete
            </button>
          </div>
        </div>
        </>
    );
};

export default Card;
