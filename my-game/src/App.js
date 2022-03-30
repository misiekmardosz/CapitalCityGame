import logo from './logo.svg';
// import "../scss/main.scss";
import countrys from "./db";

import './App.css';
// import '../scss/main.scss'
import {useEffect, useState} from "react";
import {clear} from "@testing-library/user-event/dist/clear";
function App() {
    const [answear, setAnswear] = useState(undefined);
    const [correct, setCorrect] = useState(0);
    const [wrong, setWrong] = useState(3);
    const [wrongConutry, setWrongCountry]= useState('')
    const [bestScore, setBestScore]= useState(false)
    // const [start, setStart] = useState(true)
    // const hearts = [...wrong]
    // console.log(wrong);
    const randomIndex = getRandomIndex()

    // function handleHelp() {
    //     const capitalListHelped = capitalList.splice(1,1)
    //     return capitalListHelped
    // }
    function refreshPage() {
        window.location.reload(false);
    }

    // console.log(capitalList)



    function getCapitals(input, field) {
        var output = [];
        for (var i=0; i < input.length ; ++i)
            output.push(input[i][field]);
        return output;
    }

    let capitals = getCapitals(countrys, "capital");
    capitals.splice(`${randomIndex}`,1)
    // console.log(capitals)
    // console.log(countrys);

    function makeGetRandomElement() {
        let arr;

        function randomIndex() {
            return Math.floor(Math.random() * arr.length);
        }

        function reinitArray() {
            arr = capitals.slice();
        }
        reinitArray();
        return function getRandomElement() {
            if (arr.length === 0) reinitArray();
            return arr.splice(randomIndex(), 1)[0];
        }
    }
    function getRandomIndex(){
        let number = Math.floor(Math.random() * countrys.length)
        return number
    }

    function RenderAnswear() {
        if (answear === true) {
            return <h1>DOBRZE!</h1>;
        }
        else if (answear === false)
            return(
                <>
                    <h1>Źle! poprawna odpowiedź to</h1>
                    <h1 className={'wrongCountry'}>{wrongConutry.capital}</h1>
                </>
            );
        else
            return <></>
    }
    function RenderHearts() {
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
    //
    // function myStopFunction() {
    //     clearTimeout(myTimeout);
    // }
    // const endGame = () => {
    //   setAnswear(undefined)
    // }
    //
    // if (wrong === 0) myStopFunction() && clearTimeout() && endGame() && setWrong(3)

    // setMainState(() => {
    //     setAnswear(undefined)
    // });
    const setDefault = (e) => {
        const timer = setTimeout(() => {
            setAnswear(undefined)
        }, 2000);
    }
    const setDefaultWrong = (e) => {
        const timer = setTimeout(() => {
            setAnswear(undefined)
        }, 4000);
    }


    // const setStart = () => {
    //     const timer = setTimeout(() => {
    //         function refreshPage() {
    //             window.location.reload(false);
    //         }
    //     }, 2000);
    // }




    const capital1 = countrys[randomIndex]
    const handleClick = (e, item) => {
        // console.log(item)
        if (item === capital1.capital){
            e.preventDefault()
            setWrongCountry(capital1)
            setAnswear(true)
            setCorrect((prevState)=>prevState + 1)
            countrys.splice(randomIndex,1)
            setDefault()
        }
        else if (item !== capital1.capital && wrong === 1){
            e.preventDefault()
            setAnswear(false)
            setWrong((prevState) =>prevState - 1)
            countrys.splice(randomIndex,1)
            setWrongCountry(capital1)
        }


        else{
            e.preventDefault()
            setAnswear(false)
            setWrong((prevState) =>prevState - 1)
            countrys.splice(randomIndex,1)
            setDefaultWrong()
            setWrongCountry(capital1)
        }
    }
    // console.log(wrongConutry)
    console.log(bestScore);


    let getRandomElement = makeGetRandomElement();
    const capital2 = getRandomElement()
    const capital3 = getRandomElement()
    const capital4 = getRandomElement()
    const capitalList = [capital1.capital,capital2,capital3,capital4].sort(() => Math.random() - Math.random())
    if(answear===undefined)
    return (
    <div className="App">
      <h1>{capital1.country}</h1>
        <div className={"button--container"}>
            {capitalList.map((item, key)=><button className={"button"} key={key} onClick={ (e) => handleClick(e,item)}>{item}</button>)}
        </div>
        <RenderAnswear/>
        <div className={'hearts'}>
            <RenderHearts/>
        </div>
        <h4 className={"score"}>Twój Wynik = {correct}</h4>
    </div>
  );
    else if (wrong===0 && correct<=14)
        return (
            <>
                <div className={"end"}>
                    <h6>jesteś łośiem</h6>
                    <h4 className={'score2'}>Twój Wynik = {correct}</h4>
                    <button className={'new--game'} onClick={refreshPage}>Nowa Gra</button>
                </div>

            </>
        );
    else if (wrong===0 && correct>14)
        return (
            <>
                <div className={"end2"}>
                    <h6>jesteś królem</h6>
                    <h4 className={'score2'}>Twój Wynik = {correct}</h4>
                    <button className={'new--game'} onClick={refreshPage}>Nowa Gra</button>
                </div>

            </>
        );
    else
    return (
        <div className="App">
            <RenderAnswear/>
            <div className={'hearts'}>
                <RenderHearts/>
            </div>
            <h4 className={"score"}>Twój Wynik = {correct}</h4>
        </div>
    );
}

export default App;
