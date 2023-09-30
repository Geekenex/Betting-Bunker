import './App.css';

function App() {
  //Global variables
  let hiddenCount = 16;
  let mineCount = 2;
  let balance = 100;
  let bet = 0;
  let profit = 0;
  let returnMoney = bet;

  // Function used to update labels
  function updateLabels(){
    document.getElementById("betInfo").innerHTML = "Balance: $" + balance.toFixed(2) + "<br/>Bet: $" + bet + "<br/>Profit: $" + profit.toFixed(2);
    document.getElementById("cashoutBtn").innerHTML = "Cashout: $" + parseFloat(returnMoney).toFixed(2);
  }

  function mineLogic(e) {
    // Handle the bet if the user clicks grid without clicking betBtn
    if (!document.getElementById("betBtn").disabled)
      handleBet();

    document.getElementById("betBtn").disabled = true;
    document.getElementById("betInput").disabled = true;
    document.getElementById("cashoutBtn").disabled = false;
    document.getElementById("cashoutBtn").onclick = handleCashout;
    let image =  e.target.childNodes[0];
    image.display = "block";
    e.target.disabled = true;

    // generate random number
    let randomNumber = Math.floor(Math.random() * hiddenCount);
    if (randomNumber >= mineCount){
      hiddenCount--;
      image.src = "https://images.vexels.com/media/users/3/157265/isolated/preview/d546c542730b45e5893fc0ed71c8f4d7-blue-diamond-stone-vector.png";
      //adjust bet and round to 2 decimal places
      returnMoney *= (1 + mineCount/hiddenCount);
      profit = returnMoney - bet;
      updateLabels()
    }
    else {
      image.src = "https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/60401/bomb-clipart-xl.png";
      returnMoney = 0;
      profit = returnMoney - bet;
      updateLabels()
    }   
  }
  
  function handleBetInput(e){
    let betValue = parseFloat(e.target.value)
    if (betValue === "" || isNaN(betValue) || betValue > balance || betValue < 0){
      document.getElementById("cashoutBtn").disabled = true;
      document.getElementById("betBtn").disabled = true;
      let mineBtns = document.getElementsByClassName("mineBtn");
      for (let i = 0; i < mineBtns.length; i++){
        mineBtns[i].disabled = true;
      }
  
    }
    else {
      document.getElementById("betBtn").disabled = false;
      let mineBtns = document.getElementsByClassName("mineBtn");
      for (let i = 0; i < mineBtns.length; i++){
        mineBtns[i].disabled = false;
      }
  
      bet = e.target.value;
      returnMoney = bet;
    }
  }

  function handleBet(e){
    if (hiddenCount === 16){
      balance -= bet;
      document.getElementById("betBtn").disabled = true;
      document.getElementById("betInput").disabled = true;
      updateLabels();
    }
  }

  function resetGame(){
    let mineBtns = document.getElementsByClassName("mineBtn");
    for (let i = 0; i < mineBtns.length; i++){
      mineBtns[i].disabled = false;
    }

    let mineImgs = document.getElementsByClassName("mineImg");
    for (let i = 0; i < mineImgs.length; i++){
      mineImgs[i].src = "";
    }
    document.getElementById("betInput").value = 0;
  }

  function handleCashout(e){   
    balance += parseFloat(returnMoney);
    bet = 0;
    profit = 0;
    returnMoney = bet;
    hiddenCount = 16;
    document.getElementById("betBtn").disabled = false;
    document.getElementById("betInput").disabled = false;
    updateLabels();
    resetGame();
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
        <div className='betMenu'>
          <label htmlFor="bet-amount">Bet Amount</label>
          <input id="betInput" name="bet-amount" onInput={handleBetInput} type="number" defaultValue={0} min="0" max ={balance}></input>
          <button id='betBtn' className="btn btn-success betBtn" onClick={handleBet}>Bet</button>
        </div>
        <div className="mineContainer">
        {mines}
        </div>
        <div id="betInfo" className="betInfo">Balance: ${balance} <br/>Bet: ${bet}<br/>Profit: $0</div>
        <button id='cashoutBtn' className="btn btn-success cashoutBtn" onClick={handleCashout} disabled={true}>Cashout: ${returnMoney}</button>
      </div>
    </div>
  );
}

export default App;