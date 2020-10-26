import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

import { register } from '../../store/auth/actions';
import { clearError } from '../../store/error/actions';

import * as authActionTypes from '../../store/auth/actionTypes';

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
        message: null,
        username: '',
        email: '',
        phone: '',
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
        this.props.register(user, this.props.history)
        
    };

    componentDidUpdate(prevProps) {
        const {error, isAuthenticated} = this.props;
        if(error !== prevProps.error) {
            if(error.code === authActionTypes.REGISTER_FAILED) {
                this.setState({
                    message: error.error
                })
            } else {
                this.setState({
                    message: null
                })
            }
        }
    };
    
    componentWillUnmount() {
        this.props.clearError();
    }

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
                            <Link to="/auth/login"> Back to Login</Link>
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
    isAuthenticated: state.appAuthentication.isAuthenticated,
    error: state.appError
});

const mapDispatchToProps = (dispatch) => ({
    register: (user, history) => dispatch(register(user, history)),
    clearError: () => dispatch(clearError())
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterComponent);


 
