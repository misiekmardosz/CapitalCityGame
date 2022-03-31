import logo from './logo.svg';
// import "../scss/main.scss";
import countrys from "./db";

import './App.css';
// import '../scss/main.scss'

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

    // bestScore.sort((a,b) => (a.score > b.score) ? 1 : ((b.score > a.score) ? -1 : 0))
    // console.log(bestScore);
    console.log(player);
    // const [score, setScore] = useState([{score:correct}])
    const randomIndex = getRandomIndex()
    function newKubaGame(){
        window.location.reload(false);
        // const timer = setTimeout(() => {
        //     setCorrect(0)
        //     setWrong(3)
        //     setAnswear(undefined)
        //     setPlayer('kuba')
        // }, 400);
    }
    function newMisiekGame(){
        // window.location.reload(false);
        const timer = setTimeout(() => {
            setCorrect(0)
            setWrong(3)
            setAnswear(undefined)
            setPlayer('misiek')
        }, 400);
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
    const newBestScore2 = ()=>{
        const bestScore = {
            id:2,
            score: correct,
        }
        fetch(`${API_URL}/scores/2`, {
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
    const newBestScore3 = ()=>{
        const bestScore = {
            id:3,
            score: correct,
        }
        fetch(`${API_URL}/scores/3`, {
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
    const setDefault = (e) => {
        const timer = setTimeout(() => {
            setAnswear(undefined)
        }, 200);
    }
    const setDefaultWrong = (e) => {
        const timer = setTimeout(() => {
            setAnswear(undefined)
        }, 400);
    }
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
        // else if (item !== capital1.capital && wrong === 1 && correct <= bestScore[0].score){
        //     e.preventDefault()
        //     setAnswear(false)
        //     setWrong((prevState) =>prevState - 1)
        //     countrys.splice(randomIndex,1)
        //     setWrongCountry(capital1)
        // }
        else if (item !== capital1.capital && wrong === 1 && correct > bestScore[0].score){
            e.preventDefault()
            setAnswear(false)
            setWrong((prevState) =>prevState - 1)
            countrys.splice(randomIndex,1)
            setWrongCountry(capital1)
            newBestScore1()
        }
        // else if (item !== capital1.capital && wrong === 1 && correct > bestScore[0].score && player==="misiek"){
        //     e.preventDefault()
        //     setAnswear(false)
        //     setWrong((prevState) =>prevState - 1)
        //     countrys.splice(randomIndex,1)
        //     setWrongCountry(capital1)
        //     newBestScore2()
        // }
        // else if (item !== capital1.capital && wrong === 1 && correct > bestScore[0].score){
        //     e.preventDefault()
        //     setAnswear(false)
        //     setWrong((prevState) =>prevState - 1)
        //     countrys.splice(randomIndex,1)
        //     setWrongCountry(capital1)
        //     newBestScore3()
        // }
        else{
            e.preventDefault()
            setAnswear(false)
            setWrong((prevState) =>prevState - 1)
            countrys.splice(randomIndex,1)
            setDefaultWrong()
            setWrongCountry(capital1)
        }
    }

    let getRandomElement = makeGetRandomElement();
    const capital2 = getRandomElement()
    const capital3 = getRandomElement()
    const capital4 = getRandomElement()
    const capitalList = [capital1.capital,capital2,capital3,capital4].sort(() => Math.random() - Math.random())
    if(answear===undefined)
    return (
    <div className="App">
        {/*<h2>Gra {player}</h2>*/}
      <h1>{capital1.country}</h1>
        <div className={"button--container"}>
            {capitalList.map((item, key)=><button className={"button"} key={key} onClick={ (e) => handleClick(e,item)}>{item}</button>)}
        </div>
        <RenderAnswear/>
        <div className={'hearts'}>
            <RenderHearts/>
        </div>
        <h4 className={"score"}>Twój Wynik = {correct}</h4>
        <h2 className={'best--score'}>najlepszy wynik {bestScore[0].score}</h2>
        {/*<h2 className={'best--score'}>najlepszy wynik Miśka {bestScore[1].score}</h2>*/}
    </div>
  );
    else if (wrong===0 && correct<= bestScore[0].score)
        return (
            <>
                <div className={"end"}>
                    <h6>jesteś łosiem</h6>
                    <h4 className={'score2'}>Twój Wynik = {correct}</h4>
                    <button className={'new--game'} onClick={newKubaGame}>Nowa Gra</button>
                    {/*<button className={'new--game'} onClick={newMisiekGame}>Nowa Gra Misiek</button>*/}
                    <h1 className={'wrongCountry'}>{wrongConutry.capital}</h1>
                </div>

            </>
        );
    else if (wrong===0 && correct> bestScore[0].score)
        return (
            <>
                <div className={"end2"}>
                    <h6>jesteś królem</h6>
                    <h4 className={'score2'}>Twój Wynik = {correct}</h4>
                    <button className={'new--game'} onClick={newKubaGame}>Nowa Gra</button>
                    {/*<button className={'new--game'} onClick={newMisiekGame}>Nowa Gra Misiek</button>*/}
                    <h1 className={'wrongCountry'}>{wrongConutry.capital}</h1>

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
