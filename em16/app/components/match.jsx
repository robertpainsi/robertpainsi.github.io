'use strict';

import React from "react";
import Nation from "./nation.jsx";
import {unknown} from "../nation";
import hash from "../hash";
import {getMatchScore} from "../score";

class MatchInput extends React.Component {
    render() {
        let data = this.props.data;
        let match = data.match;
        let score = data.getScore();
        if (!(score >= 0 && score <= 10)) {
            score = '';
        }

        let classes = ['match-input'];
        if (score !== '' && score >= 0 && score <= 9) {
            if (match.firstScore === match.secondScore) {
                classes.push('invalid');
            } else {
                classes.push('valid');
            }
        }
        let onChange = function (e) {
            let goals = parseInt(e.target.value, 10);
            if (goals < 0 || goals > 9) return;
            data.setScore(goals);
            hash.update();
        };
        return <input className={classes.join(' ')} type="number" min="0" max="9" value={score} onChange={onChange}
                      placeholder="?"/>;
    }
}

class Match extends React.Component {
    render() {
        let match = this.props.match;
        let actualMatch = this.props.actualMatch;
        let actualFirstScore = actualMatch.firstScore;
        let actualSecondScore = actualMatch.secondScore;
        let points = getMatchScore(match, actualMatch);

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

        let lockOverlay;
        let matchClasses = ['match'];
        if (match.firstNation === unknown || match.secondNation === unknown) {
            lockOverlay = <div className="locked-overlay"></div>;
            matchClasses.push('locked');

            let lockedMatch = {
                match: unknown,
                getScore: () => '',
                setScore: () => undefind
            };
            firstMatch = lockedMatch;
            secondMatch = lockedMatch;
        }

        let actualScoreVisibilityClass;
        if (actualMatch.firstScore === undefined || actualMatch.secondScore === undefined) {
            actualScoreVisibilityClass = 'invisible';
        } else {
            matchClasses.push('over');
        }

        return (
            <div className="match-parent">
                <div className={matchClasses.join(' ')}>
                    {lockOverlay}
                    <Nation nation={match.firstNation}/>
                    <div className="score">
                        <div>
                            <MatchInput data={firstMatch}/>
                            <span className="match-separator">-</span>
                            <MatchInput data={secondMatch}/>
                        </div>
                        <div className={actualScoreVisibilityClass}>
                            <span style={{'verticalAlign': 'text-top'}}>({actualFirstScore} - {actualSecondScore}) +{points} </span>
                            <img src="img/star.png" width="16px" height="16px"/>
                        </div>
                    </div>
                    <Nation nation={match.secondNation} reverse={true}/>
                </div>
            </div>
        );
    }
}

export default Match;