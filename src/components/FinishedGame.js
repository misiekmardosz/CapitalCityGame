import React from "react";

const FinishedGame = ({ correct, newGame }) => {
  return (
    <>
      <div className={"end3"}>
        <h1>Jesteś mistrzem! Wygrałeś Gre!!!</h1>
        <h4 className={"score2"}>Twój Wynik = {correct}</h4>
        <button className={"button"} onClick={newGame}>
          Nowa Gra
        </button>
      </div>
    </>
  );
};

export default FinishedGame;
