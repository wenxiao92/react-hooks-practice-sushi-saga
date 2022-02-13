import React, { useEffect, useState } from "react";
import SushiContainer from "./SushiContainer";
import Table from "./Table";

const API = "http://localhost:3001/sushis";

function App() {
  const [currentList, setSushi] = useState([])
  const [money, setMoney] = useState(100)

  useEffect(() => {
    fetch(`${API}`)
    .then((r) => r.json())
    .then((allSushi) => {
      const updatedSushis = allSushi.map((sushi) => {
        return {...sushi, eaten: false}; //adds to each object a key of eaten with a boolean value of false
      });
      setSushi(updatedSushis)
    })
  },[])

  function handleEatSushi(eatenSushi){
    //if statement to wrap the eatenSushi to figure out if we can eat it
    if(money >= eatenSushi.price){
    //handles the changing of the status of the sushi. This gets wrapped within an if statement
    const changeStatus = currentList.map((sushi)=>{
      if(sushi.id === eatenSushi.id) return {...sushi, eaten: true};
      return sushi;
    })
    setSushi(changeStatus)
    setMoney((money) => money-eatenSushi.price) //if the sushi can be afforded, change state of wallet
  } else {
    alert("Need more $$")
  }
  }

  //created to be passed as a prop to Table for the eaten status
  const eatenSushis = currentList.filter((sushi) => sushi.eaten)

  return (
    <div className="app">
      <SushiContainer sushiList={currentList} onEatSushi={handleEatSushi}/>
      <Table plates={eatenSushis} wallet={money}/>
    </div>
  );
}

export default App;
