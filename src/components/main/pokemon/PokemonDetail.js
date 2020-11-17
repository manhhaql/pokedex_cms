import React from 'react';
import ReactDOM from 'react-dom';

import HTTPRequest from 'helper/httpRequest';

import {
    Container,
    Badge,
    Button,
    Card,
    CardBody,
    CardImg,
    CardTitle
} from 'reactstrap';

import * as dataConstant from 'constant/data';
import * as routeNameConstant from 'constant/routeName';

class PokemonDetailComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pokemon: null,
            pokemonByTag: null,
            currentAbilty: null
        }
        this._isMounted = false;
    }

    getPokemonDetail() {
        let id_from_pathname = parseInt(window.document.location.pathname.split('/').pop())
        HTTPRequest.get({
            url: `/pokemon/list`,
            params: {
                id: id_from_pathname
            }
        }).then((response) => {

            if (this._isMounted) {
                this.setState({
                    pokemon: response.data.data[0]
                })
                this.getPokemonByTag(response.data.data[0].tag)
            }
        }).catch((error) => {
        })

    };

    getPokemonByTag(tag) {
        HTTPRequest.get({
            url: `/pokemon/list`,
            params: {
                tag: tag
            }
        }).then((response) => {
            if (this._isMounted) {
                this.setState({
                    pokemonByTag: response.data.data
                })
            }
        }).catch((error) => {
        })
    };

    _renderPokemonProperty(pokemon, index) {
        return (
            <Badge key={index} className=
                {`font-weight-bold text-nowrap text-capitalize Attribute-value__badge  
                    Pokemon-${pokemon === dataConstant.POKEMON_NORMAL ? 'normal' :
                        pokemon === dataConstant.POKEMON_FIRE ? 'fire' :
                            pokemon === dataConstant.POKEMON_WATER ? 'water' :
                                pokemon === dataConstant.POKEMON_GRASS ? 'grass' :
                                    pokemon === dataConstant.POKEMON_ELECTRIC ? 'electric' :
                                        pokemon === dataConstant.POKEMON_ICE ? 'ice' :
                                            pokemon === dataConstant.POKEMON_FIGHTING ? 'fighting' :
                                                pokemon === dataConstant.POKEMON_POISON ? 'poison' :
                                                    pokemon === dataConstant.POKEMON_GROUND ? 'ground' :
                                                        pokemon === dataConstant.POKEMON_FLYING ? 'flying' :
                                                            pokemon === dataConstant.POKEMON_PSYCHIC ? 'psychic' :
                                                                pokemon === dataConstant.POKEMON_BUG ? 'bug' :
                                                                    pokemon === dataConstant.POKEMON_ROCK ? 'rock' :
                                                                        pokemon === dataConstant.POKEMON_GHOST ? 'ghost' :
                                                                            pokemon === dataConstant.POKEMON_DARK ? 'dark' :
                                                                                pokemon === dataConstant.POKEMON_DRAGON ? 'dragon' :
                                                                                    pokemon === dataConstant.POKEMON_STEEL ? 'steel' :
                                                                                        pokemon === dataConstant.POKEMON_FAIRY ? 'fairy' :
                                                                                            ''
                    }
                `}
            >
                {
                    pokemon === dataConstant.POKEMON_NORMAL ? 'normal' :
                        pokemon === dataConstant.POKEMON_FIRE ? 'fire' :
                            pokemon === dataConstant.POKEMON_WATER ? 'water' :
                                pokemon === dataConstant.POKEMON_GRASS ? 'grass' :
                                    pokemon === dataConstant.POKEMON_ELECTRIC ? 'electric' :
                                        pokemon === dataConstant.POKEMON_ICE ? 'ice' :
                                            pokemon === dataConstant.POKEMON_FIGHTING ? 'fighting' :
                                                pokemon === dataConstant.POKEMON_POISON ? 'poison' :
                                                    pokemon === dataConstant.POKEMON_GROUND ? 'ground' :
                                                        pokemon === dataConstant.POKEMON_FLYING ? 'flying' :
                                                            pokemon === dataConstant.POKEMON_PSYCHIC ? 'psychic' :
                                                                pokemon === dataConstant.POKEMON_BUG ? 'bug' :
                                                                    pokemon === dataConstant.POKEMON_ROCK ? 'rock' :
                                                                        pokemon === dataConstant.POKEMON_GHOST ? 'ghost' :
                                                                            pokemon === dataConstant.POKEMON_DARK ? 'dark' :
                                                                                pokemon === dataConstant.POKEMON_DRAGON ? 'dragon' :
                                                                                    pokemon === dataConstant.POKEMON_STEEL ? 'steel' :
                                                                                        pokemon === dataConstant.POKEMON_FAIRY ? 'fairy' :
                                                                                            ''
                }
            </Badge>
        )
    };

    onAblitityInfoClicked = (ability) => {
        this.setState({
            currentAbilty: ability
        })
    };

    onCloseAbilityInfoClicked = () => {
        this.setState({
            currentAbilty: null
        })
    }
        ;
    OnBackButtonClicked = () => {
        this.props.history.push(`/${routeNameConstant.ROUTE_NAME_MAIN}/${routeNameConstant.ROUTE_NAME_POKEMON}`)
    };

    OnPokemonEvolutionCLicked = (id) => {
        this.props.history.push(`/${routeNameConstant.ROUTE_NAME_MAIN}/${routeNameConstant.ROUTE_NAME_POKEMON}/${id}`);
        this.getPokemonDetail();

        this.setState({
            currentAbilty: null
        })

        ReactDOM.findDOMNode(this).scrollIntoView({ behavior: "smooth" });
    }

    componentDidMount() {
        this._isMounted = true;
        this.getPokemonDetail();
    };

    componentWillUnmount() {
        this._isMounted = false
    };

    render() {
        return (
            <div>
                <div className="Detail-header">
                    <h2 className="text-secondary Content-header__title">Pokemon Detail</h2>
                    <Button color="secondary" onClick={this.OnBackButtonClicked}>
                        <i className="fas fa-arrow-left mr-2"></i><span className="Content-header__btn--text">Back</span>
                    </Button>
                </div>
                <Container>
                    {
                        this.state.pokemon && (
                            <div className="Detail-grid__container">
                                <div className="Detail-grid__item1">
                                    <h2>
                                        {this.state.pokemon.name}
                                        <span className="text-secondary">
                                            &nbsp;#{
                                                `${this.state.pokemon.id < 10 ? `00${this.state.pokemon.id}` :
                                                    this.state.pokemon.id < 10 ? `0${this.state.pokemon.id}` :
                                                        this.state.pokemon.id}`
                                            }
                                        </span>
                                    </h2>
                                </div>
                                <div className="Detail-grid__item2">
                                    <img src={this.state.pokemon.image ? this.state.pokemon.image : dataConstant.NO_IMAGE_URL} alt={this.state.pokemon.name}></img>
                                </div>
                                <div className="Detail-grid__item3">
                                    <div className="Detail-grid__item3--item">
                                        <span className="Attribute-title">Height</span>
                                        <span className="Attribute-value">{`${Math.trunc(this.state.pokemon.height / 12)}'${this.state.pokemon.height % 12}"`}</span>
                                    </div>
                                    <div className="Detail-grid__item3--item">
                                        <span className="Attribute-title">Weight</span>
                                        <span className="Attribute-value">{this.state.pokemon.weight} lbs</span>
                                    </div>
                                    <div className="Detail-grid__item3--item">
                                        <span className="Attribute-title">Gender</span>
                                        <span className="Attribute-value">
                                            {
                                                this.state.pokemon.gender === dataConstant.GENDER_MALE ?
                                                    <span>&#9794;</span> :
                                                    this.state.pokemon.gender === dataConstant.GENDER_FEMALE ?
                                                        <span>&#9792;</span> :
                                                        <span>&#9794;&nbsp;&#9792;</span>
                                            }
                                        </span>
                                    </div>
                                    <div className="Detail-grid__item3--item">
                                        <span className="Attribute-title">Abilities</span>
                                        {
                                            this.state.pokemon.abilities && this.state.pokemon.abilities.map((ability, index) => (
                                                <span className="Attribute-value Attribute-info" key={index}>
                                                    <button className="Attribute-info__btn" onClick={() => this.onAblitityInfoClicked(ability)}>
                                                        {ability.name}<span className="Attribute-info__more">?</span>
                                                    </button>
                                                </span>
                                            ))
                                        }
                                    </div>
                                    {

                                        <div className={`Ability-info ${this.state.currentAbilty ? "show" : ""}`}>
                                            {
                                                this.state.currentAbilty && (
                                                    <>
                                                        <div className="Ability-info__header">
                                                            <span className="Ability-info__title text-secondary">Ability Info</span>
                                                            <span className="Ability-info__close" onClick={this.onCloseAbilityInfoClicked}><i className="far fa-window-close fa-2x"></i></span>
                                                        </div>
                                                        <div className="Ability-info__content">
                                                            <h4>{this.state.currentAbilty.name}</h4>
                                                            <p>{this.state.currentAbilty.description}</p>
                                                        </div>
                                                    </>
                                                )
                                            }
                                        </div>
                                    }
                                </div>
                                <div className="Detail-grid__item4">
                                    <h4>Type</h4>
                                    {
                                        this.state.pokemon.types &&
                                        JSON.parse(this.state.pokemon.types).sort().map((type, index) => this._renderPokemonProperty(type, index))

                                    }
                                </div>
                                <div className="Detail-grid__item5">
                                    <h4>Weakness</h4>
                                    {
                                        this.state.pokemon.weakness &&
                                        JSON.parse(this.state.pokemon.weakness).sort().map((type, index) => this._renderPokemonProperty(type, index))

                                    }
                                </div>
                                <div className="Detail-grid__item6">
                                    <h4>Evolutions</h4>
                                    <div className="Detail-evolution">
                                        {
                                            this.state.pokemonByTag && this.state.pokemonByTag.map((pokemon, index) => (
                                                <Card key={index} className="Detail-evolution__card">
                                                    <div>
                                                        <CardImg
                                                            className="Detail-evolution__img"
                                                            src={pokemon.image ? pokemon.image : dataConstant.NO_IMAGE_URL} alt=""
                                                            onClick={() => this.OnPokemonEvolutionCLicked(pokemon.id)}
                                                        />
                                                    </div>
                                                    <CardBody>
                                                        <CardTitle tag="h5">
                                                            {pokemon.name}
                                                            <span className="text-secondary">
                                                                &nbsp;#{
                                                                    `${pokemon.id < 10 ? `00${pokemon.id}` :
                                                                        pokemon.id < 10 ? `0${pokemon.id}` :
                                                                            pokemon.id}`
                                                                }
                                                            </span>
                                                        </CardTitle>
                                                        {
                                                            this.state.pokemon.types &&
                                                            JSON.parse(this.state.pokemon.types).sort().map((type, index) => this._renderPokemonProperty(type, index))

                                                        }
                                                    </CardBody>
                                                </Card>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </Container>
            </div>
        )
    }
};

export default PokemonDetailComponent;