import logo from './logo.svg';
import './App.css';

function App() {
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

    const capital1 = countrys[randomIndex]


    let getRandomElement = makeGetRandomElement();
    const capital2 = getRandomElement()
    const capital3 = getRandomElement()
    const capital4 = getRandomElement()
    const capilatList = [capital1.capital,capital2,capital3,capital4].sort(() => Math.random() - Math.random())

    return (
    <div className="App">
      <h1>{capital1.country}</h1>
        {capilatList.map((item)=><button onClick={}>{item}</button>)}
    </div>
  );
}

export default App;
