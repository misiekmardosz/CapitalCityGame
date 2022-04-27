import React from "react";

const LostGame = ({wrongCountry, correct, newGame}) => {
  return(
      <>
          <div className={"App"}>
              <div className="end">
                  <h1>jesteś łosiem!</h1>
                  <h2 className={'wrongCountry'}>poprawna odpowiedź to {wrongCountry.capital}</h2>
                  <h2 className={'score2'}>Twój Wynik = {correct}</h2>
                  <button className={'button'} onClick={newGame}>Nowa Gra</button>
              </div>
          </div>

      </>
  )
}

export default LostGame