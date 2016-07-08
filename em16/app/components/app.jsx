'use strict';

import React from "react";
import User from "./user.jsx";
import Tournament from "./tournament.jsx";
import Scoreboard from "./scoreboard.jsx";
import parser from "../parser";
import user from "../user";
import USERS from "../userTips";
import tournamentResult from "../tournamentResult";
import {getTournamentScore} from "../score";

class App extends React.Component {
    componentWillMount() {
        var parsed = parser.parseHash(this.props.location.hash);
        user.set(parsed.name, parsed.tournament);
    }

    render() {
        var players = USERS.map(function (player) {
            return {
                name: player.name,
                score: getTournamentScore(parser.parseHash(player.hash).tournament, tournamentResult)
            }
        });
        return (
            <div className="app">
                <div className="app-header">
                    <div className="app-header-content">
                        <div style={{'display': 'inline-block', 'marginRight': '20px'}}>
                            <img src="img/em16.png"/>
                        </div>
                        <User/>
                    </div>
                    <div>
                        {
                            USERS.map(function (player) {
                                let classes = ['user-tab'];
                                if (player.name === user.name) {
                                    classes.push('active');
                                }
                                return <a key={player.name} href={player.hash}
                                          className={classes.join(' ')} onClick={function() {
                                            var parsed = parser.parseHash(player.hash);
                                            user.set(parsed.name, parsed.tournament);
                                          }}>{player.name}</a>
                            })
                        }
                    </div>
                </div>
                <div id="app-content" className="app-content">
                    <Scoreboard players={players}/>
                    <Tournament/>
                </div>
            </div>
        );
    }
}

export default App;