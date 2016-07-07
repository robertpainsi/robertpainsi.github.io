'use strict';

import React from "react";
import User from "./user.jsx";
import Tournament from "./tournament.jsx";
import Scoreboard from "./scoreboard.jsx";
import parser from "../parser";
import user from "../user";
import TournamentClass from "../tournament";
import tournamentResult from "../tournamentResult";
import {getTournamentScore} from "../score";

const USERS = [
    {
        name: 'Lore',
        hash: '#Lore/1#2:1;2#3:2;3#1:0;4#2:0;5#1:0;6#2:3;7#1:0;8#1:0;9#2:1;10#2:3;11#2:1;12#2:0;13#2:1;14#1:0;'
    },
    {
        name: 'Jenny',
        hash: '#Jenny/1#1:0;2#1:2;3#0:1;4#2:3;5#4:0;6#2:3;7#5:3;8#3:0;9#1:0;10#0:2;11#3:2;12#3:1;13#2:0;14#4:2'
    },
    {
        name: 'Gerald',
        hash: '#Gerald/1#0:2;2#3:0;3#1:0;4#0:1;5#2:1;6#2:0;7#1:0;8#0:1;9#2:0;10#0:2;11#2:1;12#0:1;13#0:2;14#1:0'
    },
    {
        name: 'Harald',
        hash: '#Harald/1#0:1;2#2:3;3#2:1;4#3:2;5#4:1;6#3:2;7#4:3;8#1:3;9#1:3;10#1:2;11#3:1;12#3:1;13#2:3;14#3:2;'
    },
    {
        name: 'Robert',
        hash: '#Robert/1#0:1;2#2:1;3#1:0;4#0:1;5#2:0;6#1:2;7#2:0;8#1:0;9#0:1;10#0:2;11#2:1;12#2:1;13#4:3;14#1:2;'
    }
];

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