import React from 'react';
import {connect} from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import HTTPRequest from 'helper/httpRequest';

import { loadAuthData } from 'store/auth/actions';

import * as localStorageItemConstant from 'constant/localStorageItem';
import * as routeNameConstant from 'constant/routeName';

import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Col,
    Alert
} from 'reactstrap';

class LoginComponent extends React.Component {
    state = {
        errorMessage: null,
        isLoading: false,
        username: '',
        password: ''
    };

    onInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    onSubmit = e => {
        e.preventDefault();

        this.setState({
            isLoading: false
        });

        HTTPRequest.post({
            url: 'authentication/signin',
            data: {
                username: this.state.username,
                password: this.state.password,
            }
        }).then(response => {
            if(response.data.code !== "SUCCESS") {
                // Show message
                console.log(response.data)
                return;
            }
            localStorage.setItem(localStorageItemConstant.LOCAL_STORAGE_ITEM_TOKEN, response.data.data.token)
            this.props.loadAuthData(response.data.data)

            this.setState({
                isLoading: false,
                errorMessage: null
            });

            this.props.history.push(`/${routeNameConstant.ROUTE_NAME_MAIN}`)
            
        }).catch(error => {
            this.setState({
                isLoading: false,
                errorMessage: error.response.data.error
            });

            // Show message
        });
    };

    componentWillUnmount() {
        this.setState({
            errorMessage: null
        });
    };

    render() {
        return (
            <div>
                <Form className="Auth-form" onSubmit={this.onSubmit}>
                    <h3>Login</h3>
                    {
                        this.state.errorMessage ? <Alert color="danger">{this.state.errorMessage}</Alert> : null
                    }
                    <FormGroup row>
                        <Label className="Auth-form__label--title" for="username" sm={2}>Username</Label>
                        <Col sm={10}>
                            <Input 
                                name="username" 
                                id="username" 
                                type="text" 
                                placeholder="Your username"
                                required
                                onChange={this.onInputChange} 
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label className="Auth-form__label--title" for="username" for="password" sm={2}>Password</Label>
                        <Col sm={10}>
                            <Input 
                                name="password" 
                                id="password" 
                                type="password" 
                                placeholder="Your password"
                                required
                                onChange={this.onInputChange}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup >
                    <Col sm={{offset:2}} className="Auth-form__footer">
                        <Label>
                            Don't have account?
                            <Link to={`/${routeNameConstant.ROUTE_NAME_AUTH}/${routeNameConstant.ROUTE_NAME_REGISTER}`}> Register now</Link>
                        </Label>
                        <Button color="success">Submit</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        )
    }
};

const mapStateToProps = state => ({

});

const mapDispatchToProps = (dispatch) => ({
    loadAuthData: (newAuthData) => dispatch(loadAuthData(newAuthData))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginComponent));
