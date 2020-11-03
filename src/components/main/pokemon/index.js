import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { 
    Badge,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

import HTTPRequest from 'helper/httpRequest';

import * as routeNameConstant from 'constant/routeName';
import * as dataConstant from 'constant/data';

import TableCommonComponent from 'components/common/table';
import PaginationComponent from 'components/common/pagination';

import PokemonAbilityComponent from './PokemonAbility';

import {
    UpdatePokemonStatusModal,
    PokemonImageModal
} from './PokemonModals';

import "./Pokemon.css";

class PokemonComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pokemonData: null,
            total: null,
            params: {
                id: null,
                name: '',
                type_id: null,
                weakness_id: null,
                ability_id: null,
                page: 1,
                limit: 5,
                
            },
            filterData: {
                types: null,
                weakness: null,
                abilities: null,
            }
        };
        this._isMounted = false;
    };

    getPokemons() {
        const params = {}
        if(this.state.params.id) {
            params.id = this.state.params.id
        }
        if(this.state.params.name) {
            params.name = this.state.params.name
        }
        if(this.state.params.type_id) {
            params.type_id = this.state.params.type_id
        }
        if(this.state.params.weakness_id) {
            params.weakness_id = this.state.params.weakness_id
        }
        if(this.state.params.ability_id) {
            params.ability_id = this.state.params.ability_id
        }
        HTTPRequest.get({
            url: 'pokemon/list',
            params: {
                page: this.state.params.page,
                limit: this.state.params.limit,
                id: params.id,
                name: params.name,
                type_id: params.type_id,
                weakness_id: params.weakness_id,
                ability_id: params.ability_id,
            }
        }).then(response => {
            // console.log(70, response.data.data)
            if(this._isMounted) {
                this.setState({
                    pokemonData: response.data.data,
                    total: response.data.total
                })
            }
            
        }).catch(error => {
            console.log(error)
        })
    };

    getTypes() {
        HTTPRequest.get({
            url: 'properties/type',
            params: {}
        }).then(response => {
            if(this._isMounted) {
                this.setState({
                    filterData: Object.assign({}, this.state.filterData, {
                        types: response.data.data
                    }),
                })
            }
        }).catch(error => {
            console.log(error)
        })
    };
    getWeakness() {
        HTTPRequest.get({
            url: 'properties/weakness',
            params: {}
        }).then(response => {
            if(this._isMounted) {
                this.setState({
                    filterData: Object.assign({}, this.state.filterData, {
                        weakness: response.data.data
                    }),
                })
            }
        }).catch(error => {
            console.log(error)
        })
    };
    getAbilities() {
        HTTPRequest.get({
            url: 'properties/ability',
            params: {}
        }).then(response => {
            if(this._isMounted) {
                this.setState({
                    filterData: Object.assign({}, this.state.filterData, {
                        abilities: response.data.data
                    }),
                })
            }
        }).catch(error => {
            console.log(error)
        })
    };

    onChangePage(page) {
        this.setState({
            params: Object.assign({}, this.state.params, {
                page: page
            })
        }, () => {
            this.getPokemons();
        });
    };
    onChangeLimit(limit) {
        this.setState({
            params: Object.assign({}, this.state.params, {
                limit: limit
            })
        }, () => {
            this.getPokemons();
        });
    };

    onChangeFilterByType(type_id) {
        this.setState({
            params: Object.assign({}, this.state.params, {
                type_id: type_id
            })
        },() => {
            this.getPokemons();
        }, () => {
        });
    };
    onChangeFilterByWeakness(weakness_id) {
        this.setState({
            params: Object.assign({}, this.state.params, {
                weakness_id: weakness_id
            })
        }, () => {
            this.getPokemons();
        });
    };
    onChangeFilterByAbility(ability_id) {
        this.setState({
            params: Object.assign({}, this.state.params, {
                ability_id: ability_id
            })
        }, () => {
            this.getPokemons();
        });
    };

    onPokemonDetailClicked(e, pokemon_id) {
        e.preventDefault();
        this.props.history.push(`/${routeNameConstant.ROUTE_NAME_MAIN}/${routeNameConstant.ROUTE_NAME_POKEMON}/${pokemon_id}`);
    };

    _renderPokemonProperty(pokemon, index) {
        return (
            <Badge key={index} className=
                {`font-weight-bold text-nowrap text-capitalize mr-1 p-1  
                    Pokemon-${
                        pokemon ===  dataConstant.POKEMON_NORMAL ? 'normal' :
                        pokemon ===  dataConstant.POKEMON_FIRE ? 'fire' :
                        pokemon ===  dataConstant.POKEMON_WATER ? 'water' :
                        pokemon ===  dataConstant.POKEMON_GRASS ? 'grass' :
                        pokemon ===  dataConstant.POKEMON_ELECTRIC ? 'electric' :
                        pokemon ===  dataConstant.POKEMON_ICE ? 'ice' :
                        pokemon ===  dataConstant.POKEMON_FIGHTING ? 'fighting' :
                        pokemon ===  dataConstant.POKEMON_POISON ? 'poison' :
                        pokemon ===  dataConstant.POKEMON_FLYING ? 'flying' :
                        pokemon ===  dataConstant.POKEMON_PSYCHIC ? 'psychic' :
                        pokemon ===  dataConstant.POKEMON_BUG ? 'bug' :
                        pokemon ===  dataConstant.POKEMON_ROCK ? 'rock' :
                        pokemon ===  dataConstant.POKEMON_GHOST ? 'ghost' :
                        pokemon ===  dataConstant.POKEMON_DARK ? 'dark' :
                        pokemon ===  dataConstant.POKEMON_DRAGON ? 'dragon' :
                        pokemon ===  dataConstant.POKEMON_STEEL ? 'steel' :
                        pokemon ===  dataConstant.POKEMON_FAIRY ? 'fairy' :
                        ''
                    }
                `}
            >
                {
                    pokemon ===  dataConstant.POKEMON_NORMAL ? 'normal' :
                    pokemon ===  dataConstant.POKEMON_FIRE ? 'fire' :
                    pokemon ===  dataConstant.POKEMON_WATER ? 'water' :
                    pokemon ===  dataConstant.POKEMON_GRASS ? 'grass' :
                    pokemon ===  dataConstant.POKEMON_ELECTRIC ? 'electric' :
                    pokemon ===  dataConstant.POKEMON_ICE ? 'ice' :
                    pokemon ===  dataConstant.POKEMON_FIGHTING ? 'fighting' :
                    pokemon ===  dataConstant.POKEMON_POISON ? 'poison' :
                    pokemon ===  dataConstant.POKEMON_FLYING ? 'flying' :
                    pokemon ===  dataConstant.POKEMON_PSYCHIC ? 'psychic' :
                    pokemon ===  dataConstant.POKEMON_BUG ? 'bug' :
                    pokemon ===  dataConstant.POKEMON_ROCK ? 'rock' :
                    pokemon ===  dataConstant.POKEMON_GHOST ? 'ghost' :
                    pokemon ===  dataConstant.POKEMON_DARK ? 'dark' :
                    pokemon ===  dataConstant.POKEMON_DRAGON ? 'dragon' :
                    pokemon ===  dataConstant.POKEMON_STEEL ? 'steel' :
                    pokemon ===  dataConstant.POKEMON_FAIRY ? 'fairy' :
                    ''
                }
            </Badge>
        )
    };

    _renderPokemonStatus(status) {
        return (
            <Badge className="font-weight-bold text-nowrap"
                color={
                    `${status === dataConstant.STATUS_ACTIVE ? 'success' : 'secondary'}`
                }>
                {
                    status === dataConstant.STATUS_ACTIVE ? "Active" : 'Inavtive'
                }
            </Badge>
        )
    };
    _renderPokemonGender(gender, index) {
        return (
            <span key={index}>
                {
                    gender === dataConstant.GENDER_MALE ? 
                    <i className="fas fa-mars"></i> : 
                    gender === dataConstant.GENDER_FEMALE ? 
                    <i className="fas fa-venus"></i> : 
                    gender === dataConstant.GENDER_BOTH ?
                    <span>
                        <i className="mr-2 fas fa-mars"></i>
                        <i className="fas fa-venus"></i>
                    </span> :
                    "Unknown"
                }
            </span>

        )
    };

    _renderActionColumn(pokemon) {
        return (
            <ul className="list-unstyled">
                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret className="text-danger" >
                        <i className="fas fa-cog"></i>
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem className="text-center">
                            Actions
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>
                            <Link to="" href="#" className="text-dark" onClick={()=>{}}>
                                <i className="fas fa-edit mr-2 text-secondary"></i>Edit Generals
                            </Link>
                        </DropdownItem>
                        <DropdownItem>
                            <Link to="" href="#" className="text-dark" onClick={()=>{}}>
                                <i className="fas fa-paw mr-2 text-secondary"></i>Change Types
                            </Link>
                        </DropdownItem>
                        <DropdownItem>
                            <Link to="" href="#" className="text-dark" onClick={()=>{}}>
                                <i className="fas fa-ghost mr-2 text-secondary"></i>Change Weakness
                            </Link>
                        </DropdownItem>
                        <DropdownItem>
                            <Link to="" href="#" className="text-dark" onClick={()=>{}}>
                                <i className="fab fa-superpowers mr-2 text-secondary"></i>Change Abilities
                            </Link>
                        </DropdownItem>
                        <DropdownItem>
                            <PokemonImageModal
                                pokemon={pokemon}
                                getPokemons={()=>this.getPokemons()}
                            />
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem className="text-center">
                            {
                                pokemon.status === dataConstant.STATUS_ACTIVE && (
                                    <UpdatePokemonStatusModal 
                                        pokemon={pokemon}
                                        getPokemons={()=>this.getPokemons()}
                                    />
                                )
                            }
                            {
                                pokemon.status === dataConstant.STATUS_INACTIVE && (
                                    <UpdatePokemonStatusModal 
                                        pokemon={pokemon}
                                        getPokemons={()=>this.getPokemons()}
                                    />
                                )
                            }
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </ul>
        )
    };

    _renderPokemonTable() {
        const options = [
            {
                th: "#ID",
                td: (pokemon, index) => pokemon.id,
                thClass: 'text-center align-middle',
                tdClass: 'text-center align-middle',
                key: 'id'
            },
            {
                th: "Action",
                td: (pokemon, index) => this._renderActionColumn(pokemon),
                thClass: 'text-center align-middle',
                tdClass: 'text-center align-middle',
                key: 'action'
            },
            {
                th: "Name",
                td: (pokemon, index) => <Link to={`/${routeNameConstant.ROUTE_NAME_MAIN}/${routeNameConstant.ROUTE_NAME_POKEMON}/${pokemon.id}`} className="text-decoration-none">
                                            {pokemon.name}
                                        </Link>,
                thClass: 'text-center align-middle',
                tdClass: 'text-center align-middle font-weight-bold text-primary text-capitalize',
                key: 'name'
            },
            {
                th: "Image",
                td: (pokemon, index) => <img className="Pokemon-table__img" alt="" src={pokemon.image}/>,
                thClass: 'text-center align-middle',
                tdClass: 'text-center align-middle',
                key: 'image'
            },
            {
                th: "Stage",
                td: (pokemon, index) => pokemon.stage,
                thClass: 'text-center align-middle',
                tdClass: 'text-center align-middle',
                key: 'stage'
            },
            {
                th: "Tag",
                td: (pokemon, index) => pokemon.tag,
                thClass: 'text-center align-middle',
                tdClass: 'text-center align-middle',
                key: 'tag'
            },
            {
                th: "Of Basic",
                td: (pokemon, index) => pokemon.of_basic ? 
                    <Link to={`/${routeNameConstant.ROUTE_NAME_MAIN}/${routeNameConstant.ROUTE_NAME_POKEMON}/${pokemon.of_basic.id}`} className="text-decoration-none">
                        {`${pokemon.of_basic.name} (${pokemon.of_basic.id})`}
                    </Link> :
                     pokemon.of_basic,
                thClass: 'text-center align-middle',
                tdClass: 'text-center align-middle text-capitalize',
                key: 'of_basic'
            },
            {
                th: "Type",
                td: (pokemon, index) => pokemon.types ? 
                                        JSON.parse(pokemon.types).sort().map((type, index) => this._renderPokemonProperty(type, index)) : 
                                        null,
                thClass: 'text-center align-middle',
                tdClass: 'text-center align-middle',
                key: 'type'
            },
            {
                th: "Weakness",
                td: (pokemon, index) => pokemon.weakness ? 
                                        JSON.parse(pokemon.weakness).sort().map((weakness, index) => this._renderPokemonProperty(weakness, index)) : 
                                        null,
                thClass: 'text-center align-middle',
                tdClass: 'text-center align-middle',
                key: 'weakness'
            },
            {
                th: "Abilities",
                td: (pokemon, index) => pokemon.abilities ? 
                                        JSON.parse(pokemon.abilities).sort().map((ability_id, index) => <PokemonAbilityComponent ability_id={ability_id} key={index}/>) : 
                                        null,
                thClass: 'text-center align-middle',
                tdClass: 'text-center align-middle',
                key: 'ability'
            },
            {
                th: "Height(ft)",
                td: (pokemon, index) => pokemon.height,
                thClass: 'text-center align-middle',
                tdClass: 'text-right align-middle',
                key: 'height'
            },
            {
                th: "Weight(Lbs)",
                td: (pokemon, index) => pokemon.weight,
                thClass: 'text-center align-middle',
                tdClass: 'text-right align-middle',
                key: 'weight'
            },
            {
                th: "Gender",
                td: (pokemon, index) => this._renderPokemonGender(pokemon.gender),
                thClass: 'text-center align-middle',
                tdClass: 'text-center align-middle',
                key: 'gender'
            },
            {
                th: "Status",
                td: (pokemon, index) => this._renderPokemonStatus(pokemon.status),
                thClass: 'text-center align-middle',
                tdClass: 'text-center align-middle',
                key: 'status'
            }
        ];
        return <div>
            <TableCommonComponent
                data={this.state.pokemonData}
                wrapper='pokemon_table_wrapper'
                options={options}
            />
        </div>
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
        return (
            <div>
                <h2 className="text-secondary">Pokemon Table</h2>
                <div className="row">
                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4 col-12">
                        <div className='form-group'>
                            <label className="form-control-plaintext">
                                By Type
                            </label>
                            <select className="form-control selector" onChange={(event) => this.onChangeFilterByType(event.target.value)}>
                                <option value=''>Select</option>
                                {
                                    this.state.filterData.types && this.state.filterData.types.map((type, index) => {
                                        return <option value={parseInt(type.id)} key={index}>{
                                        type.name}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4 col-12">
                        <div className='form-group'>
                            <label className="form-control-plaintext">
                                By Weakness
                            </label>
                            <select className="form-control selector" onChange={(event) => this.onChangeFilterByWeakness(event.target.value)}>
                                <option value=''>Select</option>
                                {
                                    this.state.filterData.weakness && this.state.filterData.weakness.map((weakness, index) => {
                                        return <option value={parseInt(weakness.id)} key={index}>{weakness.name}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4 col-12">
                        <div className='form-group'>
                            <label className="form-control-plaintext">
                                By Ability
                            </label>
                            <select className="form-control selector" onChange={(event) => this.onChangeFilterByAbility(event.target.value)}>
                                <option value=''>Select</option>
                                {
                                    this.state.filterData.abilities && this.state.filterData.abilities.map((ability, index) => {
                                        return <option value={parseInt(ability.id)} key={index}>{
                                        ability.name}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                </div>
                {
                    this.state.pokemonData && (
                        <div>
                            {this._renderPokemonTable()}
                            <PaginationComponent
                                limits={[2, 5, 10, 50]}
                                page={this.state.params.page}
                                limit={this.state.params.limit}
                                total={this.state.total}
                                onChangePage={(page) => this.onChangePage(page)}
                                onChangeLimit={(limit) => this.onChangeLimit(limit)}
                            />
                        </div>
                    )
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PokemonComponent));