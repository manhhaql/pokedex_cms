import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import TooltipComponent from 'components/common/tooltip';

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
                    <>
                        {
                            this.props.pokemon.status === dataConstant.STATUS_ACTIVE && (
                                <>
                                    <span onClick={this.toggle} id={`PokemonStatusDeactivate_${this.props.pokemon.id}`}>
                                        <i className="fas fa-lock text-danger"></i>
                                    </span>
                                    <TooltipComponent
                                        placement="top"
                                        target={`PokemonStatusDeactivate_${this.props.pokemon.id}`}
                                        text="Deactivate"
                                    />
                                    <Modal isOpen={this.state.isOpen} toggle={this.toggle} >
                                        <ModalHeader toggle={this.toggle}>
                                            Are you sure want to <code>deactivate </code>
                                            <span className="text-primary text-capitalize">
                                                {this.props.pokemon.name}</span>?
                                        </ModalHeader>
                                        <ModalBody className="text-center">
                                            <img src={this.props.pokemon.image ? this.props.pokemon.image : dataConstant.NO_IMAGE_URL} alt=""></img>
                                            <div>
                                                <span className="text-primary text-capitalize">{this.props.pokemon.name}</span> will no longer appear on website, you can reactivate it anytime.
                                            </div>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="danger" onClick={this.onUpdateStatusButtonClicked}>Deactivate</Button>{' '}
                                            <Button color="secondary" onClick={this.toggle}>CANCEL</Button>
                                        </ModalFooter>
                                    </Modal>
                                </>
                            )
                        }
                        {
                            this.props.pokemon.status === dataConstant.STATUS_INACTIVE && (
                                <>
                                    <span onClick={this.toggle} id={`PokemonStatusReactivate_${this.props.pokemon.id}`}>
                                        <i className="fas fa-lock-open text-success"></i>Reactivate
                                    </span>
                                    <TooltipComponent
                                        placement="top"
                                        target={`PokemonStatusReactivate_${this.props.pokemon.id}`}
                                        text="Reactivate"
                                    />
                                    <Modal isOpen={this.state.isOpen} toggle={this.toggle} >
                                        <ModalHeader toggle={this.toggle}>
                                            Are you sure want to <code>reactivate </code>
                                            <span className="text-primary text-capitalize">
                                                {this.props.pokemon.name}</span>?
                                        </ModalHeader>
                                        <ModalBody className="text-center">
                                            <img src={this.props.pokemon.image ? this.props.pokemon.image : dataConstant.NO_IMAGE_URL} alt=""></img>
                                            <div>
                                                <span className="text-primary text-capitalize">{this.props.pokemon.name}</span> will now appear on website.
                                            </div>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="success" onClick={this.onUpdateStatusButtonClicked}>Reactivate</Button>{' '}
                                            <Button color="secondary" onClick={this.toggle}>CANCEL</Button>
                                        </ModalFooter>
                                    </Modal>
                                </>
                            )
                        }
                    </>
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
                    ToastMessage.showError({
                        title: "ERROR",
                        message: "Update pokemon image failed!"
                    })
                })
            };

            render() {
                return (
                    <>  
                        {
                            !this.props.pokemon.image && (
                                <>
                                    <span  onClick={this.toggle} id={`PokemonAddImage_${this.props.pokemon.id}`}>
                                        <i className="fas fa-image "></i>
                                    </span>
                                    <TooltipComponent 
                                        placement="top"
                                        target={`PokemonAddImage_${this.props.pokemon.id}`}
                                        text="Add Image"
                                    />
                                    <Modal isOpen={this.state.isOpen} toggle={this.toggle} >
                                        <ModalHeader toggle={this.toggle}>
                                            Are you sure want to <code>add image for </code>
                                            <span className="text-primary text-capitalize">
                                                {this.props.pokemon.name}</span>?
                                        </ModalHeader>
                                        <ModalBody className="text-center">
                                            {
                                                this.state.file && (
                                                    <img src={URL.createObjectURL(this.state.file)} alt="" style={{width: "50%"}}></img>
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
                                </>
                            )
                        }
                        {
                            !!this.props.pokemon.image && (
                                <>
                                    <span  onClick={this.toggle} id={`PokemonChangeImage_${this.props.pokemon.id}`}>
                                        <i className="fas fa-image"></i>
                                    </span>
                                    <TooltipComponent 
                                        placement="top"
                                        target={`PokemonChangeImage_${this.props.pokemon.id}`}
                                        text="Change Image"
                                    />
                                    <Modal isOpen={this.state.isOpen} toggle={this.toggle} >
                                        <ModalHeader toggle={this.toggle}>
                                            Are you sure want to <code>change image of </code>
                                            <span className="text-primary text-capitalize">
                                                {this.props.pokemon.name}</span>?
                                        </ModalHeader>
                                        <ModalBody>
                                            <div className="d-flex justify-content-center align-items-center">
                                                <img src={this.props.pokemon.image ? this.props.pokemon.image : dataConstant.NO_IMAGE_URL} alt=""></img>
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
                                </>
                            )
                        }
                    </>
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
                    <>
                        <span  onClick={this.toggle} id={`PokemonChangeTypes_${this.props.pokemon.id}`}>
                            <i className="fas fa-paw"></i>
                        </span>
                        <TooltipComponent
                            placement="top"
                            target={`PokemonChangeTypes_${this.props.pokemon.id}`}
                            text="Change Types"
                        />
                        <Modal isOpen={this.state.isOpen} toggle={this.toggle} >
                            <ModalHeader toggle={this.toggle}>
                                Are you sure want to <code>change types </code> of&nbsp;
                                <span className="text-primary text-capitalize">
                                    {this.props.pokemon.name}</span>?
                            </ModalHeader>
                            <ModalBody className="">
                                <div className="d-flex justify-content-around align-items-center">
                                    <img src={this.props.pokemon.image ? this.props.pokemon.image : dataConstant.NO_IMAGE_URL} style={{width:"50%"}} alt=""></img>
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
                                <Select className="text-capitalize mt-3" isMulti options={this.state.typesData} onChange={this.onChange} />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" disabled={!this.state.typesSelected.length} onClick={this.onUpdateTypesButtonClicked}>CHANGE</Button>{' '}
                                <Button color="secondary" onClick={this.toggle}>CANCEL</Button>
                            </ModalFooter>
                        </Modal>
                    </>
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
                    <>
                        <span  onClick={this.toggle} id={`PokemonChangeWeakness_${this.props.pokemon.id}`}>
                            <i className="fas fa-ghost"></i>
                        </span>
                        <TooltipComponent
                            placement="top"
                            target={`PokemonChangeWeakness_${this.props.pokemon.id}`}
                            text="Change Weakness"
                        />
                        <Modal isOpen={this.state.isOpen} toggle={this.toggle} >
                            <ModalHeader toggle={this.toggle}>
                                Are you sure want to <code>change weakness </code> of&nbsp;
                                <span className="text-primary text-capitalize">
                                    {this.props.pokemon.name}</span>?
                            </ModalHeader>
                            <ModalBody className="">
                                <div className="d-flex justify-content-around align-items-center">
                                    <img src={this.props.pokemon.image ? this.props.pokemon.image : dataConstant.NO_IMAGE_URL} style={{width:"50%"}} alt=""></img>
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
                                <Select className="text-capitalize mt-3" isMulti options={this.state.weaknessData} onChange={this.onChange} />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" disabled={!this.state.weaknessSelected.length} onClick={this.onUpdateWeaknessButtonClicked}>CHANGE</Button>{' '}
                                <Button color="secondary" onClick={this.toggle}>CANCEL</Button>
                            </ModalFooter>
                        </Modal>
                    </>
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
                    <>
                        <span  onClick={this.toggle} id={`PokemonChangeAbilities_${this.props.pokemon.id}`}>
                            <i className="fab fa-superpowers "></i>
                        </span>
                        <TooltipComponent
                            placement="top"
                            target={`PokemonChangeAbilities_${this.props.pokemon.id}`}
                            text="Change Abilities"
                        />
                        <Modal isOpen={this.state.isOpen} toggle={this.toggle} >
                            <ModalHeader toggle={this.toggle}>
                                Are you sure want to <code>change abilities </code> of&nbsp;
                                <span className="text-primary text-capitalize">
                                    {this.props.pokemon.name}</span>?
                            </ModalHeader>
                            <ModalBody className="">
                                <div className="d-flex justify-content-around align-items-center">
                                    <img src={this.props.pokemon.image ? this.props.pokemon.image : dataConstant.NO_IMAGE_URL} style={{width:"50%"}} alt=""></img>
                                    <div>
                                        <label>Current:</label>
                                        {
                                            this.props.pokemon.abilities && this.props.pokemon.abilities.map((ability, index) =>
                                                <PokemonAbilityComponent ability={ability} key={index} />
                                            )
                                        }
                                    </div>
                                </div>
                                <Select className="text-capitalize mt-3" isMulti options={this.state.abilityData} onChange={this.onChange} />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" disabled={!this.state.abilitiesSelected.length} onClick={this.onUpdateAbilitiesButtonClicked}>CHANGE</Button>{' '}
                                <Button color="secondary" onClick={this.toggle}>CANCEL</Button>
                            </ModalFooter>
                        </Modal>
                    </>
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
                    <>
                        <span  onClick={this.toggle} id={`PokemonChangeGenerals_${this.props.pokemon.id}`}>
                            <i className="fas fa-edit "></i>
                        </span>
                        <TooltipComponent
                            placement="top"
                            target={`PokemonChangeGenerals_${this.props.pokemon.id}`}
                            text="Change Generals"
                        />
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
                                    <div className="col-4 col-xs-12">
                                        <img src={this.props.pokemon.image ? this.props.pokemon.image : dataConstant.NO_IMAGE_URL} style={{ width: "100%" }} alt="pokemon"></img>
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
                    </>
                )
            };
        }
    )
);

