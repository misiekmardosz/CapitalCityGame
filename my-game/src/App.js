import logo from './logo.svg';
// import "../scss/main.scss";
import countrys from "./db";
import RenderAnswer from "./components/RenderAnswer";
import RenderHearts from "./components/RenderHearts";

import './App.css';
import "./scss/main.scss"

import {useEffect, useState} from "react";
import {clear} from "@testing-library/user-event/dist/clear";
const API_URL = "http://localhost:3000";

function App() {
    const [answear, setAnswear] = useState(undefined);
    const [correct, setCorrect] = useState(0);
    const [wrong, setWrong] = useState(3);
    const [wrongConutry, setWrongCountry]= useState('')
    const [bestScore, setBestScore]= useState([{id:0,score:0},{id:0,score:0},{id:0,score:0}])
    const [loading, setLoading] = useState(false);
    const [player, setPlayer] = useState('kuba')

    console.log(player);
    const randomIndex = getRandomIndex()
    function newKubaGame(){
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
    console.log(bestScore);

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

    // function RenderAnswear() {
    //     if (answear === true) {
    //         return <h1>DOBRZE!</h1>;
    //     }
    //     else if (answear === false)
    //         return(
    //             <>
    //                 <h1>Źle! poprawna odpowiedź to</h1>
    //                 <h1 className={'wrongCountry'}>{wrongConutry.capital}</h1>
    //             </>
    //         );
    //     else
    //         return <></>
    // }
    // function RenderHearts() {
    //     if (wrong === 3) {
    //         return(
    //             <>
    //                 <div className={"heart"}></div>
    //                 <div className={"heart"}></div>
    //                 <div className={"heart"}></div>
    //             </>
    //         );
    //     }
    //     else if (wrong === 2) {
    //         return(
    //             <>
    //                 <div className={"heart"}></div>
    //                 <div className={"heart"}></div>
    //             </>
    //         );
    //     }
    //     else if (wrong === 1) {
    //         return(
    //             <>
    //                 <div className={"heart"}></div>
    //             </>
    //         );
    //     }
    //     else
    //         return <></>
    // }
    const setDefault = (e) => {
        const timer = setTimeout(() => {
            setAnswear(undefined)
        }, 500);
    }
    const setDefaultWrong = (e) => {
        const timer = setTimeout(() => {
            setAnswear(undefined)
        }, 3000);
    }

    const capital1 = countrys[randomIndex]
    const handleClick = (e, item) => {
        if (item === capital1.capital && capitals.length > 0){
            e.preventDefault()
            setCorrect((prevState)=>prevState + 1)
            countrys.splice(randomIndex,1)
            setWrongCountry(capital1)
            setAnswear(true)
            setDefault()
        }
        else if (item !== capital1.capital && wrong === 1 && correct <= bestScore[0].score && capitals.length > 0){
            e.preventDefault()
            setWrong((prevState) =>prevState - 1)
            countrys.splice(randomIndex,1)
            setWrongCountry(capital1)
            setAnswear(false)
        }
        else if (capitals.length === 0){
            e.preventDefault()
            setWrong((prevState) =>prevState - 1)
            countrys.splice(randomIndex,1)
            setWrongCountry(capital1)
            setAnswear(false)
            newBestScore1()
        }
        else if (item !== capital1.capital && wrong === 1 && correct > bestScore[0].score && capitals.length > 0){
            e.preventDefault()
            setWrong((prevState) =>prevState - 1)
            countrys.splice(randomIndex,1)
            setWrongCountry(capital1)
            setAnswear(false)
            newBestScore1()
        }
        else{
            e.preventDefault()
            setWrong((prevState) =>prevState - 1)
            countrys.splice(randomIndex,1)
            setDefaultWrong()
            setWrongCountry(capital1)
            setAnswear(false)
        }
    }
    console.log(capitals.length);

    let getRandomElement = makeGetRandomElement();
    const capital2 = getRandomElement()
    const capital3 = getRandomElement()
    const capital4 = getRandomElement()
    const capitalList = [capital1.capital,capital2,capital3,capital4].sort(() => Math.random() - Math.random())
    if(answear===undefined)
    return (
    <div className="App">
        <div className={"question"}>
            <h1 className="question-name">{capital1.country}</h1>
            <div className={'hearts'}>
                <RenderHearts wrong={wrong}/>
            </div>
        </div>

        <RenderAnswer wrongConutry={wrongConutry} answear={answear}/>

        <div className="answers">
            <div className={"button--container"}>
                {capitalList.map((item, key)=><button className={"button"} key={key} onClick={ (e) => handleClick(e,item)}>{item}</button>)}
            </div>
            <RenderAnswer wrongConutry={wrongConutry} answear={answear}/>
            <h2 className={"score"}>Twój Wynik = {correct}</h2>
            <h3 className={'best--score'}>najlepszy wynik = {bestScore[0].score}</h3>
        </div>
    </div>
  );
    else if (wrong===0 && correct<= bestScore[0].score)
        return (
            <>
                <div className={"App"}>
                    <div className="end">
                        <h1>jesteś łosiem!</h1>
                        <h2 className={'wrongCountry'}>poprawna odpowiedź to {wrongConutry.capital}</h2>
                        <h2 className={'score2'}>Twój Wynik = {correct}</h2>
                        <button className={'button'} onClick={newKubaGame}>Nowa Gra</button>
                    </div>
                </div>

            </>
        );
    else if (wrong===0 && correct> bestScore[0].score)
        return (
            <>
                <div className={"App"}>
                    <div className="end">
                        <h1>jesteś królem!</h1>
                        <h2 className={'wrongCountry'}>poprawna odpowiedź to {wrongConutry.capital}</h2>
                        <h2 className={'score2'}>Twój Wynik = {correct}</h2>
                        <button className={'button'} onClick={newKubaGame}>Nowa Gra</button>
                    </div>
                </div>

            </>
        );
    else if (capitals.length === 1)
        return (
            <>
                <div className={"end2"}>
                    <h6>Wygrałeś Gre!!!</h6>
                    <h4 className={'score2'}>Twój Wynik = {correct}</h4>
                    <button className={'new--game'} onClick={newKubaGame}>Nowa Gra</button>
                </div>

            </>
        );
    else
    return (
        <div className="App">
            <RenderAnswer wrongConutry={wrongConutry} answear={answear}/>
        </div>
    );
}

export default App;
