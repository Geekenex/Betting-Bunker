import './App.css';
import React, { useRef,useState,useEffect } from 'react';
import diamondSound from "./assets/diamondSound.wav";
import bombSound from "./assets/bombSound.wav";

function App() {
  //Global variables
  let mineCount = 2;

  const [hiddenCount, setHiddenCount] = useState(16);
  const [balance, setBalance] = useState(100);
  const [bet, setBet] = useState(0);
  const inputRef = useRef(null);
  const [profit, setProfit] = useState(0);
  const [returnMoney, setReturnMoney] = useState(bet);
  const [multiplier, setMultiplier] = useState(1.0);
  const [isBetDisabled, setBetDisabled] = useState(false);
  const [isInputDisabled, setInputDisabled] = useState(false);
  const [isCashoutDisabled, setCashoutDisabled] = useState(true);
  const [lostGame, setLoseGame] = useState(false);
  const diamondAudio = new Audio(diamondSound);
  diamondAudio.volume = 0.7;
  const bombAudio = new Audio(bombSound);
  bombAudio.volume = 0.7;

  const [mineImages, setMineImages] = useState(Array(16).fill(''));
  const [mineButtonsDisabled, setMineButtonsDisabled] = useState(Array(16).fill(false));

  function mineLogic(e, index) {
    if (mineButtonsDisabled[index]) {
      return;
    }
    if (!isBetDisabled)
      handleBet();

    setBetDisabled(true);
    setInputDisabled(true);
    setCashoutDisabled(false);

    let newMineImages = [...mineImages];
    let randomNumber = Math.floor(Math.random() * hiddenCount);

    if (randomNumber >= mineCount) { //Diamond hit
      setHiddenCount(prevCount => prevCount - 1);
      newMineImages[index] = "https://images.vexels.com/media/users/3/157265/isolated/preview/d546c542730b45e5893fc0ed71c8f4d7-blue-diamond-stone-vector.png";
      setMultiplier(multiplier * (1 + mineCount/hiddenCount));
      setReturnMoney(returnMoney * (1 + mineCount/hiddenCount));
      diamondAudio.play(); 
    } else { //Bomb hit
      newMineImages[index] = "https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/60401/bomb-clipart-xl.png";
      setMultiplier(0.0);
      setReturnMoney(0);
      bombAudio.play();
      setLoseGame(true);
    }

    setMineImages(newMineImages);
    let newButtonsState = [...mineButtonsDisabled];
    newButtonsState[index] = true;
    setMineButtonsDisabled(newButtonsState);
  }

  //
  useEffect(() => {
    if (lostGame) {
      setMineButtonsDisabled(Array(16).fill(true));
      //grey out all mine squares
      let mines = document.getElementsByClassName('mine');
      for(let i = 0; i < mines.length; i++) {
        //add mine to disabled class
        mines[i].classList.add('disabledMine');
      }
    }
  }, [lostGame]);

  function handleBetInput(e) {
    let betValue = parseFloat(e.target.value);
    if (isNaN(betValue) || betValue > balance || betValue < 0) {
      setCashoutDisabled(true);
      setBetDisabled(true);
      setMineButtonsDisabled(Array(16).fill(true));
    } else {
      setBetDisabled(false);
      setMineButtonsDisabled(Array(16).fill(false));
      setBet(betValue);
      setReturnMoney(betValue);
    }
  }

  function handleBet() {
    if (hiddenCount === 16) {
      setBalance(balance - bet);
      setBetDisabled(true);
      setInputDisabled(true);
    }
  }

  function resetGameBoard() {
    setMineButtonsDisabled(Array(16).fill(false));
    setMineImages(Array(16).fill(''));
    //remove gray out from all locked mine squares
    let mines = document.getElementsByClassName('mine');
    for(let i = 0; i < mines.length; i++) {
      //add mine to disabled class
      mines[i].classList.remove('disabledMine');
    }
  }

  useEffect(() => {
    setProfit(returnMoney - bet);
  }, [returnMoney, bet]);

  function handleCashout() {
    setBalance(balance + returnMoney);
    setBet(0);
    inputRef.current.value = '';
    setProfit(0);
    setHiddenCount(16);
    setBetDisabled(false);
    setInputDisabled(false);
    setCashoutDisabled(true);
    resetGameBoard();
    setLoseGame(false)
    setReturnMoney(0);
    setMultiplier(1.0);
  }
    // Generate a 4x4 grid of div elements
    const mines = Array.from({ length: 16 }).map((_, index) => (
      <div key={index} className="mine">
        <button className='mineBtn' onClick={(e) => mineLogic(e, index)}>
          <img className={`mineImg ${mineImages[index] ? 'reveal-animation' : ''}`} src={mineImages[index]} alt=''/>
        </button>
      </div>
    ));


  // Render the JSX
  return (
    <div className="App">
      <button className="btn btn-primary login">Log in</button>
      <div className='mineGame'>
        <div className='betMenu'>
          <label className='betLabel' htmlFor="bet-amount">Bet Amount</label>
          <div className="currency-wrap">
            <span className="currency-code">$</span>
            <input className="betIn"
                   name="bet-amount"
                   ref={inputRef}
                   onInput={handleBetInput}
                   type="number"
                   defaultValue={0}
                   min="0"
                   max={balance}
                   disabled={isInputDisabled}
            />
          </div>
          <button className="btn btn-success betBtn"
                  onClick={handleBet}
                  disabled={isBetDisabled}
          >
            Bet
          </button>
        </div>
        <div className="mineContainer">
          {mines}
        </div>
        <div className="betInfo">
          Balance: ${balance.toFixed(2)} <br/>
          Bet: ${bet.toFixed(2)}<br/>
          Profit: ${profit.toFixed(2)}<br/>
          <span className='multiText'>Multiplier: {multiplier.toFixed(2)}x</span>
        </div>
        <button className="btn btn-success cashoutBtn"
                onClick={handleCashout}
                disabled={isCashoutDisabled}
        >
          Cashout: ${returnMoney.toFixed(2)}
        </button>
      </div>
    </div>
  );
}

export default App;