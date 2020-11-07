import React, { useEffect, useRef, useState } from 'react';
import { Tooltip } from 'reactstrap';

import HTTPRequest from 'helper/httpRequest';

const PokemonAbilityComponent = (props) => {
    let _isMounted = useRef(false);
    const [ability, setAbility] = useState({});
    const [tooltipOpen, setTooltipOpen] = useState(false);
  
    const toggle = () => setTooltipOpen(!tooltipOpen);
    async function getAbility() {
        await HTTPRequest.get({
            url: 'properties/ability',
            params: {
                id: props.ability
            }
        }).then(response => {
            if(_isMounted) {
                setAbility(response.data.data[0])
            }
        }).catch(error => {
            console.log(error)
        })
    }

    useEffect(()=>{
        _isMounted = true;
        getAbility();
        return () => {
            _isMounted = false
        }
    });
    return (
      <div>
        {
            ability && (
            <div>
                <span className="Pokemon-ability__text" id={`Ability-${ability.id}`}>
                    {ability.name}
                </span>
                <Tooltip placement="right" 
                        isOpen={tooltipOpen}
                        target={`Ability-${ability.id}`} 
                        toggle={toggle}
                >
                    {ability.description}                    
                </Tooltip>
            </div>
            )
        }
      </div>
    );
  }

export default PokemonAbilityComponent;