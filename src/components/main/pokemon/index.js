import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { Badge } from 'reactstrap';

import HTTPRequest from 'helper/httpRequest';

import * as routeNameConstant from 'constant/routeName';

import TableCommonComponent from 'components/common/table';
import PaginationComponent from 'components/common/pagination';

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

    _renderPokemonType(type, index) {
        return (
            <Badge key={index} className=
                {`font-weight-bold text-nowrap text-capitalize mr-1 p-1  
                    Pokemon-${
                        type ===  1 ? 'fire' :
                        type === 2 ? 'water' :
                        type === 3 ? 'grass' :
                        type === 4 ? 'flying' :
                        ''
                    }
                `}
            >
                {
                    type ===  1 ? 'fire' :
                    type === 2 ? 'water' :
                    type === 3 ? 'grass' :
                    type === 4 ? 'flying' :
                    ''
                }
            </Badge>
        )
    };

    _renderPokemonStatus(status) {
        return (
            <Badge className="font-weight-bold text-nowrap"
                color={
                    `${status === 0 ? 'success' :
                        status === 1 ? 'secondary' :
                            ''
                    }`
                }>
                {
                    status === 0 ? "Active" : 'Inavtive'
                }
            </Badge>
        )
    };
    _renderPokemonGender(gender) {
        return (
            <span>
                <i className={
                    `mr-1 fas fa-${
                        gender === 1 ? 'mars' :
                            gender === 2 ? 'venus' :
                                gender === 3 ? 'venus-mars' :
                                    'genderless'
                    }`
                }>

                </i>
                {
                    gender === 1 ? "Male" :
                        gender === 2 ? 'Female' :
                            gender === 3 ? 'Both' :
                                'Unknown'
                }
            </span>

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
                th: "Name",
            td: (pokemon, index) => <Link to={`/${routeNameConstant.ROUTE_NAME_MAIN}/${routeNameConstant.ROUTE_NAME_POKEMON}/${pokemon.id}`} className="text-decoration-none">{pokemon.name}</Link>,
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
                th: "Of 1st Stage",
            td: (pokemon, index) => <Link to="/" className="text-decoration-none">{pokemon.of_first_stage ? `${pokemon.of_first_stage.name} (${pokemon.of_first_stage.id})` : pokemon.of_first_stage}</Link>,
                thClass: 'text-center align-middle',
                tdClass: 'text-center align-middle text-capitalize',
                key: 'of_first_stage'
            },
            {
                th: "Type",
                td: (pokemon, index) => pokemon.types ? JSON.parse(pokemon.types).map((type, index) => this._renderPokemonType(type, index)) : null,
                thClass: 'text-center align-middle',
                tdClass: 'text-center align-middle',
                key: 'type'
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
                            By type
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