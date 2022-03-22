import logo from './logo.svg';
// import "./scss/main.scss";
import './App.css';
import {useEffect, useState} from "react";
import {clear} from "@testing-library/user-event/dist/clear";
const countrys = [
    {
        country: "Brazil",
        capital: "Rio"
    },{
        country: "Poland",
        capital: "Warszawa"
    },{
        country: "Belgia",
        capital: "Bruksela"
    },{
        country: "Holandia",
        capital: "Amsterdam"
    },{
        country: "Anglia",
        capital: "Londyn"
    }]
function App() {
    const [answear, setAnswear] = useState(undefined);
    const [correct, setCorrect] = useState(0);
    const [wrong, setWrong] = useState(3);
    // const hearts = [...wrong]
    console.log(wrong);


    function getCapitals(input, field) {
        var output = [];
        for (var i=0; i < input.length ; ++i)
            output.push(input[i][field]);
        return output;
    }
    const randomIndex = getRandomIndex()
    let capitals = getCapitals(countrys, "capital");
    capitals.splice(`${randomIndex}`,1)
    console.log(capitals)
    console.log(countrys);

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
            return <h1>Źle!</h1>;
        else
            return <></>
    }
    function RenderHearts() {
        if (wrong === 3) {
            return(
                <>
                    <div className={"heart"}>heart</div>
                    <div className={"heart"}>heart</div>
                    <div className={"heart"}>heart</div>
                </>
            );
        }
        else if (wrong === 2) {
            return(
                <>
                    <div className={"heart"}>heart</div>
                    <div className={"heart"}>heart</div>
                </>
            );
        }
        else if (wrong === 1) {
            return(
                <>
                    <div className={"heart"}>heart</div>
                </>
            );
        }
        else <></>
    }

    setTimeout(() => {
        setAnswear(undefined)
    }, 2000);

    const capital1 = countrys[randomIndex]
    const handleClick = (e, item) => {
        console.log(item)
        if (item === capital1.capital){
            setAnswear(true)
            setCorrect((prevState)=>prevState + 1)
            setTimeout()
        }

        else{
            setAnswear(false)
            setWrong((prevState) =>prevState - 1)
            setTimeout()
        }
    }
    console.log(correct)



    let getRandomElement = makeGetRandomElement();
    const capital2 = getRandomElement()
    const capital3 = getRandomElement()
    const capital4 = getRandomElement()
    const capilatList = [capital1.capital,capital2,capital3,capital4].sort(() => Math.random() - Math.random())
    if(answear===undefined)
    return (
    <div className="App">
      <h1>{capital1.country}</h1>
        {capilatList.map((item, key)=><button key={key} onClick={ (e) => handleClick(e,item)}>{item}</button>)}
        <RenderAnswear/>
        <RenderHearts/>
        <h4>{correct}</h4>
    </div>
  );
    else if (wrong===0)
        return (
            <>
                <h3>JESTEŚ ŁOSIEM</h3>
                <h4>Twój Wynik = {correct}</h4>
            </>

        );
    else
    return (
        <div className="App">
            <RenderAnswear/>
            <RenderHearts/>
            <h4>{correct}</h4>
        </div>
    );
}

export default App;
