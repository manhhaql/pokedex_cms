import React, {useState, useEffect} from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
    Row, 
    Col, 
    Container, 
    Label}  from "reactstrap";

import HttpRequest from 'helper/httpRequest';

import './Dashboard.css';

const DashboardComponent = (props) => {
    const [totalPokemon, setTotalPokemon] = useState();
    const [totalUser, setTotalUser] = useState();
    const [totalAbility, setTotalAbility] = useState();

    const getTotalPokemon = () => {
        HttpRequest.get({
            url: `pokemon/list`,
            params:{
                limit: 1
            }
        }).then(response => {
            return setTotalPokemon(response.data.total)
        }).catch(error => {

        })
    }
    const getTotalUser = () => {
        HttpRequest.get({
            url: `users`,
            token: props.appAuthentication.token,
            params:{
                limit: 1
            }
        }).then(response => {
            return setTotalUser(response.data.total)
        }).catch(error => {

        })
    }
    const getTotalAbility = () => {
        HttpRequest.get({
            url: `properties/ability`,
            params:{}
        }).then(response => {
            return setTotalAbility(response.data.data.length)
        }).catch(error => {

        })
    }

    useEffect(()=>{
        getTotalPokemon();
        getTotalUser();
        getTotalAbility();
    }, []);

    return (
        
        <div className="Dashboard">
            <h2>DASHBOARD</h2>
            <Container>
                <Row>
                    <Col className="Dashboard-item bg-success">
                        <Label>Total Pokemon:</Label>
                        <h2>{totalPokemon}</h2>
                    </Col>
                    <Col className="Dashboard-item bg-primary">
                        <Label>Total User:</Label>
                        <h2>{totalUser}</h2>
                    </Col>
                </Row>
                <Row>
                    <Col className="Dashboard-item bg-warning">
                    <Label>Total Blog Post:</Label>
                        <h2>Coming Soon</h2>
                    </Col>
                    <Col className="Dashboard-item bg-info">
                        <Label>Total Ability:</Label>
                        <h2>{totalAbility}</h2>
                    </Col>
                </Row>

            </Container>
        </div>
    )
};

const mapStateToProps = (state) => ({
    appAuthentication: state.appAuthentication.current
});

const mapDispatchToProps = (dispatch) => ({

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DashboardComponent));