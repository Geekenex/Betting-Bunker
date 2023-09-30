import './App.css';

function App() {

  

    // Generate a 4x4 grid of div elements
    const mines = Array.from({ length: 16 }).map((_, index) => (
      <div key={index} className="mine">
        <button className='mineBtn'>M</button>
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