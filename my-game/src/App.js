import logo from './logo.svg';
import './App.css';
import {useState} from "react";
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
    const [answear, setAnswear] = useState();

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
            return <h1>JESTEŚ ŁOSIEM</h1>;
        else
            return <></>
    }

    const capital1 = countrys[randomIndex]
    setTimeout(() => {
        console.log('Hello, World!')
    }, 3000);

    const handleClick = (e, item) => {
        e.preventDefault()
        console.log(item)
        if (`${item}` == `${capital1.capital}`){
            setAnswear(true)
            setTimeout()
        }

        else{
            setAnswear(false)
            setTimeout()
        }

    }
    console.log(answear)


    let getRandomElement = makeGetRandomElement();
    const capital2 = getRandomElement()
    const capital3 = getRandomElement()
    const capital4 = getRandomElement()
    const capilatList = [capital1.capital,capital2,capital3,capital4].sort(() => Math.random() - Math.random())

    return (
    <div className="App">
      <h1>{capital1.country}</h1>
        {capilatList.map((item, key)=><button key={key} onClick={ (e) => handleClick(e,item)}>{item}</button>)}
        <RenderAnswear/>
    </div>
  );
}

export default App;
