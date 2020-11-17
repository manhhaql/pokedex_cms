import React, { useState } from 'react';

import { Tooltip } from 'reactstrap';

const TooltipComponent = function(props) {
    const [tooltipOpen, setTooltipOpen] = useState(false)
    return (
        <Tooltip
            placement={props.placement}
            target={props.target}
            isOpen={tooltipOpen}
            toggle={() => setTimeout(()=>{
                setTooltipOpen(!tooltipOpen)
            }, 1)}
        >
            {props.text}
        </Tooltip>
    )
}

export default TooltipComponent;
