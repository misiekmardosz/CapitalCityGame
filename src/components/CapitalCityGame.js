import "../../src/scss/main.scss"
import {useEffect, useState} from "react";
import MainGame from "./MainGame";
import LostGame from "./LostGame";
import NewBestScore from "./NewBestScore";
import FinishedGame from "./FinishedGame";
import NewAnswer from "./NewAnswer";
const API_URL = "http://localhost:3000";
function CapitalCityGame() {
    const [answer, setAnswer] = useState(undefined);
    const [correct, setCorrect] = useState(0);
    const [countries, setCountries] = useState([{}]);
    const [wrong, setWrong] = useState(3);
    const [wrongCountry, setWrongCountry]= useState('')
    const [bestScore, setBestScore]= useState([{}])
    const [loading, setLoading] = useState(false);

    const randomIndex = getRandomIndex()
    function newGame(){
        window.location.reload(false);
    }
    useEffect(() => {
        setLoading(true);
        fetch(`${API_URL}/countrys`)
            .then((response) => response.json())
            .then((data) => {
                setCountries(data);
                setLoading(false);
            });
    }, []);
    useEffect(() => {
        setLoading(true);
        fetch(`${API_URL}/scores`)
            .then((response) => response.json())
            .then((data) => {
                setBestScore(data);
                setLoading(false);
            });
    }, []);
    const newBestScore = ()=>{
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

    let capitals = getCapitals(countries, "capital");
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
        let number = Math.floor(Math.random() * countries.length)
        return number
    }
    const setDefault = (e) => {
        if (countries.length !==1){
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

    const capital1 = countries[randomIndex]
    const handleClick = (e, item) => {
        if (item === capital1.capital){
            e.preventDefault()
            setCorrect((prevState)=>prevState + 1)
            countries.splice(randomIndex,1)
            setWrongCountry(capital1)
            setAnswer(true)
            setDefault()
        }
        else if (item !== capital1.capital && wrong === 1 && correct <= bestScore[0].score){
            e.preventDefault()
            setWrong((prevState) =>prevState - 1)
            countries.splice(randomIndex,1)
            setWrongCountry(capital1)
            setAnswer(false)
        }
        else if (countries.length === 1){
            e.preventDefault()
            setWrong((prevState) =>prevState - 1)
            setWrongCountry(capital1)
            setAnswer(false)
            newBestScore()
        }
        else if (item !== capital1.capital && wrong === 1 && correct > bestScore[0].score){
            e.preventDefault()
            setWrong((prevState) =>prevState - 1)
            countries.splice(randomIndex,1)
            setWrongCountry(capital1)
            setAnswer(false)
            newBestScore()
        }
        else{
            e.preventDefault()
            setWrong((prevState) =>prevState - 1)
            countries.splice(randomIndex,1)
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
        return <LostGame correct={correct} wrongCountry={wrongCountry} newGame={newGame}/>
    else if (wrong===0 && correct> bestScore[0].score)
        return <NewBestScore correct={correct} wrongCountry={wrongCountry} newGame={newGame}/>
    else if (countries.length === 1)
        return <FinishedGame correct={correct} newGame={newGame}/>
    else
        return <NewAnswer answer={answer} wrongCountry={wrongCountry}/>
}

export default CapitalCityGame;