import React, {useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { DELETE_NEWS, UPDATE_NEWS, REGISTER_NEWS } from '../util/graphql';
import useForceUpdate from 'use-force-update';

import { useQuery } from '@apollo/react-hooks';
import { FETCH_ALLNEWS_QUERY } from '../util/graphql';

import { useFormInt, useInstantForm } from '../util/hooks';

import {
  Container,
  Card,
  Button,
  Form,
  Input,
  TextArea
} from 'semantic-ui-react';

export default function Dashboard(props) {
    // console.log(props.state);
   
    const {
        data: {getAllNews}
    } = useQuery(FETCH_ALLNEWS_QUERY, {
        variables: {

        }
    })

    // const {onChange, onSubmit, values} = useForm(updateNewsCallback, {
    //     id: '',
    //     newsText: '',
    //     newsID: '',
    //   });
    console.log(getAllNews);
    const [state, setState] = useState(props.state);
    const forceUpdate = useForceUpdate();
    // const {user, logout} = useContext(AuthContext);
    
    // const news = state.news;
    // state.map(({id, newsID, newsText}) => {
     
    //     console.log(id, newsID, newsText);
        
    // })

    function AddNewsCard(props) {
        const initFormState = {
            id: '',
            newsText: '',
            newsID: 0,
            priceEffect: 0,
        }
        
        const {onChange, onChangeInt, onSubmit, values} = useFormInt(registerNewsCallback, initFormState);
        const [RegisterNews, {loading}] = useMutation(REGISTER_NEWS, {
            update(
                _,
                {
                    data : {registerNews: d}
                }
            ) {
                console.log("herrerere", d);
                // setState(()=>state);
                console.log("state",state);

                var newArray = state.slice();    
                newArray.push(d);   
                setState(newArray);
                // setState(state => ({[...state, d]}));
                forceUpdate();
            },
            variables: values
        });
        console.log(loading);
        function registerNewsCallback() {
            RegisterNews();
        }
        
        return (
            <Form  onSubmit={onSubmit}>
                {/* <Form.Field
                label='id'
                placeholder={id}
                name='id'
                value = {id}
                // onChange = 
                onChange={onChangeInt}
                value={values.id}
                control={Input}
                /> */}
                
                {/* <Form.Field
                label='newsID'
                // placeholder={newsID}
                name='newsID'
                onChange={onChangeInt}
    
                value={values.newsID}
                control={Input}
                /> */}
                
                <Form.Field
                label='newsText'
                // placeholder={newsText}
                name='newsText'
                onChange={onChange}
    
                value={values.newsText}
                control={TextArea}
                />

                <Form.Field
                label='priceEffect'
                // placeholder={newsID}
                name='priceEffect'
                onChange={onChangeInt}
    
                value={values.priceEffect}
                control={Input}
                />
                <Form.Button>Add</Form.Button>
                {/* <Button onClick={onClick} > Delete </Button> */}
            </Form>);
    }

    function NewsCard(props) {
        // console.log("newscard", props);
        const id = props.id;
        const newsID = props.newsID;
        const newsText = props.newsText;
        const priceEffect = props.priceEffect;


        const initDelState = {
            id: id
        }

        const initFormState = {
            id: id,
            newsText: newsText,
            newsID: newsID,
            priceEffect: priceEffect,
        }

        // console.log(initDelState, initFormState);
        // const {onClick, delValues} = useInstantForm(deleteNewsCallback, {
        //     id: id,
        // });
        
        const {onClick, instantValues} = useInstantForm(deleteNewsCallback, initDelState);
        // console.log(instantValues);
        const {onChange, onChangeInt, onSubmit, values} = useFormInt(updateNewsCallback, initFormState);
        // console.log(values);
        const [UpdateNews, {loading}] = useMutation(UPDATE_NEWS, {
            update(
                _,
                {
                    data : {updateNews: d}
                }
            ) {
                console.log("herrerere", d);
                // setState(()=>state);
                console.log("state",state);
                // var items = [...state.items];
                // console.log(items);
                setState(state.map(obj => {
                    return (obj.id === d.id ? d : obj);
                }));
                // setState({items} => ({
                //     items.map()
                // }));
                forceUpdate();
            },
            variables: values
        });
        console.log(loading);
        // const [DeleteNews, {deleteLoading}] = useMutation(DELETE_NEWS);


        const [DeleteNews, {deleteLoading}] = useMutation(DELETE_NEWS,{
            update(
                _,
                {
                    data: {deleteNews: d}
                }
            ) {
                console.log(d);
                setState(state.filter(function(item){
                    return item.id !== d.id;
                }) );
                forceUpdate();
            },
            variables: instantValues

        });

        console.log(deleteLoading);
        // console.log(DeleteNews);

        // console.log(instantValues, values);
        function updateNewsCallback() {
            UpdateNews();
          }

        function deleteNewsCallback() {
            console.log(instantValues);
            DeleteNews();

            // console.log(delValues, values);
            // DeleteNews({variables: instantValues});
        }

        // function onClick(e) {
        //     e.preventDefault();
        //     console.log(e.target.id);
        //     // console.log(DeleteNews);
        //     DeleteNews(e.target.id);
        // }
        // console.log(id);
        return (
        <Form  onSubmit={onSubmit}>
            {/* <Form.Field
            label='id'
            placeholder={id}
            name='id'
            value = {id}
            // onChange = 
            onChange={onChangeInt}
            value={values.id}
            control={Input}
            /> */}
            
            {/* <Form.Field
            label='newsID'
            placeholder={newsID}
            name='newsID'
            onChange={onChangeInt}

            value={values.newsID}
            control={Input}
            /> */}
            
            <Form.Field
            label='newsText'
            placeholder={newsText}
            name='newsText'
            onChange={onChange}

            value={values.newsText}
            control={TextArea}
            />

            <Form.Field
            label='priceEffect'
            placeholder={priceEffect}
            name='priceEffect'
            onChange={onChangeInt}

            value={values.priceEffect}
            control={Input}
            />
            <Form.Button>Submit</Form.Button>
            <Button onClick={onClick} > Delete </Button>
        </Form>);
    }

    // console.log(onChange);
    return (
        <div>
            <p>data here</p>
            <Container>
            <Card.Group centered>
                <AddNewsCard></AddNewsCard>
                {
                  state.map(({ id, newsID, newsText, priceEffect }) => {
                    // console.log(id);
                    return (
                        <Card key={id}>
                        <Card.Content>
                            <Card.Header>{priceEffect}</Card.Header>
                        </Card.Content>
                        <Card.Content extra>
                            <Card.Description>{newsText}</Card.Description>
                        </Card.Content>
                        <NewsCard  newsID={newsID} newsText={newsText} id={id} priceEffect={priceEffect}></NewsCard>
                        </Card>
                    )}
                  )
                }
                </Card.Group>
                {/* <Container> */}
                {/* <Card.Group centered>
                    {
                    state.map(({ id, newsText, newsID }) => (
                    
                ))
                    }
                </Card.Group> */}

            {/* </Container> */}
            
            </Container>
        </div>
    );
}
