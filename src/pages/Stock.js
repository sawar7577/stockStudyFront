import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import StockCard from '../components/StockCard'
import { FETCH_STOCK_QUERY } from '../util/graphql';


function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function Stock(props) {
  const stockId = props.match.params.stockId;
  const {
    data: { getStock }
  } = useQuery(FETCH_STOCK_QUERY, {
    variables: {
      stockId
    }
  });
  let postMarkup;
  if (!getStock) {
    postMarkup = <p>Loading post..</p>;
  } else {
    var {
        id,
        closingPrice,
        timeStamp,
        news,
        cdecisions,
        money,
        participantInfo,
        createdAt
    } = getStock;
    console.log("getStock", getStock);
    var price = 100;
    // var predict = prediction[49]===1 ? "Prediction : BUY" : "Prediction : SHORT";
    var ind = 1;
    var graphInd = 11;
    var auxArrData = [190, 183, 180, 141, 124, 100, 98, 90, 88, 100];
    var auxArrInd = [1, 2, 3, 4, 5 ,6 ,7, 8, 9, 10];
    let t = participantInfo.sequence[ind-1];
    for(let i = 0 ; i < 3 ; ++i) {
      let randNumber = randomIntFromInterval(2, 6);
      if(t > 0) {
          price = price*(1+(0.01*randNumber));    
        }
        else {
          price = price*(1-(0.01*randNumber));    
      }
      auxArrData.push(price);
      auxArrInd.push(graphInd);
      graphInd++;
    }
  var state = {
    id: id,
    createdAt: createdAt,
    color: 'black',
    closingPrice: closingPrice,
    // predictedPrice: predictedPrice,
    // prediction: prediction,
    timeStamp : timeStamp,
    news: news,
    participantInfo: participantInfo,
    // cprediction: cprediction,
    cdecisions : cdecisions,
    money : money,
    // decisions: decisions,
    // predict: predict,
    // prob: prob,
    price: price,
    ind:ind,
    graphInd: 14,
    labels: auxArrInd,
    // labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9','10'],
    // labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9',
    // '10', '11', '12', '13', '14', '15', '16', '17', '18', '19',
    // '20', '21', '22', '23', '24', '25', '26', '27', '28', '29',
    // '30', '31', '32', '33', '34', '35', '36', '37', '38', '39',
    // '40', '41', '42', '43', '44', '45', '46', '47', '48', '49','50'],
    datasets: [
      {
        label: "Stock Price",
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: auxArrData
      }
    ]
  }
  postMarkup = (
  <div className = "ui segment">
    <StockCard state={state}/>
  </div>
  );
  }
  return postMarkup;
}

export default Stock;


   
 
  