import './App.css';

function App() {
  //Global variables
  let hiddenCount = 16;
  let mineCount = 2;
  let balance = 100;
  let bet = 10;
  let profit = 0;
  let returnMoney = bet;

  function mineLogic(e) {
    let image =  e.target.childNodes[0];
    image.display = "block";
    e.target.disabled = true;
    let randomNumber = Math.floor(Math.random() * hiddenCount);
    if (randomNumber > mineCount){
      hiddenCount--;
      console.log(hiddenCount)
      image.src = "https://images.vexels.com/media/users/3/157265/isolated/preview/d546c542730b45e5893fc0ed71c8f4d7-blue-diamond-stone-vector.png";
      //adjust bet and round to 2 decimal places
      returnMoney *= (1 + mineCount/hiddenCount);
      profit = returnMoney - bet;
      document.getElementById("betInfo").innerHTML = "Balance: $" + balance + "<br/>Bet: $" + bet + "<br/>Profit: $" + profit.toFixed(2);
      document.getElementById("cashoutBtn").innerHTML = "Cashout: $" + returnMoney.toFixed(2);
    }
    else {
      image.src = "https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/60401/bomb-clipart-xl.png";
      console.log("hit mine");
      returnMoney = 0;
      profit = returnMoney - bet;
      document.getElementById("betInfo").innerHTML = "Balance: $" + balance + "<br/>Bet: $" + bet + "<br/>Profit: $" + profit.toFixed(2);
      document.getElementById("cashoutBtn").innerHTML = "Cashout: $" + returnMoney.toFixed(2);
    }
    // hit gem -> hiddenCount--;
    
  }

    // Generate a 4x4 grid of div elements
    const mines = Array.from({ length: 16 }).map((_, index) => (
      <div key={index} className="mine">
        <button className='mineBtn' onClick={mineLogic}>
          <img className="mineImg" display="none" src="" alt=''/>
        </button>
      </div>
    ));


  return (
    <div className="App">
      <button className="btn btn-primary login">Log in</button>
      <div className='mineGame'>
        <div className="mineContainer">
        {mines}
        </div>
        <div id="betInfo" className="betInfo">Balance: ${balance} <br/>Bet: ${bet}<br/>Profit: $0</div>
        <button id='cashoutBtn' className="btn btn-success cashoutBtn">Cashout: ${returnMoney}</button>
      </div>
    </div>
  );
}

export default App;