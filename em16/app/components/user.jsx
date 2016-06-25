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
        score = Math.round(score).toLocaleString();
        let userInputClasses = ['user-input'];
        if (user.name) {
            userInputClasses.push('valid');
        }
        return (
            <div className="user">
                <table>
                    <tbody>
                    <tr>
                        <td align="right"><span>User:&nbsp;</span></td>
                        <td><input className={userInputClasses.join(' ')} placeholder="Enter name"
                                   onChange={this.enterName} value={user.name}/></td>
                    </tr>
                    <tr>
                        <td><span>Score:&nbsp;</span></td>
                        <td><span>{score}</span></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default User;