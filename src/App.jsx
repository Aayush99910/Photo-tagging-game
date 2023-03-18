import React, { useState } from "react";
import WaldoPicture from "./assets/Waldo.avif";
import "./App.css"

export default function App() {
  const [isClicked, setIsClicked] = useState(false); // isClicked variable which will be set to true when user clicks and false when user doesn't click
  const [boxPosition, setBoxPosition] = useState({x: 0, y: 0}); // position of the boxmenu

  // objects that the user needs to find this will be stored in the firebase but right now for testing its here
  const [objectsToFind, setObjectsToFind]  = useState([
    {name: "Waldo", x: 24, y: 49},
    {name: "Wally", x: 53, y: 48},
    {name: "Wizard", x: 63, y: 48}
  ]); 

  const [message, setMessage] = useState("Best of luck!");

  const isCoordWithinSomeReasonableDegree = (coord1, coord2) => {
    return (
      coord1 === coord2 ||
      coord1 + 1 === coord2 ||
      coord1 + 2 === coord2 ||
      coord1 + 3 === coord2 ||
      coord1 + 4 === coord2 ||
      coord1 + 5 === coord2 ||
      coord1 + 6 === coord2 ||
      coord1 + 7 === coord2 ||
      coord1 + 8 === coord2 ||
      coord1 - 1 === coord2 ||
      coord1 - 2 === coord2 ||
      coord1 - 3 === coord2 ||
      coord1 - 4 === coord2 ||
      coord1 - 5 === coord2 ||
      coord1 - 6 === coord2 ||
      coord1 - 7 === coord2 ||
      coord1 - 8 === coord2 
    );
  };
  
  // checks if a character is found or not
  // if found then it just shows a message saying 'You have found the character "name"'
  const foundACharacter = () => {
    objectsToFind.map(character => {
      const hasFoundTheCharacter = isCoordWithinSomeReasonableDegree(character.x, boxPosition.x) && isCoordWithinSomeReasonableDegree(character.y, boxPosition.y)
        
      if (hasFoundTheCharacter) {
        setMessage(`You have found the character ${character.name}`);
      }
    })
  }


  // handles the click
  const handleClick = (e) => {
    setIsClicked(prevState => !prevState); // changes the isClickes variable
    const xCoord = Math.round((e.nativeEvent.offsetX / e.nativeEvent.target.offsetWidth) * 100); // clicked x coordinate
    const yCoord = Math.round((e.nativeEvent.offsetY / e.nativeEvent.target.offsetHeight) * 100); // clicked y coordinate

    setBoxPosition({x: xCoord, y: yCoord}); // updating the x and y coordinate of the box
    foundACharacter(); // checking if a character is found or not
  }


  return (
    <div>
      <p>{message}</p>
      <div onClick={handleClick} className="image-container">
      {isClicked && <div style={{left: boxPosition.x + "%", top: boxPosition.y + "%"}} className="box"></div>}
      <img src={WaldoPicture} />
      </div>
    </div>
  )
}