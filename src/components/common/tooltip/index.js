import React, { useState } from 'react';

import { Tooltip } from 'reactstrap';

const TooltipComponent = function(props) {
    const [tooltipOpen, setTooltipOpen] = useState(false)
    return (
        <Tooltip
            placement={props.placement}
            target={props.target}
            isOpen={tooltipOpen}
            toggle={() => setTooltipOpen(!tooltipOpen)}
        >
            {props.text}
        </Tooltip>
    )
}

export default TooltipComponent;
