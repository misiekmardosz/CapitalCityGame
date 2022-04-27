import React from "react";
import RenderAnswer from "./RenderAnswer";

const NewAnswer = ({wrongCountry, answer}) => {
    return (
        <div className="App">
            <RenderAnswer wrongCountry={wrongCountry} answer={answer}/>
        </div>
    );
}

export default NewAnswer