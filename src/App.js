import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Board from "./components/Board";
import Wall from "./components/Wall";
import NewCardForm from "./components/NewCardForm";

function App() {
  const [allBoardsData, setAllBoardsData] = useState([]);
  const [currentBoard, setCurrentBoard] = useState({
    title: "",
    owner: "",
    board_id: null,
  });
  const [cardsData, setCardsData] = useState([]);

  useEffect(() => {
    axios
      .get("https://back-inspiration-board-magic.herokuapp.com/boards")
      .then((response) => {
        setAllBoardsData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }, []);

  //api call for getting cards.
  const getBoardCards = (board) => {
    axios
      .get(
        `https://back-inspiration-board-magic.herokuapp.com/boards/${board.board_id}/cards`
      )
      .then((response) => {
        setCardsData(response.data);
        console.log(cardsData);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // api call to post a new card
  const postNewCard = (board_id, new_card) => {
    axios
      .post(
        `https://back-inspiration-board-magic.herokuapp.com/boards/${board_id}/cards`,
        new_card
      )
      .then((response) => {
        const cards = [...cardsData];
        cards.push(response.data);
        setCardsData(cards);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };
  const selectBoard = (board) => {
    setCurrentBoard(board);
    getBoardCards(board);
  };

  const boardList = allBoardsData.map((board) => {
    return (
      <li>
        <Board board={board} selectBoard={selectBoard}></Board>
      </li>
    );
  });

  return (
    <main>
      <header>
        <h1>Inspo-Board</h1>
      </header>
      <section>
        <article>
          {currentBoard.board_id ? (
            <Wall
              currentBoard={currentBoard}
              cardsData={cardsData}
              setCardsData={setCardsData}
            ></Wall>
          ) : (
            ""
          )}
        </article>
        <aside>
          <h3>Select a Board</h3>
          <ul>{boardList}</ul>
          <p>
            newBoard form goes here. need allboards use state, current board use
            state.{" "}
          </p>
          {currentBoard.board_id ? (
            <NewCardForm
              board_id={currentBoard.board_id}
              postNewCard={postNewCard}
            ></NewCardForm>
          ) : (
            ""
          )}
        </aside>
      </section>
    </main>
  );
}

export default App;
