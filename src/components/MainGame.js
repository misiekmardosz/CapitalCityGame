import React from "react";
import RenderHearts from "./RenderHearts";
import RenderAnswer from "./RenderAnswer";

const MainGame = ({capital1, wrong, bestScore, correct, handleClick,wrongCountry, capitalList, answer}) => {
  return(
      <div className="App">
          <div className={"question"}>
              <h1 className="question-name">{capital1.country}</h1>
              <div className={'hearts'}>
                  <RenderHearts wrong={wrong}/>
              </div>
          </div>
          <RenderAnswer wrongConutry={wrongCountry} answer={answer}/>
          <div className="answers">
              <div className={"button--container"}>
                  {capitalList.map((item, key)=><button className={"button"} key={key} onClick={ (e) => handleClick(e,item)}>{item}</button>)}
              </div>
              <RenderAnswer wrongConutry={wrongCountry} answer={answer}/>
              <h2 className={"score"}>Twój Wynik = {correct}</h2>
              <h3 className={'best--score'}>najlepszy wynik = {bestScore[0].score}</h3>
          </div>
      </div>
  )
}

export default MainGame