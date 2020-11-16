import React, { useState } from 'react';
import TooltipComponent from 'components/common/tooltip'

const PokemonAbilityComponent = (props) => {
    return (
      <div>
        <span className="Pokemon-ability__text" id={`Ability_${props.ability.id}_${props.pokemon.id}`}>
          {props.ability.name}
        </span>
        <TooltipComponent
          placement="right"
          target= {`Ability_${props.ability.id}_${props.pokemon.id}`}
          text={props.ability.description}
        />
      </div>
    );
}

export default PokemonAbilityComponent;