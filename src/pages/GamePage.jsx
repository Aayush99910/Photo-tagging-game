import React, {useState} from "react";
import WaldoPicture from "../assets/Waldo.avif";
import odlaw from "../assets/odlaw.jpg";
import wizard from "../assets/wizard.gif";
import wally from "../assets/wally.png";
import { NavLink } from "react-router-dom";

export default function GamePage() {
  const [isClicked, setIsClicked] = useState(false); // isClicked variable which will be set to true when user clicks and false when user doesn't click
  const [boxPosition, setBoxPosition] = useState({x: 0, y: 0}); // position of the boxmenu
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // objects that the user needs to find this will be stored in the firebase but right now for testing its here
  const [objectsToFind, setObjectsToFind]  = useState([
    {id: 0, name: "Odlaw", x: 24, y: 49, found: false, imgURL: odlaw},
    {id: 1, name: "Wally", x: 53, y: 48, found: false, imgURL: wally},
    {id: 2, name: "Wizard", x: 63, y: 48, found: false, imgURL: wizard}
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
      coord1 - 1 === coord2 ||
      coord1 - 2 === coord2 ||
      coord1 - 3 === coord2 ||
      coord1 - 4 === coord2 ||
      coord1 - 5 === coord2 
    );
  };

  const checkForWinner = () => {
    if (score == 2) {
      setMessage("Congratulations you have won the game!")
      setGameOver(true);
    }
  }

  const hidePopup = () => {
    setIsClicked(false)
  }
  
  // checks if a character is found or not
  // if found then it just shows a message saying 'You have found the character "name"'
  const checkForACharacter = (id) => {
    objectsToFind.map(character => {
      if (character.id == id) {
        const hasFoundTheCharacter = isCoordWithinSomeReasonableDegree(character.x, boxPosition.x) && isCoordWithinSomeReasonableDegree(character.y, boxPosition.y)
        
        if (hasFoundTheCharacter) {
          setScore(prevState => prevState + 1);
          character.found = true;
          setMessage(`You have found the character ${character.name}`);
        }
      }
    })

    hidePopup();
    checkForWinner();
  }


  // handles the click
  const handleClickOnImg = (e) => {
    if (gameOver) {
      return;
    }
    
    if (e.target.nodeName != "IMG") {
      return;
    };

    setIsClicked(true); // changes the isClickes variable
    const xCoord = Math.round((e.nativeEvent.offsetX / e.nativeEvent.target.offsetWidth) * 100); // clicked x coordinate
    const yCoord = Math.round((e.nativeEvent.offsetY / e.nativeEvent.target.offsetHeight) * 100); // clicked y coordinate

    setBoxPosition({x: xCoord, y: yCoord}); // updating the x and y coordinate of the box
  }

  return (
    <div className="page-container">
      <nav className="header-container">
        <div className="images-container">
        {
          objectsToFind.map((character,index) => {
            if (character.found == true) {
              return (
                <div className="character-face-container" key={index}>
                  <img className="character-face found" src={character.imgURL}/>
                </div>
              )
            } else {
              return (
              <div className="character-face-container" key={index}>
                <img className="character-face" src={character.imgURL}/>
              </div>
              )
            }
          })
        }
        </div>
          <NavLink to="/">
            <button className="return-home-button">
              Return to home
            </button>
          </NavLink>
      </nav>
      <main>
        <div onClick={handleClickOnImg} className="image-container">
        {
          isClicked && 
          <div style={{left: boxPosition.x + "%", top: boxPosition.y + "%"}} className="box">
            <li onClick={() => {checkForACharacter(0)}}>Odlaw</li>
            <li onClick={() => {checkForACharacter(1)}}>Wally</li>
            <li onClick={() => {checkForACharacter(2)}}>Wizard</li>
          </div>
        }
        <img src={WaldoPicture} />
        </div>
      </main>
    </div>
  )
}