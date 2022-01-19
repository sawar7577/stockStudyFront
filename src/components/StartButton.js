import React, {useContext} from 'react';
import { Button } from 'semantic-ui-react';
import { AuthContext } from '../context/auth';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_STOCK } from '../util/graphql';
import { REGISTER_NEWS } from '../util/graphql';
import { useHistory } from "react-router-dom";
const tick = ["AAPL",	"MSFT",	"AMZN",	"GOOGL", "TSLA",	"NVDA",	"CMCSA",
  "PYPL",	"NFLX",	"TWLO",	"SHOP",	"ZM",	"DDOG",	"FB"];
var rn = Math.floor(Math.random() * 14);

const instate ={
 ticker: tick[rn],
 link: "/",
 name: "PLAY",
 d: false
}
function StartButton(props) {
  var state = instate;
  const { user } = useContext(AuthContext);
  let history = useHistory();
  const [CreateStock, { loading }] = useMutation(CREATE_STOCK, {
    update(
      _,
      {
        data: { createStock: d }
      }
    ) {
      state.link = `/stocks/${d.id}`;
      state.name = "PLAY";
      history.push(state.link);
    },
    variables: { ticker: state.ticker, 
      prob: props.state.prob }
  });

  // const [RegisterNews, {newsLoading}] = useMutation(REGISTER_NEWS, {
  //   update(
  //     _,
  //     {
  //       data: { registerNews: d }
  //     }
  //   ) {
  //     console.log(d);
  //   },
  //   variables: {
  //     newsText: "asdadad"
  //   }
  // })

  function Checkl(){
    state.name = "LOADING...";
    state.d = true;
    rn = Math.floor(Math.random() * 52);
    state.ticker = tick[rn];
    if(user)
    {
      CreateStock();
      // RegisterNews();
      if(loading)
        state.name = "LOADING...";
    }
    else
    alert("PLEASE LOGIN FIRST");
  }
  return (
  <div>
      <Button className="ui huge primary button" onClick={Checkl} disabled = {state.d}>
        {state.name}
      </Button>
  </div>
  );
  

}

export default StartButton;

