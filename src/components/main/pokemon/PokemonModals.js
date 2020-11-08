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

import Select from 'react-select';

import HTTPRequest from 'helper/httpRequest';
import ToastMessage from 'helper/toastMessage';

import PokemonAbilityComponent from './PokemonAbility';

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
                                    <a  className="text-dark" onClick={this.toggle}>
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
                                    <a  className="text-dark" onClick={this.toggle}>
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
                                    <a  className="text-dark" onClick={this.toggle}>
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
                                    <a  className="text-dark" onClick={this.toggle}>
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

export const UpdatePokemonTypeModal = withRouter(
    connect(
        (state) => ({
            appAuthentication: state.appAuthentication.current
        }),
        (dispatch) => ({

        })
    )(
        class UpdatePokemonTypeModalComponent extends React.Component {
            constructor(props) {
                super(props)
                this.state = {
                    typesData: null,
                    typesSelected: [],
                    isOpen: false
                }
            };

            toggle = () => {
                this.setState({
                    typesSelected: [],
                    isOpen: !this.state.isOpen
                })
            };

            getTypes = () => {
                HTTPRequest.get({
                    url: 'properties/type',
                    params: {}
                }).then(response => {
                    let typesData = response.data.data.map((type)=>{
                        return {
                            value: type.id,
                            label: type.name
                        }
                    })
                    this.setState({
                        typesData: typesData,
                    })
                }).catch(error => {
                })
            };

            onChange = (e) => {
                let typeIds = e.map(type => {
                    return type.value
                })
                this.setState({
                    typesSelected: typeIds
                })
            };

            onUpdateTypesButtonClicked = e => {
                e.preventDefault();
                let inputData = {
                    pokemon_id: this.props.pokemon.id
                };

                if(this.state.typesSelected.length) {
                    inputData.types = this.state.typesSelected
                };
                
                HTTPRequest.post({
                    url: 'pokemon-type/set',
                    token: this.props.appAuthentication.token,
                    data: inputData
                }).then(response => {
                    if(response.data.code !== dataConstant.CODE_SUCCESS) {
                        ToastMessage.showError({
                            title: response.data.code,
                            message: response.data.error
                        })
                    }
                    ToastMessage.showSuccess({
                        title: response.data.code,
                        message: `${this.props.pokemon.name}'s types changed!'`
                    })
                    this.toggle();
                    this.props.getPokemons();
                }).catch(error => {
                    ToastMessage.showError({
                        title: "ERROR",
                        message: "Update pokemon types failed!"
                    })
                })
            };

            componentDidMount(){
                this.getTypes();
            };

            render() {
                return (
                    <div>
                        <a  className="text-dark" onClick={this.toggle}>
                            <i className="fas fa-paw mr-2 text-secondary"></i>Change Types
                        </a>
                        <Modal isOpen={this.state.isOpen} toggle={this.toggle} >
                            <ModalHeader toggle={this.toggle}>
                                Are you sure want to <code>change types </code> of&nbsp; 
                                <span className="text-primary text-capitalize">
                                {this.props.pokemon.name}</span>?
                            </ModalHeader>
                            <ModalBody className="">
                                <div className="d-flex justify-content-around align-items-center">
                                    <img src={this.props.pokemon.image}></img>
                                    <div>
                                        <label>Current:</label>
                                        {
                                            this.props.pokemon.types && JSON.parse(this.props.pokemon.types).sort().map((type, index) => {
                                                return (
                                                <div key={index}>{this.props._renderPokemonProperty(type, index)}</div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                <Select isMulti options={this.state.typesData} onChange={this.onChange}/>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" onClick={this.onUpdateTypesButtonClicked}>CHANGE</Button>{' '}
                                <Button color="secondary" onClick={this.toggle}>CANCEL</Button>
                            </ModalFooter>
                        </Modal>
                    </div>
                )
            };
        }
    )
);

export const UpdatePokemonWeaknessModal = withRouter(
    connect(
        (state) => ({
            appAuthentication: state.appAuthentication.current
        }),
        (dispatch) => ({

        })
    )(
        class UpdatePokemonWeaknessModalComponent extends React.Component {
            constructor(props) {
                super(props)
                this.state = {
                    weaknessData: null,
                    weaknessSelected: [],
                    isOpen: false
                }
            };

            toggle = () => {
                this.setState({
                    weaknessSelected: [],
                    isOpen: !this.state.isOpen
                })
            };

            getWeakness = () => {
                HTTPRequest.get({
                    url: 'properties/weakness',
                    params: {}
                }).then(response => {
                    let weaknessData = response.data.data.map((weakness)=>{
                        return {
                            value: weakness.id,
                            label: weakness.name
                        }
                    });
                    this.setState({
                        weaknessData: weaknessData,
                    })
                }).catch(error => {
                })
            };

            onChange = (e) => {
                let weaknessIds = e.map(weakness => {
                    return weakness.value
                })
                this.setState({
                    weaknessSelected: weaknessIds
                })
            };

            onUpdateWeaknessButtonClicked = e => {
                e.preventDefault();
                let inputData = {
                    pokemon_id: this.props.pokemon.id
                };

                if(this.state.weaknessSelected.length) {
                    inputData.weakness = this.state.weaknessSelected
                };
                
                HTTPRequest.post({
                    url: 'pokemon-weakness/set',
                    token: this.props.appAuthentication.token,
                    data: inputData
                }).then(response => {
                    if(response.data.code !== dataConstant.CODE_SUCCESS) {
                        ToastMessage.showError({
                            title: response.data.code,
                            message: response.data.error
                        })
                    }
                    ToastMessage.showSuccess({
                        title: response.data.code,
                        message: `${this.props.pokemon.name}'s weakness changed!'`
                    })
                    this.toggle();
                    this.props.getPokemons();
                }).catch(error => {
                    ToastMessage.showError({
                        title: "ERROR",
                        message: "Update pokemon weakness failed!"
                    })
                })
            };

            componentDidMount(){
                this.getWeakness();
            };

            render() {
                return (
                    <div>
                        <a  className="text-dark" onClick={this.toggle}>
                            <i className="fas fa-ghost mr-2 text-secondary"></i>Change Weakness
                        </a>
                        <Modal isOpen={this.state.isOpen} toggle={this.toggle} >
                            <ModalHeader toggle={this.toggle}>
                                Are you sure want to <code>change weakness </code> of&nbsp;
                                <span className="text-primary text-capitalize">
                                {this.props.pokemon.name}</span>?
                            </ModalHeader>
                            <ModalBody className="">
                                <div className="d-flex justify-content-around align-items-center">
                                    <img src={this.props.pokemon.image}></img>
                                    <div>
                                        <label>Current:</label>
                                        {
                                            this.props.pokemon.weakness && JSON.parse(this.props.pokemon.weakness).sort().map((weakness, index) => {
                                                return (
                                                <div key={index}>{this.props._renderPokemonProperty(weakness, index)}</div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                <Select isMulti options={this.state.weaknessData} onChange={this.onChange}/>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" onClick={this.onUpdateWeaknessButtonClicked}>CHANGE</Button>{' '}
                                <Button color="secondary" onClick={this.toggle}>CANCEL</Button>
                            </ModalFooter>
                        </Modal>
                    </div>
                )
            };
        }
    )
);

export const UpdatePokemonAbilityModal = withRouter(
    connect(
        (state) => ({
            appAuthentication: state.appAuthentication.current
        }),
        (dispatch) => ({

        })
    )(
        class UpdatePokemonAbilityModalComponent extends React.Component {
            constructor(props) {
                super(props)
                this.state = {
                    abilityData: null,
                    abilitiesSelected: [],
                    isOpen: false
                }
            };

            toggle = () => {
                this.setState({
                    abilitiesSelected: [],
                    isOpen: !this.state.isOpen
                })
            };

            getAbilities = () => {
                HTTPRequest.get({
                    url: 'properties/ability',
                    params: {}
                }).then(response => {
                    let abilityData = response.data.data.map((type)=>{
                        return {
                            value: type.id,
                            label: type.name
                        }
                    })
                    this.setState({
                        abilityData: abilityData,
                    })
                }).catch(error => {
                })
            };

            onChange = (e) => {
                let abilityIds = e.map(ability => {
                    return ability.value
                })
                this.setState({
                    abilitiesSelected: abilityIds
                })
            };

            onUpdateAbilitiesButtonClicked = e => {
                e.preventDefault();
                let inputData = {
                    pokemon_id: this.props.pokemon.id
                };

                if(this.state.abilitiesSelected.length) {
                    inputData.abilities = this.state.abilitiesSelected
                };
                
                HTTPRequest.post({
                    url: 'pokemon-ability/set',
                    token: this.props.appAuthentication.token,
                    data: inputData
                }).then(response => {
                    if(response.data.code !== dataConstant.CODE_SUCCESS) {
                        ToastMessage.showError({
                            title: response.data.code,
                            message: response.data.error
                        })
                    }
                    ToastMessage.showSuccess({
                        title: response.data.code,
                        message: `${this.props.pokemon.name}'s abilities changed!'`
                    })
                    this.toggle();
                    this.props.getPokemons();
                }).catch(error => {
                    ToastMessage.showError({
                        title: "ERROR",
                        message: "Update pokemon abilities failed!"
                    })
                })
            };

            componentDidMount(){
                this.getAbilities();
            };

            render() {
                return (
                    <div>
                        <a  className="text-dark" onClick={this.toggle}>
                            <i className="fab fa-superpowers mr-2 text-secondary"></i>Change Abilities
                        </a>
                        <Modal isOpen={this.state.isOpen} toggle={this.toggle} >
                            <ModalHeader toggle={this.toggle}>
                                Are you sure want to <code>change abilities </code> of&nbsp; 
                                <span className="text-primary text-capitalize">
                                {this.props.pokemon.name}</span>?
                            </ModalHeader>
                            <ModalBody className="">
                                <div className="d-flex justify-content-around align-items-center">
                                    <img src={this.props.pokemon.image}></img>
                                    <div>
                                        <label>Current:</label>
                                        {
                                            this.props.pokemon.abilities && this.props.pokemon.abilities.map((ability, index) => 
                                                <PokemonAbilityComponent ability_id={ability} key={index}/>
                                            )
                                        }
                                    </div>
                                </div>
                                <Select isMulti options={this.state.abilityData} onChange={this.onChange}/>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" onClick={this.onUpdateAbilitiesButtonClicked}>CHANGE</Button>{' '}
                                <Button color="secondary" onClick={this.toggle}>CANCEL</Button>
                            </ModalFooter>
                        </Modal>
                    </div>
                )
            };
        }
    )
);
