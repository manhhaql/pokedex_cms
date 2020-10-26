import React from 'react';
import {connect} from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { login } from '../../store/auth/actions';
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

class LoginComponent extends React.Component {
    state = {
        message: null,
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
        const user = {
            username: this.state.username,
            password: this.state.password,
        }
        this.props.login(user, this.props.history)
    };

    componentDidUpdate(prevProps) {
        const {error, isAuthenticated} = this.props;
        if(error !== prevProps.error) {
            if(error.code === authActionTypes.LOGIN_FAILED) {
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
                    <h3>Login</h3>
                    {
                        this.state.message ? <Alert color="danger">{this.state.message}</Alert> : null
                    }
                    <FormGroup row>
                        <Label for="username" sm={2}>Username</Label>
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
                        <Label for="password" sm={2}>Password</Label>
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
                    <Col sm={{offset:2}} className="Auth-form__footer pt-2">
                        <Label>
                            Don't have account?
                            <Link to="/auth/register"> Register now</Link>
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
    login: (user, history) => dispatch(login(user, history)),
    clearError: () => dispatch(clearError())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginComponent));
