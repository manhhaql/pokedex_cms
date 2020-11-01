import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import * as dataConstant from 'constant/data';

import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from 'reactstrap';

import HTTPRequest from 'helper/httpRequest';
import ToastMessage from 'helper/toastMessage';


export const UpdatePokemonStatusModal = withRouter(
    connect(
        (state) => ({
            appAuthentication: state.appAuthentication.current
        }),
        (dispatch) => ({

        })
    )(
        class UpdatePokemonStatusModalComponent extends React.Component {
            constructor(props) {
                super(props)
                this.state = {
                    isOpen: false
                }
            };

            toggle = () => {
                this.setState({
                    isOpen: !this.state.isOpen
                })
            };


            onUpdateStatusButtonClicked = () => {
                HTTPRequest.put({
                    url: 'pokemon/update',
                    token: this.props.appAuthentication.token,
                    data: {
                        id: this.props.pokemon.id,
                        status: this.props.pokemon.status === dataConstant.STATUS_INACTIVE ? dataConstant.STATUS_ACTIVE : dataConstant.STATUS_INACTIVE
                    }
                }).then(response => {
                    if(response.data.code !== dataConstant.CODE_SUCCESS) {
                        ToastMessage.showError({
                            title: response.data.code,
                            message: response.data.error
                        })
                    }
                    ToastMessage.showSuccess({
                        title: response.data.code,
                        message: this.props.pokemon.status === dataConstant.STATUS_INACTIVE ? `${this.props.pokemon.name} is reactivated!` : `${this.props.pokemon.name} is deactivated!`
                    })
                    this.toggle();
                    this.props.getPokemons();
                }).catch(error => {
                    ToastMessage.showError({
                        title: "ERROR",
                        message: "Update pokemon status failed!"
                    })
                })
            };

            render() {
                return (
                    <div>
                        {
                            this.props.pokemon.status === dataConstant.STATUS_ACTIVE && (
                                <span>
                                    <a href="#" className="text-dark" onClick={this.toggle}>
                                        <i className="fas fa-lock mr-2 text-danger"></i>Deactivate
                                    </a>
                                    <Modal isOpen={this.state.isOpen} toggle={this.toggle} >
                                        <ModalHeader toggle={this.toggle}>
                                            Are you sure want to <code>deactivate </code> 
                                            <span className="text-primary text-capitalize">
                                            {this.props.pokemon.name}</span>?
                                        </ModalHeader>
                                        <ModalBody className="text-center">
                                            <img src={this.props.pokemon.image}></img>
                                            <div>
                                                <span className="text-primary text-capitalize">{this.props.pokemon.name}</span> will no longer appear on website, you can reactivate it anytime.
                                            </div>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="danger" onClick={this.onUpdateStatusButtonClicked}>Deactivate</Button>{' '}
                                            <Button color="secondary" onClick={this.toggle}>CANCEL</Button>
                                        </ModalFooter>
                                    </Modal>
                                </span>
                            )
                        }
                        {
                            this.props.pokemon.status === dataConstant.STATUS_INACTIVE && (
                                <span>
                                    <a href="#" className="text-dark" onClick={this.toggle}>
                                        <i className="fas fa-lock-open mr-2 text-success"></i>Reactivate
                                    </a>
                                    <Modal isOpen={this.state.isOpen} toggle={this.toggle} >
                                        <ModalHeader toggle={this.toggle}>
                                            Are you sure want to <code>reactivate </code> 
                                            <span className="text-primary text-capitalize">
                                            {this.props.pokemon.name}</span>?
                                        </ModalHeader>
                                        <ModalBody className="text-center">
                                            <img src={this.props.pokemon.image}></img>
                                            <div>
                                                <span className="text-primary text-capitalize">{this.props.pokemon.name}</span> will now appear on website.
                                            </div>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="success" onClick={this.onUpdateStatusButtonClicked}>Reactivate</Button>{' '}
                                            <Button color="secondary" onClick={this.toggle}>CANCEL</Button>
                                        </ModalFooter>
                                    </Modal>
                                </span>
                            )
                        }
                    </div>
                )
            };
        }
    )
);


