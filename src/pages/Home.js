import React from 'react';
import StartButton from '../components/StartButton';
// import ui from './ui.png';
import ui from './rimg.jpg';

function Home() {
  var p =  Math.floor(Math.random()* 2 );
  var prob = sessionStorage.getItem("vkey");
  if(prob === null)
  {
  prob = p===1 ? "80%" : "70%";
  sessionStorage.setItem("vkey", prob);
  }
  const state = {prob};
  return (
    <div className="ui segment">
      <div className = "ui segment">
      <div className="ui three column grid"> 
        <div className = "ui five wide column" >
        <h3>This is a Stock price prediction game. You will be given news about the company which can be financial, management/restructuring or insider trading related which you can use to predict whether the stock price will go up (BUY) or go down (SHORT). 
            {/* A target price for the next day is also given as a prediction. */}
          {/* <br/> The algorithm used to make predictions is well trained machine learning algorithm and have an average of {prob} accuracy. */}
        </h3>
        {/* <h3>This is a Stock price prediction game. You will be given a prediction about whether the stock price will go up (BUY) or go down (SHORT). 
            A target price for the next day is also given as a prediction.
          <br/> The algorithm used to make predictions is well trained machine learning algorithm and have an average of {prob} accuracy.
        </h3> */}
        </div>
        <div className = "ui five wide column" >
        <h4>
          If you think the price will go up, you can buy, and if you believe the price will go down, you can short-sell the stock.
          You can choose these options using arrow keys. Use Up-arrow for "BUY" and Down-arrow for "SHORT." 
          <br/>
          <br/>If you buy and the price goes up, you will earn the difference between the next day's price and today's price.
          <br/>If you sell and the price goes down, you will earn the difference between today's price and the next day's price. 
        </h4>
        </div>
        <div className = "ui five wide column" >
        <h4>
        You will be shown the first fifty days of a stock's closing price, and the game will simulate the next thirty days.
        Besides the chart, you will be shown the total money earned by you and the money you made on the last day. 
        </h4>
        <h3>You will automatically go to the next day if you take any decision by pressing arrow keys.
        </h3>
        </div>
      </div>
      <br/>
      </div>  
      <div className="ui two column grid"> 
        <div className = "ten wide column" >
          <h1 className="ui center aligned header"> Game UI will look as shown below. </h1>
          <img src = {ui} alt = "UI" border = "2"/>
          {/* <h3 className="ui center aligned header"> Correct Decisions is the number of times you made correct decision
          <br/> Correct predictions is the number of times algorithm made correct prediction </h3> */}
          
        </div>
        <div className = "ui six wide column" >
          <br/>
          <br/>
          <br/>
          <h2 className="ui center aligned header"> Click Play Button to play the game. </h2>
          <h1 className="ui center aligned header"> <StartButton state = {state}/>  </h1>
          <h2 className="ui center aligned header"> You can use arrow keys to start the game. </h2>
        </div>
      </div>
  </div>  
  );
}

export default Home;

