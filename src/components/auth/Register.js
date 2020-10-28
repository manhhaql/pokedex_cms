import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

import HTTPRequest from 'helper/httpRequest';

import {loadAuthData} from 'store/auth/actions';

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

class RegisterComponent extends React.Component {
    state = {
        errorMessage: null,
        isLoading: false,
        username: '',
        email: '',
        password: '',
        password_check:'',
        type: 1
    };

    onInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    onSubmit = e => {
        e.preventDefault();
        const user = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            password_check: this.state.password_check,
            type: this.state.type,
        }
        this.setState({
            isLoading: false
        });

        HTTPRequest.post({
            url: 'authentication/signup',
            data: {
                user,
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
                    <h3 className="mb-4">Register</h3>
                    {
                        this.state.message ? <Alert color="danger">{this.state.message}</Alert> : null
                    }
                    <FormGroup row>
                        <Label for="username" sm={4} className="mb-2">
                            Username (<code>*</code>)
                        </Label>
                        <Col sm={8}>
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
                        <Label className="mb-2" for="email" sm={4}>
                            Email (<code>*</code>)
                        </Label>
                        <Col sm={8}>
                            <Input 
                                name="email"
                                id="email" 
                                type="email"
                                placeholder="Your email"
                                required
                                onChange={this.onInputChange}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label className="mb-2" for="password" sm={4}>
                            Password (<code>*</code>)
                        </Label>
                        <Col sm={8}>
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
                    <FormGroup row>
                        <Label className="mb-2" for="password_check" sm={4}>
                            Match Password (<code>*</code>)
                        </Label>
                        <Col sm={8}>
                            <Input 
                                name="password_check"
                                id="password_check" 
                                type="password"
                                placeholder="Retype password"
                                required
                                onChange={this.onInputChange}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup >
                    <Col sm={{offset:4}} className="Auth-form__footer pt-4">
                        <Label>
                            Have an account?
                            <Link to={`/${routeNameConstant.ROUTE_NAME_AUTH}/${routeNameConstant.ROUTE_NAME_LOGIN}`}> Back to Login</Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(RegisterComponent);


 
