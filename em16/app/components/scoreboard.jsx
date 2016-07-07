'use strict';

import React from "react";

class Scoreboard extends React.Component {
    render() {
        return (
            <div className="scoreboard">
                <div className="a">
                    <table>
                        <tbody>
                        {
                            this.props.players
                                .sort(function (player1, player2) {
                                    return player2.score - player1.score;
                                })
                                .map(function (player, index, players) {
                                    let name = player.name;
                                    let rank = index + 1;
                                    let score = player.score;
                                    let rankClasses = ['scoreboard-text'];

                                    if (index > 0) {
                                        let previousPlayer = players[index - 1];
                                        if (player.score === previousPlayer.score) {
                                            rankClasses.push('hide');
                                        }
                                    }
                                    var classes = ['scoreboard-line'];
                                    return (
                                        <tr key={'scoreboard-' + name} className={classes.join(' ')}>
                                            <td className="scoreboard-rank">
                                                <span className={rankClasses.join(' ')}>{rank}.</span>
                                            </td>
                                            <td className="scoreboard-name">
                                                <span className="scoreboard-text">{name}</span>
                                            </td>
                                            <td className="scoreboard-score">
                                                <img src="img/star.png" className="scoreboard-score-star"/>
                                                <span className="scoreboard-text">{Math.round(score).toLocaleString()}</span>
                                            </td>
                                        </tr>
                                    );
                                })
                        }
                        </tbody>
                    </table>
                </div>
                <div className="scoreboard-arrow">
                    <img src="img/arrow_right.png"/>
                </div>
            </div>
        );
    }
}

export default Scoreboard;