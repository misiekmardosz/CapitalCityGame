import logo from './logo.svg';
// import "../scss/main.scss";
import countrys from "./db";
import RenderAnswer from "./components/RenderAnswer";
import RenderHearts from "./components/RenderHearts";

import './App.css';
import "./scss/main.scss"

import {useEffect, useState} from "react";
import {clear} from "@testing-library/user-event/dist/clear";
import MainGame from "./components/MainGame";
const API_URL = "http://localhost:3000";

function App() {
    const [answer, setAnswer] = useState(undefined);
    const [start, setStart] = useState(true);
    const [correct, setCorrect] = useState(0);
    const [wrong, setWrong] = useState(3);
    const [wrongCountry, setWrongCountry]= useState('')
    const [bestScore, setBestScore]= useState([{id:0,score:0},{id:0,score:0},{id:0,score:0}])
    const [loading, setLoading] = useState(false);
    // const [player, setPlayer] = useState('kuba')

    console.log(countrys.length);
    const randomIndex = getRandomIndex()
    function newGame(){
        window.location.reload(false);
    }
    useEffect(() => {
        setLoading(true);
        fetch(`${API_URL}/scores`)
            .then((response) => response.json())
            .then((data) => {
                setBestScore(data);
                setLoading(false);
            });
    }, []);
    const newBestScore1 = ()=>{
        const bestScore = {
            id:1,
            score: correct,
        }
        fetch(`${API_URL}/scores/1`, {
            method: "PATCH",
            body: JSON.stringify(bestScore),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(bestScore => {
                console.log(bestScore);
            })
            .catch(error => {
                console.log(error);
            });
    }
    function getCapitals(input, field) {
        let output = [];
        for (var i=0; i < input.length ; ++i)
            output.push(input[i][field]);
        return output;
    }

    let capitals = getCapitals(countrys, "capital");
    capitals.splice(`${randomIndex}`,1)
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
    const setDefault = (e) => {
        if (countrys.length !==1){
            const timer = setTimeout(() => {
                setAnswer(undefined)
            }, 500);
        }
    }
    const setDefaultWrong = (e) => {
        const timer = setTimeout(() => {
            setAnswer(undefined)
        }, 3000);
    }

    const capital1 = countrys[randomIndex]
    const handleClick = (e, item) => {
        if (item === capital1.capital){
            e.preventDefault()
            setCorrect((prevState)=>prevState + 1)
            countrys.splice(randomIndex,1)
            setWrongCountry(capital1)
            setAnswer(true)
            setDefault()
        }
        else if (item !== capital1.capital && wrong === 1 && correct <= bestScore[0].score){
            e.preventDefault()
            setWrong((prevState) =>prevState - 1)
            countrys.splice(randomIndex,1)
            setWrongCountry(capital1)
            setAnswer(false)
        }
        else if (countrys.length === 1){
            e.preventDefault()
            setWrong((prevState) =>prevState - 1)
            setWrongCountry(capital1)
            setAnswer(false)
            newBestScore1()
        }
        else if (item !== capital1.capital && wrong === 1 && correct > bestScore[0].score){
            e.preventDefault()
            setWrong((prevState) =>prevState - 1)
            countrys.splice(randomIndex,1)
            setWrongCountry(capital1)
            setAnswer(false)
            newBestScore1()
        }
        else{
            e.preventDefault()
            setWrong((prevState) =>prevState - 1)
            countrys.splice(randomIndex,1)
            setDefaultWrong()
            setWrongCountry(capital1)
            setAnswer(false)
        }
    }

    let getRandomElement = makeGetRandomElement();
    const capital2 = getRandomElement()
    const capital3 = getRandomElement()
    const capital4 = getRandomElement()
    const capitalList = [capital1.capital,capital2,capital3,capital4].sort(() => Math.random() - Math.random())
    if(answer===undefined)
    return (
        <MainGame wrong={wrong}
                  wrongCountry={wrongCountry}
                  answer={answer}
                  capital1={capital1}
                  capitalList={capitalList}
                  bestScore={bestScore}
                  correct={correct}
                  handleClick={handleClick}/>
  );
    else if (wrong===0 && correct<= bestScore[0].score)
        return (
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
        );
    else if (wrong===0 && correct> bestScore[0].score)
        return (
            <>
                <div className={"App"}>
                    <div className="end2">
                        <h1>jesteś królem!</h1>
                        <h2 className={'wrongCountry'}>poprawna odpowiedź to {wrongCountry.capital}</h2>
                        <h2 className={'score2'}>Twój Wynik = {correct}</h2>
                        <button className={'button'} onClick={newGame}>Nowa Gra</button>
                    </div>
                </div>

            </>
        );
    else if (countrys.length === 1)
        return (
            <>
                <div className={"end2"}>
                    <h6>Wygrałeś Gre!!!</h6>
                    <h4 className={'score2'}>Twój Wynik = {correct}</h4>
                    <button className={'button'} onClick={newGame}>Nowa Gra</button>
                </div>

            </>
        );
    else
    return (
        <div className="App">
            <RenderAnswer wrongCountry={wrongCountry} answer={answer}/>
        </div>
    );
}

export default App;
