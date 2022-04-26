import React from "react";

const RenderAnswear = ({wrongConutry, answear}) => {
    if (answear === true) {
        return <h1 className="good-answer">DOBRZE!</h1>;
    }
    else if (answear === false)
        return(
            <>
                <h2 className="bad-answer">Źle! poprawna odpowiedź to</h2>
                <h1 className="good-answer">{wrongConutry.capital}</h1>
            </>
        );
    else
        return <></>
}

export default RenderAnswear