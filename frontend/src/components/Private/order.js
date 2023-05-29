import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';

function Order(props) {


    const [restaurants, setRestaurants] = useState([]);
    const [dishes, setDishes] = useState({});
    const [selectedRes, setSelectedRes] = useState('');
    const [selectedDish, setSelectedDish] = useState('');
    const [recommendation, setRecommendation] = useState('');
    const [orderResponse, setOrderResponse] = useState('');

    const url_rest = "https://8hpfxircq3.execute-api.us-west-1.amazonaws.com/default/restaurants";
    const url_dishes = "https://dxih3nrz7b.execute-api.us-west-1.amazonaws.com/default/dishes";
    const url_recommend = "https://2oyrg6shsk.execute-api.us-west-1.amazonaws.com/dev/recommend";
    //const url_orderSubmit = "https://hxcf37objk.execute-api.us-west-1.amazonaws.com/default/submitOrder";
    const url_orderSubmit = "https://g3jrv1ae0i.execute-api.us-east-1.amazonaws.com/default/submitOrder";
    useEffect(() => {
        async function fetchdata() {
            await axios.get(url_rest).then((res) => {
                let list = JSON.stringify(res.data.Items);
                console.log(list);
                setRestaurants(JSON.parse(list));
            });
        }
        fetchdata();
    }, []);

    function getRecommendation(id) {
        setSelectedDish(id.id);
        console.log(id);

        axios.post(url_recommend, id).then((res) => {
            let list = JSON.parse(JSON.stringify(res.data));
            console.log(list);
            var recStr = 'Recommendations: \n';
            if(list.length > 2){
                for (var i = 0; i < 2; i++) {
                    var item = list[i];
                    if (i !== (list.length - 1)) {
                        recStr += " " + (Math.round(list[i].score * 100)) + "% customers also liked " + list[i].title + ", ";
                    }
                }
            }else{
                for (var i = 0; i < list.length; i++) {
                    var item = list[i];
                    if (i !== (list.length - 1)) {
                        recStr += " " + (Math.round(list[i].score * 100)) + "% customers also liked " + list[i].title + ", ";
                    }
                }
            }
            
            console.log(recStr);
            setRecommendation(recStr);
        });
    }

    function showDishes(id) {
        setSelectedRes(id);
        setSelectedDish("");
        axios.get(url_dishes).then((res) => {
            let list = JSON.parse(JSON.stringify(res.data.Items));
            console.log(list);
            var dish = [];
            for (var i in list) {
                var item = list[i];
                if (item.restaurantId.S === id) {
                    dish.push({
                        "id": item.id.S,
                        "cuisine": item.cuisine.S,
                        "ingredients": item.ingredients.S,
                        "restaurantId": item.restaurantId.S,
                        "title": item.title.S
                    });
                }

            }
            console.log(dish);
            setDishes(dish);
        });
    }

    function submitOrder() {
        if (selectedRes && setSelectedDish) {
            let data = {
                'restaurantId': selectedRes,
                'foodId': selectedDish
            }
            axios.post(url_orderSubmit, JSON.stringify(data)).then((res) => {
                let list = JSON.parse(JSON.stringify(res.data));
                console.log(res.data);
                setOrderResponse(res.data);
            });
        }else{
            setOrderResponse("Please select the restaurant or dish first!");
        }
    }

    return (
        <Container>
            <h2>Place an Order</h2>

            <Row>
                <Col>Restaurants: </Col>
                <Col>
                    {restaurants.map((restaurant, index) => (
                        <Row key={index}>
                            <Col>
                                <button style={{ backgroundColor: '#8EE4AF', width: '200px' }} onClick={() => showDishes(restaurant.restaurantId.N)}>{restaurant.name.S}</button>
                            </Col>
                            <Col>
                                {selectedRes === restaurant.restaurantId.N ?
                                    <h6>Selected</h6> :
                                    <h6></h6>}
                            </Col>
                        </Row>
                    ))}
                </Col>
            </Row>

            <Row className="pt-4">
                <Col>Dishes: </Col>
                <Col>
                    {dishes && dishes.length > 0 ?
                        dishes.map((dish, index) => (
                            <Row key={dish.restaurantId.N}>
                                <Col>
                                    <button style={{ backgroundColor: '#8EE4AF', width: '100px' }} onClick={() => getRecommendation(dish)}>{dish.title}</button>
                                </Col>
                                <Col>
                                    {selectedDish === dish.id ?
                                        <h6>Selected</h6> :
                                        <h6></h6>}
                                </Col>
                            </Row>
                        ))
                        : <h6>Please select a restaurant.</h6>}
                </Col>
            </Row>
            <h3>{recommendation}</h3>

            <button onClick={() => submitOrder()}>Place order</button>

            <h3>{orderResponse}</h3>
        </Container>
    );

}
export default Order;