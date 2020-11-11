import React, { useState } from 'react';
import { Tooltip } from 'reactstrap';

const PokemonAbilityComponent = (props) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);
  return (
    <div>
      <span className="Pokemon-ability__text" id={`Ability-${props.ability.id}`}>
        {props.ability.name}
      </span>
      <Tooltip placement="right"
        isOpen={tooltipOpen}
        target={`Ability-${props.ability.id}`}
        toggle={toggle}
      >
        {props.ability.description}
      </Tooltip>
    </div>
  );
}

export default PokemonAbilityComponent;