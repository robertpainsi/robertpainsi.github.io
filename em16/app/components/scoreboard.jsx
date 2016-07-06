'use strict';

import React from "react";

class Scoreboard extends React.Component {
    render() {
        let scoreboard = this.props.players
            .sort(function (player1, player2) {
                return player1.score - player2.score;
            });
        scoreboard.forEach(function (player, index, players) {
            if (index == 0) {
                player.rank = 1;
            } else {
                let previousPlayer = players[index - 1];
                if (player.score === previousPlayer.score) {
                    player.rank = previousPlayer.rank;
                } else {
                    player.rank = previousPlayer.rank + 1;
                }
            }
        });
        console.log(scoreboard);
        return (
            <div className="scoreboard">
                <table>
                    <tbody>
                    {
                        scoreboard.map(function (player) {
                                return (
                                    <tr key={'scoreboard-' + player.name}>
                                        <td>{player.rank}</td>
                                        <td>{player.score}</td>
                                        <td>{player.name}</td>
                                    </tr>
                                );
                            })
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Scoreboard;