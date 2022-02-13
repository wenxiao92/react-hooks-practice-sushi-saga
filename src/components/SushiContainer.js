import React, {useState} from "react";
import MoreButton from "./MoreButton";
import Sushi from "./Sushi";

function SushiContainer({sushiList, onEatSushi}) {

  //console.log(sushiList)
  const [sushiIndex, setSushiIndex] = useState(0)

  const sushiComponents = sushiList
  //grabs the first four sushi from sushiList by grabbing initially grabbing 0,4
  .slice(sushiIndex, sushiIndex + 4)
  //sends the four sushi from sushiList to Sushi component using map. Map method must come second
  .map((sushi) => (                   
    <Sushi
      key={sushi.id}
      sushi={sushi}
      onEatSushi={onEatSushi}
      />
  ))

  function handleNextSet() {
    //adds 4 to index. So next set is spliced from 4,8. Returning the 4th, 5th, 6th and 7th sushi
    setSushiIndex((sushiIndex) => (sushiIndex + 4))

  }

  return (
    <div className="belt">
      {/* Render Sushi components here! */}
      {sushiComponents}
      {/* click to handle adding more sushi */}
      <MoreButton onNextSushi={handleNextSet}/>
    </div>
  );
}

export default SushiContainer;
