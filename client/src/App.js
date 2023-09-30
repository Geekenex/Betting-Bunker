import { createElement } from 'react';
import './App.css';

function App() {
  let hiddenCount = 16;
  let mineCount = 2;

  function mineLogic(e){
    let image =  e.target.childNodes[1]
    image.display = "block";
    e.target.disabled = true;
    let randomNumber = Math.random(0) * hiddenCount;
    if (randomNumber > mineCount){
      hiddenCount--;
      console.log(hiddenCount)
      image.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJOQoEJ96e8C2yYRnBkIDL0JXM7byzdChafi0MTeTO&s"
    }
    else {
      image.src = "https://img.freepik.com/premium-vector/cannon-balls-cute-cartoon-black-bomb_634248-10.jpg"
      console.log("hit mine")
    }
    // hit gem -> hiddenCount--;
    
  }

    // Generate a 4x4 grid of div elements
    const mines = Array.from({ length: 16 }).map((_, index) => (
      <div key={index} className="mine">
        <button className='mineBtn' onClick={mineLogic}>
          M
          <img display="none" src=""></img>
        </button>
      </div>
    ));


  return (
    <div className="App">
      <button className="btn btn-primary login">Log in</button>


      <div className="mineContainer">
      {mines}

      </div>

    </div>
  );
}

export default App;