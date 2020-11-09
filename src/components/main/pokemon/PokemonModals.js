import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

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
                    if (response.data.code !== dataConstant.CODE_SUCCESS) {
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
                                    <Label className="text-dark" onClick={this.toggle}>
                                        <i className="fas fa-lock mr-2 text-danger"></i>Deactivate
                                    </Label>
                                    <Modal isOpen={this.state.isOpen} toggle={this.toggle} >
                                        <ModalHeader toggle={this.toggle}>
                                            Are you sure want to <code>deactivate </code>
                                            <span className="text-primary text-capitalize">
                                                {this.props.pokemon.name}</span>?
                                        </ModalHeader>
                                        <ModalBody className="text-center">
                                            <img src={this.props.pokemon.image} alt=""></img>
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
                                    <Label className="text-dark" onClick={this.toggle}>
                                        <i className="fas fa-lock-open mr-2 text-success"></i>Reactivate
                                    </Label>
                                    <Modal isOpen={this.state.isOpen} toggle={this.toggle} >
                                        <ModalHeader toggle={this.toggle}>
                                            Are you sure want to <code>reactivate </code>
                                            <span className="text-primary text-capitalize">
                                                {this.props.pokemon.name}</span>?
                                        </ModalHeader>
                                        <ModalBody className="text-center">
                                            <img src={this.props.pokemon.image} alt=""></img>
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
                if (!this.state.file) {
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
                    if (response.data.code !== dataConstant.CODE_SUCCESS) {
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
                if (!this.state.file) {
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
                    if (response.data.code !== dataConstant.CODE_SUCCESS) {
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
                                    <Label className="text-dark" onClick={this.toggle}>
                                        <i className="fas fa-image mr-2 text-secondary"></i>Change image
                                    </Label>
                                    <Modal isOpen={this.state.isOpen} toggle={this.toggle} >
                                        <ModalHeader toggle={this.toggle}>
                                            Are you sure want to <code>change image of </code>
                                            <span className="text-primary text-capitalize">
                                                {this.props.pokemon.name}</span>?
                                        </ModalHeader>
                                        <ModalBody>
                                            <div className="d-flex justify-content-center align-items-center">
                                                <img src={this.props.pokemon.image} alt=""></img>
                                                <i className="fas fa-arrow-right text-danger fa-2x"></i>
                                                {
                                                    this.state.file && (
                                                        <img src={URL.createObjectURL(this.state.file)} alt=""/>
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
                                    <Label className="text-dark" onClick={this.toggle}>
                                        <i className="fas fa-image mr-2 text-secondary"></i>Add image
                                    </Label>
                                    <Modal isOpen={this.state.isOpen} toggle={this.toggle} >
                                        <ModalHeader toggle={this.toggle}>
                                            Are you sure want to <code>add image for </code>
                                            <span className="text-primary text-capitalize">
                                                {this.props.pokemon.name}</span>?
                                        </ModalHeader>
                                        <ModalBody className="text-center">
                                            {
                                                this.state.file && (
                                                    <img src={URL.createObjectURL(this.state.file)} alt=""></img>
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
                    let typesData = response.data.data.map((type) => {
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

                if (this.state.typesSelected.length) {
                    inputData.types = this.state.typesSelected
                };

                HTTPRequest.post({
                    url: 'pokemon-type/set',
                    token: this.props.appAuthentication.token,
                    data: inputData
                }).then(response => {
                    if (response.data.code !== dataConstant.CODE_SUCCESS) {
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

            componentDidMount() {
                this.getTypes();
            };

            render() {
                return (
                    <div>
                        <Label className="text-dark" onClick={this.toggle}>
                            <i className="fas fa-paw mr-2 text-secondary"></i>Change Types
                        </Label>
                        <Modal isOpen={this.state.isOpen} toggle={this.toggle} >
                            <ModalHeader toggle={this.toggle}>
                                Are you sure want to <code>change types </code> of&nbsp;
                                <span className="text-primary text-capitalize">
                                    {this.props.pokemon.name}</span>?
                            </ModalHeader>
                            <ModalBody className="">
                                <div className="d-flex justify-content-around align-items-center">
                                    <img src={this.props.pokemon.image} alt=""></img>
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
                                <Select isMulti options={this.state.typesData} onChange={this.onChange} />
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
                    let weaknessData = response.data.data.map((weakness) => {
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

                if (this.state.weaknessSelected.length) {
                    inputData.weakness = this.state.weaknessSelected
                };

                HTTPRequest.post({
                    url: 'pokemon-weakness/set',
                    token: this.props.appAuthentication.token,
                    data: inputData
                }).then(response => {
                    if (response.data.code !== dataConstant.CODE_SUCCESS) {
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

            componentDidMount() {
                this.getWeakness();
            };

            render() {
                return (
                    <div>
                        <Label className="text-dark" onClick={this.toggle}>
                            <i className="fas fa-ghost mr-2 text-secondary"></i>Change Weakness
                        </Label>
                        <Modal isOpen={this.state.isOpen} toggle={this.toggle} >
                            <ModalHeader toggle={this.toggle}>
                                Are you sure want to <code>change weakness </code> of&nbsp;
                                <span className="text-primary text-capitalize">
                                    {this.props.pokemon.name}</span>?
                            </ModalHeader>
                            <ModalBody className="">
                                <div className="d-flex justify-content-around align-items-center">
                                    <img src={this.props.pokemon.image} alt=""></img>
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
                                <Select isMulti options={this.state.weaknessData} onChange={this.onChange} />
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
                    let abilityData = response.data.data.map((type) => {
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

                if (this.state.abilitiesSelected.length) {
                    inputData.abilities = this.state.abilitiesSelected
                };

                HTTPRequest.post({
                    url: 'pokemon-ability/set',
                    token: this.props.appAuthentication.token,
                    data: inputData
                }).then(response => {
                    if (response.data.code !== dataConstant.CODE_SUCCESS) {
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

            componentDidMount() {
                this.getAbilities();
            };

            render() {
                return (
                    <div>
                        <Label className="text-dark" onClick={this.toggle}>
                            <i className="fab fa-superpowers mr-2 text-secondary"></i>Change Abilities
                        </Label>
                        <Modal isOpen={this.state.isOpen} toggle={this.toggle} >
                            <ModalHeader toggle={this.toggle}>
                                Are you sure want to <code>change abilities </code> of&nbsp;
                                <span className="text-primary text-capitalize">
                                    {this.props.pokemon.name}</span>?
                            </ModalHeader>
                            <ModalBody className="">
                                <div className="d-flex justify-content-around align-items-center">
                                    <img src={this.props.pokemon.image} alt=""></img>
                                    <div>
                                        <label>Current:</label>
                                        {
                                            this.props.pokemon.abilities && this.props.pokemon.abilities.map((ability, index) =>
                                                <PokemonAbilityComponent ability_id={ability} key={index} />
                                            )
                                        }
                                    </div>
                                </div>
                                <Select isMulti options={this.state.abilityData} onChange={this.onChange} />
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

export const UpdatePokemonGeneralModal = withRouter(
    connect(
        (state) => ({
            appAuthentication: state.appAuthentication.current
        }),
        (dispatch) => ({

        })
    )(
        class UpdatePokemonGeneralModalComponent extends React.Component {
            constructor(props) {
                super(props)
                this.state = {
                    pokemonList: null,
                    params: {
                        name: this.props.pokemon.name,
                        stage: this.props.pokemon.stage,
                        of_basic: this.props.pokemon.of_basic && this.props.pokemon.of_basic.id,
                        height: this.props.pokemon.height,
                        weight: this.props.pokemon.weight,
                        gender: this.props.pokemon.gender
                    },
                    isOpen: false,
                    isChanged: false
                };
                this.genderOptions = [
                    { label: "Male", value: dataConstant.GENDER_MALE },
                    { label: "Female", value: dataConstant.GENDER_FEMALE },
                    { label: "Both", value: dataConstant.GENDER_BOTH },
                ];
                this.stageOptions = [
                    { label: "Basic", value: dataConstant.STAGE_BASIC },
                    { label: "Stage One", value: dataConstant.STAGE_ONE },
                    { label: "Stage Two", value: dataConstant.STAGE_TWO },
                    { label: "Mega", value: dataConstant.STAGE_MEGA },
                ];
                this._isMounted = false;
            };

            toggle = () => {
                this.setState({
                    params: Object.assign({}, this.state.params, {
                        name: this.props.pokemon.name,
                        stage: this.props.pokemon.stage,
                        of_basic: this.props.pokemon.of_basic && this.props.pokemon.of_basic.id,
                        height: this.props.pokemon.height,
                        weight: this.props.pokemon.weight,
                        gender: this.props.pokemon.gender
                    }),
                    isChanged: false,
                    isOpen: !this.state.isOpen
                })
            };

            getPokemons() {
                HTTPRequest.get({
                    url: 'pokemon/list',
                    params: {}
                }).then(response => {
                    if (this._isMounted) {
                        let pokemonList = response.data.data.map((pokemon) => {
                            return {
                                value: pokemon.id,
                                label: pokemon.name
                            }
                        });
                        this.setState({
                            pokemonList: pokemonList,
                        })
                    }
                }).catch(error => {
                    if (error.response) {
                        ToastMessage.showError({
                            title: error.response.data.code,
                            message: error.response.data.error
                        })
                    } else {
                        ToastMessage.showError({
                            title: "ERROR",
                            message: "Failed to get pokemon list"
                        })
                    }
                })
            };

            onInputsChanged(field, value) {
                this.setState({
                    isChanged: true,
                    params: Object.assign({}, this.state.params, {
                        [field]: value
                    })
                })
            };

            onStageChanged(value) {
                if(value === dataConstant.STAGE_BASIC) {
                    this.setState({
                        isChanged: true,
                        params: Object.assign({}, this.state.params, {
                            stage: value,
                            of_basic: this.props.pokemon.id
                        })
                    })
                } else {
                    this.setState({
                        isChanged: true,
                        params: Object.assign({}, this.state.params, {
                            stage: value,
                            of_basic: this.props.pokemon.of_basic && this.props.pokemon.of_basic.id
                        })
                    })
                };
            };

            onUpdateGeneralButtonClicked = e => {
                e.preventDefault();
                let values = {
                    id: this.props.pokemon.id
                };

                if (this.state.params.name) {
                    values.name = this.state.params.name
                };
                if (this.state.params.height) {
                    values.height = this.state.params.height
                };
                if (this.state.params.weight) {
                    values.weight = this.state.params.weight
                };
                if (this.state.params.gender) {
                    values.gender = this.state.params.gender
                };
                if (this.state.params.stage !== null) {
                    values.stage = this.state.params.stage
                };
                if (this.state.params.of_basic) {
                    values.of_basic = this.state.params.of_basic
                };

                HTTPRequest.put({
                    url: 'pokemon/update',
                    token: this.props.appAuthentication.token,
                    data: values
                }).then(response => {
                    if (response.data.code !== dataConstant.CODE_SUCCESS) {
                        ToastMessage.showError({
                            title: response.data.code,
                            message: response.data.error
                        })
                    }
                    ToastMessage.showSuccess({
                        title: response.data.code,
                        message: `${this.props.pokemon.name}'s general changed!'`
                    })
                    this.toggle();
                    this.props.getPokemons();
                }).catch(error => {
                    if (error.response) {
                        ToastMessage.showError({
                            title: error.response.data.code,
                            message: error.response.data.error
                        })
                    } else {
                        ToastMessage.showError({
                            title: "ERROR",
                            message: "Update pokemon general failed!"
                        })
                    }
                })
            };

            componentDidMount() {
                this._isMounted = true;
                this.getPokemons()
            };

            componentWillUnmount() {
                this._isMounted = false;
            };

            render() {
                let params = this.state.params;
                let genderOptions = this.genderOptions;
                let stageOptions = this.stageOptions;
                let ofBasicOptions = this.state.pokemonList;

                let genderLabel = genderOptions && genderOptions.filter(a => a.value === params.gender)
                    .map(a => a.label);
                let stageLabel = stageOptions && stageOptions.filter(a => a.value === params.stage)
                    .map(a => a.label);
                let ofBasicLabel = ofBasicOptions && ofBasicOptions.filter(a => a.value === params.of_basic)
                    .map(a => a.label);
                return (
                    <div>
                        <Label className="text-dark" onClick={this.toggle}>
                            <i className="fas fa-edit mr-2 text-secondary"></i>Edit Generals
                        </Label>
                        <Modal isOpen={this.state.isOpen} toggle={this.toggle} >
                            <ModalHeader toggle={this.toggle}>
                                Edit general info of&nbsp;
                                <span className="text-primary text-capitalize">
                                    {this.props.pokemon.name}</span>?
                            </ModalHeader>
                            <ModalBody className="m-2">
                                <div className="row">
                                    <div className="col-8">
                                        <FormGroup row>
                                            <Label for="pokemonName" sm={3}>Name:</Label>
                                            <Col sm={9}>
                                                <Input 
                                                    className="text-capitalize"
                                                    type="text" name="name" id="pokemonName"
                                                    value={this.state.params.name}
                                                    onChange={(event) => this.onInputsChanged('name', event.target.value)}
                                                />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="pokemonHeight" sm={3}>Height:</Label>
                                            <Col sm={9}>
                                                <Input 
                                                    type="text" name="height" id="pokemonHeight"
                                                    value={this.state.params.height}
                                                    onChange={(event) => this.onInputsChanged('height', event.target.value)}
                                                />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="pokemonWeight" sm={3}>Weight:</Label>
                                            <Col sm={9}>
                                                <Input 
                                                    type="text" name="weight" id="pokemonWeight"
                                                    value={this.state.params.weight}
                                                    onChange={(event) => this.onInputsChanged('weight', event.target.value)}
                                                />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="pokemonGender" sm={3}>Gender:</Label>
                                            <Col sm={9}>
                                                <Select 
                                                    className="text-capitalize"
                                                    options={this.genderOptions}
                                                    value={{ label: genderLabel ? genderLabel : <div className="text-secondary">Select...</div> }}
                                                    onChange={(event) => this.onInputsChanged('gender', event.value)}
                                                />
                                            </Col>
                                        </FormGroup>
                                    </div>
                                    <div className="col-4">
                                        <img src={this.props.pokemon.image} style={{ width: "100%" }} alt="pokemon"></img>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <Label for="pokemonStage">Stage:</Label>
                                        <Select
                                            className="text-capitalize"
                                            options={this.stageOptions}
                                            value={{ label: stageLabel ? stageLabel : <div className="text-secondary">Select...</div> }}
                                            onChange={(event) => this.onStageChanged(event.value)}
                                        />
                                    </div>
                                    <div className="col-6">
                                        <Label for="pokemonBasic">Of Basic:</Label>
                                        <Select
                                            className="text-capitalize"
                                            options={ofBasicOptions}
                                            value={{ label: ofBasicLabel ? ofBasicLabel : <div className="text-secondary">Select...</div> }}
                                            onChange={(event) => this.onInputsChanged('of_basic', event.value)}
                                            isDisabled={this.state.params.stage === dataConstant.STAGE_BASIC}
                                        />
                                        <FormText text="muted">
                                            (*)
                                        </FormText>
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" onClick={this.onUpdateGeneralButtonClicked} disabled={!this.state.isChanged}>CHANGE</Button>{' '}
                                <Button color="secondary" onClick={this.toggle}>CANCEL</Button>
                            </ModalFooter>
                        </Modal>
                    </div>
                )
            };
        }
    )
);
