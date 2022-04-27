import React from "react";

const RenderAnswear = ({wrongCountry, answer}) => {
    if (answer === true) {
        return <h1 className="good-answer">DOBRZE!</h1>;
    }
    else if (answer === false)
        return(
            <>
                <h2 className="bad-answer">Źle! poprawna odpowiedź to</h2>
                <h1 className="good-answer">{wrongCountry.capital}</h1>
            </>
        );
    else
        return <></>
}

export default RenderAnswear