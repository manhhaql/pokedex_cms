import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import * as dataConstant from 'constant/data';

import {
    Button,
    Input,
    Label,
    Col,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    FormGroup,
    FormText
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

export const PokemonImageModal = withRouter(
    connect(
        (state) => ({
            appAuthentication: state.appAuthentication.current
        }),
        (dispatch) => ({

        })
    )(
        class PokemonImageModalComponent extends React.Component {
            constructor(props) {
                super(props)
                this.state = {
                    isOpen: false,
                    file: null
                }
            };

            toggle = () => {
                this.setState({
                    file: null,
                    isOpen: !this.state.isOpen
                })
            };

            onChange = e => {
                this.setState({
                    file: e.target.files[0]
                })
            };

            onAddImageButtonClicked = e => {
                e.preventDefault();
                if(!this.state.file) {
                    ToastMessage.showError({
                        title: "",
                        message: `You are not choose a file yet.`
                    })
                    return;
                }
                HTTPRequest.upload({
                    url: 'pokemon-image/upload',
                    token: this.props.appAuthentication.token,
                    data: {
                        pokemon_id: this.props.pokemon.id
                    },
                    files: {
                        file: this.state.file
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
                        message: `Image of ${this.props.pokemon.name} uploaded!`
                    })
                    this.toggle();
                    this.props.getPokemons();
                }).catch(error => {
                    console.log(error)
                    ToastMessage.showError({
                        title: "ERROR",
                        message: "Upload pokemon image failed!"
                    })
                })
            };

            onUpdateImageButtonClicked = e => {
                e.preventDefault();
                if(!this.state.file) {
                    ToastMessage.showError({
                        title: "",
                        message: `You are not choose a file yet.`
                    })
                    return;
                }
                HTTPRequest.upload({
                    url: 'pokemon-image/update',
                    token: this.props.appAuthentication.token,
                    data: {
                        pokemon_id: this.props.pokemon.id
                    },
                    files: {
                        file: this.state.file
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
                        message: `Image of ${this.props.pokemon.name} added!`
                    })
                    this.toggle();
                    this.props.getPokemons();
                }).catch(error => {
                    console.log(error)
                    ToastMessage.showError({
                        title: "ERROR",
                        message: "Update pokemon image failed!"
                    })
                })
            };

            render() {
                return (
                    <div>
                        {
                            !!this.props.pokemon.image && (
                                <span>
                                    <a href="#" className="text-dark" onClick={this.toggle}>
                                        <i className="fas fa-image mr-2 text-secondary"></i>Change image
                                    </a>
                                    <Modal isOpen={this.state.isOpen} toggle={this.toggle} >
                                        <ModalHeader toggle={this.toggle}>
                                            Are you sure want to <code>change image of </code> 
                                            <span className="text-primary text-capitalize">
                                            {this.props.pokemon.name}</span>?
                                        </ModalHeader>
                                        <ModalBody>
                                            <div className="d-flex justify-content-center align-items-center">
                                                <img src={this.props.pokemon.image}></img>
                                                <i className="fas fa-arrow-right text-danger fa-2x"></i>
                                                {
                                                    this.state.file && (
                                                        <img src={URL.createObjectURL(this.state.file)}/>
                                                    )
                                                }
                                                {
                                                    !this.state.file && (
                                                        <span className=" mx-auto text-muted">New image</span>
                                                    )
                                                }
                                            </div>
                                            
                                            <FormGroup row>
                                                <Label for="updateImage" sm={2}>File</Label>
                                                    <Col sm={10}>
                                                        <Input type="file" name="file" id="updateImage" onChange={this.onChange} />
                                                        <FormText color="muted">
                                                            Please select an image file here.
                                                        </FormText>
                                                    </Col>
                                            </FormGroup>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="danger" onClick={this.onUpdateImageButtonClicked}>CHANGE</Button>{' '}
                                            <Button color="secondary" onClick={this.toggle}>CANCEL</Button>
                                        </ModalFooter>
                                    </Modal>
                                </span>
                            )
                        }
                        {
                            !this.props.pokemon.image && (
                                <span>
                                    <a href="#" className="text-dark" onClick={this.toggle}>
                                        <i className="fas fa-image mr-2 text-secondary"></i>Add image
                                    </a>
                                    <Modal isOpen={this.state.isOpen} toggle={this.toggle} >
                                        <ModalHeader toggle={this.toggle}>
                                            Are you sure want to <code>add image for </code> 
                                            <span className="text-primary text-capitalize">
                                            {this.props.pokemon.name}</span>?
                                        </ModalHeader>
                                        <ModalBody className="text-center">
                                            {
                                                this.state.file && (
                                                    <img src={URL.createObjectURL(this.state.file)}></img>
                                                )
                                            }
                                            <FormGroup row>
                                                <Label for="uploadImage" sm={2}>File</Label>
                                                    <Col sm={10}>
                                                        <Input type="file" name="file" id="uploadImage" onChange={this.onChange} />
                                                        <FormText color="muted">
                                                            Please select an image file here.
                                                        </FormText>
                                                    </Col>
                                            </FormGroup>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="danger" onClick={this.onAddImageButtonClicked}>ADD</Button>{' '}
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


