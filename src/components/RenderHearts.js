import React from "react";

const RenderHearts = ({wrong}) =>{
    if (wrong === 3) {
        return(
            <>
                <div className={"heart"}></div>
                <div className={"heart"}></div>
                <div className={"heart"}></div>
            </>
        );
    }
    else if (wrong === 2) {
        return(
            <>
                <div className={"heart"}></div>
                <div className={"heart"}></div>
            </>
        );
    }
    else if (wrong === 1) {
        return(
            <>
                <div className={"heart"}></div>
            </>
        );
    }
    else
        return <></>
}
export default RenderHearts