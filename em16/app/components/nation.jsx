'use strict';

import React from "react";

class Nation extends React.Component {
    render() {
        let nation = this.props.nation;
        let name = nation.name || 'Unknown';
        let flag = nation.flag || 'Antarctica.png';

        let classes = ['nation'];
        let firstElement = <span className="nation-name">{name}</span>;
        let secondElement = <img className="nation-img" src={'img/flags/' + flag}/>;

        if (this.props.reverse) {
            classes.push('right');
            let cache = secondElement;
            secondElement = firstElement;
            firstElement = cache;
        } else {
            classes.push('left');
        }
        return (
            <div className={classes.join(' ')}>
                    {firstElement}
                    {secondElement}
            </div>
        );
    }
}

export default Nation;