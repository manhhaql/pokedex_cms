import React, { useEffect, useState } from 'react';
import { Tooltip } from 'reactstrap';

import HTTPRequest from 'helper/httpRequest';



class PokemonAbilityComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ability: null,
            isOpen: false
        }
        this._isMounted = false
    };

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        })
    };
    

    componentDidMount() {
        this._isMounted = true;

        HTTPRequest.get({
            url: 'properties/ability',
            params: {
                id: this.props.ability_id
            }
        }).then(response => {
            if(this._isMounted) {
                this.setState({
                    ability: response.data.data[0] 
                })
            }
        }).catch(error => {
            console.log(error)
        })
    };

    componentWillUnmount() {
        this._isMounted = false
    };

    render() {
        return (
            <div>
                {
                    this.state.ability && (
                    <div>
                        <span className="Pokemon-ability__text" href="#" id={`Ability-${this.state.ability.id}`}>{this.state.ability.name}</span>
                        <Tooltip placement="right" isOpen={this.state.isOpen} target={`Ability-${this.state.ability.id}`} toggle={()=>this.toggle()}>
                            {this.state.ability.description}                    
                        </Tooltip>
                    </div>
                    )
                }
            </div>
        )
    }
};

export default PokemonAbilityComponent;