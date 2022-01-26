/* eslint-disable default-case */
import React, {useContext, useState, useEffect} from 'react';
import {Line} from 'react-chartjs-2';
import { useMutation } from '@apollo/react-hooks';
import { UPDATE_STOCK } from '../util/graphql';
import useForceUpdate from 'use-force-update';
//import { useHistory } from "react-router-dom";
import { AuthContext } from '../context/auth';
// import {news} from './news';

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export default function StockCard(props) {
  const [state, setState] = useState(props.state);
  // state.price = 100;
  // state.closingPrice[0] = 100;
  // state.money[0] = 0;
  // state.graphInd = 0;
  // addPreConditionTicks();
  // setState(()=>state);

  console.log(state);

  const forceUpdate = useForceUpdate();
  const {user, logout} = useContext(AuthContext);
  //let history = useHistory();
    const [UpdateStock, {loading}] = useMutation( UPDATE_STOCK, {
      update(
        _,
        {
          data: { updateStock: d }
        }
      ) {
      },
      variables: { stockId: state.id,
         timeStamp : state.timeStamp,
         cdecisions : state.cdecisions,
         money : state.money }
    });
    useEffect(() => {
      if(user)
      window.addEventListener('keydown', onKeyDown);
  
      return () => {
        window.removeEventListener('keydown', onKeyDown);
      };
    });

    useEffect(() => {
      let ind = state.ind;
      if(user)
      {
      if(ind===state.news.length)
      {  if(user)
          UpdateStock();      
          logout();
          console.log("game ended");
          state.predict = "Game Ended. Please close the tab."
          if(loading)
          console.log("loading");
      }
      }
    });
     
  function onKeyDown(e){
    e.preventDefault();
    e = e || window.event;
    if(state.ind<12)
    {
    var d = new Date(state.createdAt);
    var ne = d.getTime();
    d = new Date();
    var n = d.getTime();
    let ind = state.ind;
    state.timeStamp[ind] = n-ne;
    let p = state.price;
    // let today = state.datasets[0].data[49];
    let nind = Math.abs(state.participantInfo.sequence[ind-1])-1;

    let today = state.price*(1 + 0.01 * state.news[nind].priceEffect);
    console.log(p, today);
    // switch (pre){
    //     case 1:
    //       if(p>=today)
    //       {
    //         state.cprediction[ind] = state.cprediction[ind-1]+1;
    //       }
    //       else
    //       state.cprediction[ind] = state.cprediction[ind-1];
    //       break;
    //     case 0:
    //       if(p<today)
    //       {
    //         state.cprediction[ind] = state.cprediction[ind-1]+1;
    //       }
    //       else
    //       state.cprediction[ind] = state.cprediction[ind-1];
    //       break;
    // }
    switch (e.keyCode) {
      case 38:
        // state.decisions[ind] = 1;
        state.cdecisions[ind] = 1;
        state.money[ind] = today-p+state.money[ind-1];
        if(today>=p)
        {
          state.color = 'green';
        }
        else
        {
          state.color = 'red';
        }
         nextDay();
        break;
      case 40:
        // state.decisions[ind] = -1;
        state.cdecisions[ind] = -1;
        state.money[ind] = p-today+state.money[ind-1];

        if(p>=today)
        {
          state.color = 'green';
        }
        else
        {
          state.color = 'red';
        }
         nextDay();
        break;
    }
  }
  }

  function addPreConditionTicks() {
    var newPrice;

    console.log(state.price);

    let t = state.participantInfo.sequence[state.ind-1];
    for(let i = 0 ; i < 3 ; ++i) {
      let randNumber = randomIntFromInterval(2, 6);
      if(t > 0) {
        newPrice = state.price*(1+(0.01*randNumber));    
      }
      else {
        newPrice = state.price*(1-(0.01*randNumber));    
      }

      // auxArrData.push(state.graphInd);
      // auxArrInd.push(newPrice);

      // state.labels.append(auxArrInd);
      // state.datasets[0].data.append(auxArrData);
      state.labels.push(state.graphInd);
      state.datasets[0].data.push(newPrice);
      // state.labels.shift();
      // state.datasets[0].data.shift();
      state.graphInd++;
      state.price = newPrice;
      console.log(i, state.price);
      setState(()=>state);

      // console.log(i, state.price, state.graphInd, state.datasets[0].data);

    }
    
  }

  function nextDay(){
    if(state.ind<12)
    {
      console.log("next day ", state);
    let ind = state.ind;
    // let pred = state.prediction[ind];
    // if(pred === 1)
    // {
    //   state.predict = "Prediction : BUY";
    // }
    // else if(pred === 0)
    // {
    //   state.predict = "Prediction : SHORT";
    // }
    // let p = state.closingPrice[ind];
    let n = Math.abs(state.participantInfo.sequence[ind-1])-1;
    // state.closingPrice[ind] = state.price;
  
    var newPrice = state.price*(1+(0.01*state.news[n].priceEffect));

    
    state.labels.push(state.graphInd);
    state.datasets[0].data.push(newPrice);
    state.labels.shift();
    state.datasets[0].data.shift();
    state.graphInd++;
    state.price = newPrice;
    // state.ind++;
    setState(()=>state);
    console.log("201 ", state);
    addPreConditionTicks();

    state.ind++;
    setState(()=>state);
    forceUpdate();
  }
  }
    return (
      <>
      <div className="ui segment three column grid">
        <br/>
      <div className="six wide column">
         <h1 className = "ui center aligned header" > Total Money : {(state.money[state.ind-1]).toFixed(2)}</h1>
      </div>
      <div className="six wide column">
        <h1 className = {`ui center aligned ${state.color} header`} >You Earned { state.ind === 1 ? 0.00 : (state.money[state.ind-1]- state.money[state.ind-2]).toFixed(2)} Today</h1>
      </div>
      </div>
      <div className="ui segment two column grid">
      {
        state.participantInfo.controlGroup === 3 ? <p></p> :

        <div className="nine wide column">
          <Line
          data={state}
          options={{
            title:{
              display:false,
              text:'Stock Price',
              fontSize:20
            },
             legend:{
              display:false,
             },
             bezierCurve: false,
          }}
        />
      </div>
    }

      <div className = "seven wide column">
        <h2 className="ui left aligned header"> Current Price :  {state.pr}</h2>
        {/* <h2 className="ui left aligned header"> Target Price :  {(state.predictedPrice[state.ind-1]).toFixed(2)}</h2> */}
        { state.predict === "Game Ended. Please close the tab." ? 
           <h3 className="ui left aligned header" style={{textAlign: "justify"}}> <div>Game ended. Please logout</div></h3> :
           <h3 className="ui left aligned header" style={{textAlign: "justify"}}> <div>News :  {state.news[Math.abs(state.participantInfo.sequence[state.ind-1])-1].newsText}</div></h3>
        }
        {/* <h3 className="ui left aligned header" style={{textAlign: "justify"}}> <div>News :  {state.news[Math.abs(state.participantInfo.sequence[state.ind-1])-1].newsText}</div></h3> */}
        <br/>
        {/* <h1 className="ui left aligned header"> {state.predict} </h1> */}
        <br/>
        {/* <h2 className="ui left aligned header">Correct Decisions : {state.cdecisions[state.ind-1]} / {state.ind - 50}</h2> */}
        {/* <h2 className="ui left aligned header">Correct Predictions : {state.cprediction[state.ind-1]} / {state.ind - 50}</h2> */}
      </div>
      </div>
      </>
    );
}