export const AddNewPokemonModal = withRouter(
    connect(
        (state) => ({
            appAuthentication: state.appAuthentication.current
        }),
        (dispatch) => ({

        })
    )(
        class AddNewPokemonModalComponent extends React.Component {
            constructor(props) {
                super(props)
                this.state = {
                    pokemonList: null,
                    typeList: null,
                    weaknessList: null,
                    abilityList: null,
                    params: {
                        name: "",
                        stage: "",
                        of_basic: "",
                        height: "",
                        weight: "",
                        gender: "",
                        types: "",
                        weakness: "",
                        abilities: "",
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
                        name: "",
                        stage: "",
                        of_basic: "",
                        height: "",
                        weight: "",
                        gender: "",
                        types: "",
                        weakness: "",
                        abilities: "",
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

            getTypes = () => {
                HTTPRequest.get({
                    url: 'properties/type',
                    params: {}
                }).then(response => {
                    let typeList = response.data.data.map((type) => {
                        return {
                            value: type.id,
                            label: type.name
                        }
                    })
                    this.setState({
                        typeList: typeList,
                    })
                }).catch(error => {
                })
            };

            getWeakness = () => {
                HTTPRequest.get({
                    url: 'properties/weakness',
                    params: {}
                }).then(response => {
                    let weaknessList = response.data.data.map((type) => {
                        return {
                            value: type.id,
                            label: type.name
                        }
                    })
                    this.setState({
                        weaknessList: weaknessList,
                    })
                }).catch(error => {
                })
            };

            getAbilities = () => {
                HTTPRequest.get({
                    url: 'properties/ability',
                    params: {}
                }).then(response => {
                    let abilityList = response.data.data.map((type) => {
                        return {
                            value: type.id,
                            label: type.name
                        }
                    })
                    this.setState({
                        abilityList: abilityList,
                    })
                }).catch(error => {
                })
            };

            onMultipleSelected = (field, e) => {
                let values = e.map(value => {
                    return value.value
                })
                this.setState({
                    params: Object.assign({}, this.state.params, {
                        [field]: values
                    })
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

            onAddNewPokemonButtonClicked = e => {
                e.preventDefault();
                let values = {

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
                if (this.state.params.types) {
                    values.types = this.state.params.types
                };
                if (this.state.params.weakness) {
                    values.weakness = this.state.params.weakness
                };
                if (this.state.params.abilities) {
                    values.abilities = this.state.params.abilities
                };

                console.log(values)
                HTTPRequest.post({
                    url: 'pokemon/create',
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
                        message: `${this.state.params.name} added!'`
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
                            message: "Add new Pokemon failed!"
                        })
                    }
                })
            };

            componentDidMount() {
                this._isMounted = true;
                this.getPokemons();
                this.getTypes();
                this.getWeakness();
                this.getAbilities();
            };

            componentWillUnmount() {
                this._isMounted = false;
            };

            render() {
                let genderOptions = this.genderOptions;
                let stageOptions = this.stageOptions;
                let ofBasicOptions = this.state.pokemonList;
                return (
                    <>
                        <Button color="success" className="Content-header__btn" onClick={this.toggle}>
                            <i className="far fa-plus-square"></i>
                            <span className="Content-header__btn--text">&nbsp;Add new Pokemon</span>
                        </Button>
                        <Modal isOpen={this.state.isOpen} toggle={this.toggle} size="md">
                            <ModalHeader toggle={this.toggle}>
                                Add New Pokemon?
                            </ModalHeader>
                            <ModalBody className="m-2">
                                <div className="row">
                                    <div className="col-6">
                                        <Label for="pokemonName">Name:</Label>
                                        <Input 
                                            className="text-capitalize"
                                            type="text" name="name" id="pokemonName"
                                            value={this.state.params.name}
                                            onChange={(event) => this.onInputsChanged('name', event.target.value)}
                                        />
                                    </div>
                                    <div className="col-6">
                                        <Label for="pokemonGender">Gender:</Label>
                                        <Select 
                                            className="text-capitalize"
                                            options={genderOptions}
                                            onChange={(event) => this.onInputsChanged('gender', event.value)}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <Label for="pokemonHeight">Height (Inches):</Label>
                                        <Input 
                                            type="text" name="height" id="pokemonHeight"
                                            value={this.state.params.height}
                                            onChange={(event) => this.onInputsChanged('height', event.target.value)}
                                        />
                                    </div>
                                    <div className="col-6">
                                        <Label for="pokemonWeight">Weight (Lbs):</Label>
                                        <Input 
                                            type="text" name="weight" id="pokemonWeight"
                                            value={this.state.params.weight}
                                            onChange={(event) => this.onInputsChanged('weight', event.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <Label for="pokemonStage">Stage:</Label>
                                        <Select
                                            className="text-capitalize"
                                            options={stageOptions}
                                            onChange={(event) => this.onInputsChanged('stage', event.value)}
                                        />
                                    </div>
                                    <div className="col-6">
                                        <Label for="pokemonBasic">Of Basic:</Label>
                                        <Select
                                            className="text-capitalize"
                                            options={ofBasicOptions}
                                            onChange={(event) => this.onInputsChanged('of_basic', event.value)}
                                            isDisabled={!this.state.params.stage || this.state.params.stage === dataConstant.STAGE_BASIC}
                                        />
                                        <FormText text="muted">
                                            (*)
                                        </FormText>
                                    </div>
                                </div>
                                <FormGroup>
                                    <Label for="">Types:</Label>
                                    <Select 
                                        className="text-capitalize"
                                        isMulti 
                                        options={this.state.typeList} 
                                        name="types" 
                                        onChange={(e)=>this.onMultipleSelected("types", e)} 
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="">Weakness:</Label>
                                    <Select 
                                        className="text-capitalize"
                                        isMulti 
                                        options={this.state.weaknessList} 
                                        name="weakness" 
                                        onChange={(e)=>this.onMultipleSelected("weakness", e)} 
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="">Abilities:</Label>
                                    <Select 
                                        className="text-capitalize"
                                        isMulti 
                                        options={this.state.abilityList} 
                                        name="abilities" 
                                        onChange={(e)=>this.onMultipleSelected("abilities", e)} 
                                    />
                                </FormGroup>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="success" onClick={this.onAddNewPokemonButtonClicked} disabled={!this.state.isChanged}>Add New Pokemon</Button>{' '}
                                <Button color="secondary" onClick={this.toggle}>CANCEL</Button>
                            </ModalFooter>
                        </Modal>
                    </>
                )
            };
        }
    )
);
