import React from 'react';
import TooltipComponent from 'components/common/tooltip'

const PokemonAbilityComponent = (props) => {
    return (
      <>
        <span className="Pokemon-ability__text" id={`Ability_${props.ability.id}_${props.pokemon ? props.pokemon.id : null}`}>
          {props.ability.name}
        </span>
        <TooltipComponent
          placement="right"
          target= {`Ability_${props.ability.id}_${props.pokemon ? props.pokemon.id : null}`}
          text={props.ability.description}
        />
      </>
    );
}

export default PokemonAbilityComponent;