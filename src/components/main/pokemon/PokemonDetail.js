import React from 'react';

import HTTPRequest from 'helper/httpRequest';

class PokemonDetailComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pokemon: null
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
            
            if(this._isMounted) {
                this.setState({
                    pokemon: response.data.data[0]
                })
            }
        }).catch((error) => {
            console.log(error)
        })
        
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
                <h2>POKEMON DETAIL COMPONENT</h2>
                {
                    this.state.pokemon && (
                        <div>
                            <p>{this.state.pokemon.name}</p>
                        </div>
                    )
                }
                
            </div>
        )
    }
};

export default PokemonDetailComponent;