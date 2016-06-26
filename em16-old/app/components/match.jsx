'use strict';

import React from "react";
import Nation from "./nation.jsx";
import hash from "../hash";

class MatchInput extends React.Component {
    render() {
        let data = this.props.data;
        let match = data.match;
        let score = data.getScore();
        if (!(score >= 0 && score <= 10)) {
            score = '';
        }

        let classes = ['match-input'];
        if (score !== 0 && !score || match.firstScore == match.secondScore) {
            classes.push('invalid');
        }
        let onChange = function (e) {
            let goals = parseInt(e.target.value, 10);
            if (goals < 0 || goals > 9) return;
            data.setScore(goals);
            hash.update();
        };
        return (
            <div>
                <input className={classes.join(' ')} type="number" min="0" max="9" value={score} onChange={onChange}/>
            </div>
        );
    }
}

class Match extends React.Component {
    render() {
        let match = this.props.match;

        let firstMatch = {
            match,
            getScore: () => match.firstScore,
            setScore: (score) => {
                match.firstScore = score;
            }
        };
        let secondMatch = {
            match,
            getScore: () => match.secondScore,
            setScore: (score) => {
                match.secondScore = score;
            }
        };

        return (
            <div className="match">
                <table style={{'width': '100%'}}>
                    <tbody>
                    <tr>
                        <td><Nation nation={match.firstNation}/></td>
                        <td><MatchInput data={firstMatch}/></td>
                    </tr>
                    <tr>
                        <td><Nation nation={match.secondNation}/></td>
                        <td><MatchInput data={secondMatch}/></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Match;