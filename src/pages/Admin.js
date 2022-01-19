import React, { useContext } from 'react';
import gql from 'graphql-tag';
import { AuthContext } from '../context/auth';
import { useQuery } from '@apollo/react-hooks';
import { FETCH_ALLNEWS_QUERY } from '../util/graphql';
import Dashboard from '../components/Dashboard';



function Admin(props) {
    const {
        data: {getAllNews}
    } = useQuery(FETCH_ALLNEWS_QUERY, {
        variables: {

        }
    })

    let postMarkup;
    console.log(getAllNews);
    if(!getAllNews) {
        postMarkup = <p> Loading news ...</p>
    } else {
        var news = getAllNews;
        var state = news;
        console.log("state news->", state); 
        postMarkup = (
            <div className = "ui segment">
                <Dashboard state = {state}/>
            </div>
        );
    }
    
    return postMarkup;
}

export default Admin;