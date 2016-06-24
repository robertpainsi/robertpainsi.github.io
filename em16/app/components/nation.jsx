'use strict';

import React from "react";
import ReactCSSTransitionGroup from "react/lib/ReactCSSTransitionGroup";

class Nation extends React.Component {
    render() {
        let nation = this.props.nation;
        let name = nation.name || 'Unknown';
        let flag = nation.flag || 'Antarctica.png';
        return (
            <div className="nation">
                <ReactCSSTransitionGroup transitionName="example"
                                         transitionEnterTimeout={400}
                                         transitionLeaveTimeout={400}>
                    <div key={name} style={{'position': 'absolute', 'marginTop': '-16px'}}>
                        <p>
                            <img className="nation-img" src={'img/flags/' + flag}/>
                            <span className="nation-name">{name}</span>
                        </p>
                    </div>
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}

export default Nation;