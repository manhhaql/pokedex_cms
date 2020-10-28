import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import HTTPRequest from 'helper/httpRequest';

class PokemonComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pokemonData: null,
            params: {
                id: null,
                name: '',
                type_id: null,
                weakness_id: null,
                ability_id: null,
                page: 1,
                limit: 10,
            }
        }
    };

    getPokemons() {
        HTTPRequest.get({
            url: 'pokemon/list',
            params: {
                page: this.state.params.page,
                limit: this.state.params.limit
            }
        }).then(response => {
            console.log(response.data.data)
            this.setState({
                pokemonData: response.data.data
            })
        }).catch(error => {
            console.log(error)
        })
    };

    componentDidMount() {
        this.getPokemons();
    }
    render() {
        return (
            <div>
                <h2>POKEMON COMPONENT</h2>
                {
                    this.state.pokemonData && this.state.pokemonData.map((pokemon, index) => {
                        return (
                        <p key={index}>{pokemon.name}</p>
                        )
                    })
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(PokemonComponent));