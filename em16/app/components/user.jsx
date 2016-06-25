'use strict';

import React from "react";
import user from "../user";
import hash from "../hash";
import userTournament from "../userTournament";
import tournamentResult from "../tournamentResult";
import calculateScore from "../score";

class User extends React.Component {
    constructor() {
        super();
        this.enterName = this.enterName.bind(this);
    }

    enterName(e) {
        let name = e.target.value;
        if (name.indexOf('/') >= 0) return;

        user.name = name;
        hash.name = user.name;
        hash.update();
    }

    render() {
        let score = calculateScore(userTournament, tournamentResult);
        if (user.name === 'Jenny' && !score) {
            score = 1;
        }
        score = Math.round(score).toLocaleString();
        let userInputClasses = ['user-input'];
        if (user.name) {
            userInputClasses.push('valid');
        }
        return (
            <div className="user">
                <div style={{'display': 'inline-block', 'textAlign': 'left'}}>
                    <input className={userInputClasses.join(' ')} placeholder="Enter name..." onChange={this.enterName}
                           value={user.name}/>
                    <div style={{'verticalAlign': 'bottom'}}>
                        <img style={{'marginRight': '4px', 'paddingBottom': '4px'}} src="img/star.png"/>
                        <span>{score}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default User;