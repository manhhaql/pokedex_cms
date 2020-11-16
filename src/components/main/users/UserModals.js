import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as dataConstant from 'constant/data';

import {
    Button,
    Label,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from 'reactstrap';

import HTTPRequest from 'helper/httpRequest';
import ToastMessage from 'helper/toastMessage';

export const UpdateUserStatusModal = withRouter(
    connect(
        (state) => ({
            appAuthentication: state.appAuthentication.current
        }),
        (dispatch) => ({

        })
    )(
        class UpdateUserStatusModalComponent extends React.Component {
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
                    url: 'users/update',
                    token: this.props.appAuthentication.token,
                    data: {
                        id: this.props.user.id,
                        status: this.props.user.status === dataConstant.STATUS_INACTIVE ? dataConstant.STATUS_ACTIVE : dataConstant.STATUS_INACTIVE
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
                        message: this.props.user.status === dataConstant.STATUS_INACTIVE ? `${this.props.user.username} is reactivated!` : `${this.props.user.username} is deactivated!`
                    })
                    this.toggle();
                    this.props.getUsers();
                }).catch(error => {
                    ToastMessage.showError({
                        title: "ERROR",
                        message: "Update user status failed!"
                    })
                })
            };

            render() {
                return (
                    <div>
                        {
                            this.props.user.status === dataConstant.STATUS_ACTIVE && (
                                <span>
                                    <Label className="text-dark" onClick={this.toggle}>
                                        <i className="fas fa-lock mr-2 text-danger"></i>Deactivate
                                    </Label>
                                    <Modal isOpen={this.state.isOpen} toggle={this.toggle} >
                                        <ModalHeader toggle={this.toggle}>
                                            Are you sure want to <code>deactivate </code> 
                                            <span className="text-primary text-capitalize">
                                            {this.props.user.name}</span>?
                                        </ModalHeader>
                                        <ModalBody className="text-center">
                                            <div>
                                                <span className="text-primary text-capitalize">{this.props.user.username}</span> will no longer active, you can reactivate them anytime.
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
                            this.props.user.status === dataConstant.STATUS_INACTIVE && (
                                <span>
                                    <Label className="text-dark" onClick={this.toggle}>
                                        <i className="fas fa-lock-open mr-2 text-success"></i>Reactivate
                                    </Label>
                                    <Modal isOpen={this.state.isOpen} toggle={this.toggle} >
                                        <ModalHeader toggle={this.toggle}>
                                            Are you sure want to <code>reactivate </code> 
                                            <span className="text-primary text-capitalize">
                                            {this.props.user.username}</span>?
                                        </ModalHeader>
                                        <ModalBody className="text-center">
                                            <div>
                                                <span className="text-primary text-capitalize">{this.props.user.username}</span> will now active.
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

export const UpdateUserTypeModal = withRouter(
    connect(
        (state) => ({
            appAuthentication: state.appAuthentication.current
        }),
        (dispatch) => ({

        })
    )(
        class UpdateUserTypeModalComponent extends React.Component {
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


            onUpdateTypeButtonClicked = () => {
                HTTPRequest.put({
                    url: 'users/update',
                    token: this.props.appAuthentication.token,
                    data: {
                        id: this.props.user.id,
                        type: this.props.user.type === dataConstant.USER_ADMIN ? dataConstant.USER_GUEST : dataConstant.USER_ADMIN
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
                        message: this.props.user.type === dataConstant.USER_ADMIN ? `${this.props.user.username} is now guest!` : `${this.props.user.username} is now admin!`
                    })
                    this.toggle();
                    this.props.getUsers();
                }).catch(error => {
                    ToastMessage.showError({
                        title: "ERROR",
                        message: "Update user type failed!"
                    })
                })
            };

            render() {
                return (
                    <div>
                        {
                            this.props.user.type === dataConstant.USER_ADMIN && (
                                <span>
                                    <Label  className="text-dark" onClick={this.toggle}>
                                        <i className="fas fa-user mr-2 text-secondary"></i>Set Type Guest
                                    </Label>
                                    <Modal isOpen={this.state.isOpen} toggle={this.toggle} >
                                        <ModalHeader toggle={this.toggle}>
                                            Are you sure want to <code>set as Guest </code> 
                                            <span className="text-primary text-capitalize">
                                            {this.props.user.name}</span>?
                                        </ModalHeader>
                                        <ModalBody className="text-center">
                                            <div>
                                                <span className="text-primary text-capitalize">{this.props.user.username}</span> will no longer admin.
                                            </div>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="danger" onClick={this.onUpdateTypeButtonClicked}>Set Guest</Button>{' '}
                                            <Button color="secondary" onClick={this.toggle}>CANCEL</Button>
                                        </ModalFooter>
                                    </Modal>
                                </span>
                            )
                        }
                        {
                            this.props.user.type === dataConstant.USER_GUEST && (
                                <span>
                                    <Label className="text-dark" onClick={this.toggle}>
                                        <i className="fas fa-user mr-2 text-secondary"></i>Set Type Admin
                                    </Label>
                                    <Modal isOpen={this.state.isOpen} toggle={this.toggle} >
                                        <ModalHeader toggle={this.toggle}>
                                            Are you sure want to <code>set Admin </code> 
                                            <span className="text-primary text-capitalize">
                                            {this.props.user.username}</span>?
                                        </ModalHeader>
                                        <ModalBody className="text-center">
                                            <div>
                                                <span className="text-primary text-capitalize">{this.props.user.username}</span> will now can have access of admin.
                                            </div>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="success" onClick={this.onUpdateTypeButtonClicked}>Set Admin</Button>{' '}
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