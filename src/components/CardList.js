import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Card from "./Card";
import axios from "axios";

const CardList = ({ cardsData, setCardsData }) => {
  // here make a method for updating a card usting the put method.
  // you can follow the format I did for delete.
  // instead of filter you are going to want to set new data to
  // cardsData.Map((aCard)=>{return aCard.card_id ==card.card_id? {...card, likes_count: card.likes_count+1}:aCard})
  // set the card data then do your catch error! make sure to pass this along to the card!
  const deleteCard = (card, card_id) => {
    axios
      .delete(
        `https://back-inspiration-board-magic.herokuapp.com/cards/${card_id}`
      )
      .then((response) => {
        const newCardData = cardsData.filter((aCard) => {
          return aCard.card_id !== card_id;
        });
        setCardsData(newCardData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {cardsData
        ? cardsData.map((thisCard) => {
            return (
              <Card
                card={thisCard}
                key={thisCard.card_id}
                id={thisCard.card_id}
                message={thisCard.message}
                likes_count={thisCard.likes_count}
                deleteCard={deleteCard}
              ></Card>
            );
          })
        : ""}
    </div>
  );
};
export default CardList;
