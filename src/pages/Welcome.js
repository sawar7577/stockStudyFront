import React, {useContext} from 'react';
import { useHistory } from "react-router-dom";
import { AuthContext } from '../context/auth';


function Welcome() {
    const {user} = useContext(AuthContext);
    let history = useHistory();
    function oncl()
    {
        history.push("/home")
    }
    if(user)
    {
  return (
    <div className="ui segment">
        <br/>
        <h1 className="ui center aligned header"> Fill the form shown below using the same login id used for the login</h1>
        <br/>
    <div className="ui two column grid middle aligned">
      <div className = "ten wide column">
        <p align="center"> 
        <iframe src="https://docs.google.com/forms/d/e/1FAIpQLScI1PElVRyjSz0XVM6HiR-sxt32ALYb8Kas8NkiWgxFNzBEgw/viewform?usp=sf_link" title="trustForm" width="640" height="1200" frameBorder="0" marginHeight="0" marginWidth="0">Loading…</iframe> </p>
      </div>
      <div className = "six wide column">
        <h1 className="ui center aligned header"> Click next button after submitting the form to read the instructions. </h1>
        <h1 className="ui center aligned header"> <button className="ui huge primary button" onClick={oncl} > NEXT </button> </h1> 
      </div>
    </div>
  </div>  
  );
    }
    else
    {
        return(
        <div className="ui segment">
          <br/>
          <br/>
            <h1 className="ui center aligned huge header"> Welcome to the Experiment.</h1> 
            <br/>
            <div>
            <h2 className="ui center aligned header"> PLEASE USE LAPTOP/DESKTOP</h2> 
            <h3 className="ui center aligned header"> 
            You need to use arrow keys for input so, don't use smartphones.<br/>
            You won't be able to play the game.</h3>       
        </div>  
        <br/>
            <h1 className="ui center aligned header"> Login or register to enter the experiment.</h1> 
                
        </div>
        );
    }
}

export default Welcome;

