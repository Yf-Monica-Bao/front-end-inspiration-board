//For every element in the list, render <Board>
import React from "react";

const Card = ({ key, id, message, likes, deleteCard, card }) => {
  return (
    <div>
      <h4>{message}</h4>
      <p>Likes: {likes}</p>
      <h2>+</h2>
      <button onClick={() => deleteCard(card, id)}>Delete</button>
    </div>
  );
};

export default Card;
