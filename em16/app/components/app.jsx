'use strict';

import React from "react";
import User from "./user.jsx";
import Match from "./match.jsx";
import tournamentResult from "../tournamentResult";
import parser from "../parser";
import user from "../user";
import scrollTo from "../scrollTo";

const USERS = [
    {name: 'Lore', hash: '#Lore/1#2:1;2#3:2;3#1:0;4#2:0;5#1:0;6#2:3;7#1:0;8#1:0;9#1:2;10#0:1;11#1:0;12#1:0;'},
    {name: 'Jenny', hash: '#Jenny/1#1:0;2#1:2;3#0:1;4#2:3;5#4:0;6#2:3;7#5:3;8#3:0;'},
    {name: 'Gerald', hash: '#Gerald/1#0:2;2#3:0;3#1:0;4#0:1;5#2:1;6#2:0;7#1:0;8#0:1;'},
    {name: 'Harald', hash: '#Harald/1#0:1;2#2:3;3#2:1;4#3:2;5#4:1;6#3:2;7#4:3;8#1:3;9#1:3;10#1:2;11#3:1;12#3:1;'},
    {name: 'Robert', hash: '#Robert/1#0:1;2#2:1;3#1:0;4#0:1;5#2:0;6#1:2;7#2:0;8#1:0;9#0:1;10#0:2;11#2:1;12#2:1;'}
];

class App extends React.Component {
    componentDidMount() {
        setTimeout(() => {
            let appContent = document.getElementById("app-content");
            let scrollToElement = document.getElementsByClassName("scroll-to-element")[0];

            if (scrollToElement) {
                let scrollToElementRect = scrollToElement.getBoundingClientRect();
                let contentRect = scrollToElement.parentElement.parentElement.getBoundingClientRect();
                let scrollToPosition;

                scrollToPosition = (scrollToElementRect.bottom - contentRect.bottom) + 32;
                scrollTo(appContent, scrollToPosition, 1200);
            }
        }, 100);
    }

    render() {
        parser.parseHash(this.props.location.hash);

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
                                return <a key={player.name} href={player.hash} className={classes.join(' ')}>{player.name}</a>
                            })
                        }
                    </div>
                </div>
                <div id="app-content" className="app-content">
                    <div className="tournament">
                        <div className="tournament-round">
                            <div className="tournament-round-header-content">
                                <img src="img/trophy.png"/><h1>EIGHTH FINAL</h1>
                            </div>
                            <Match match={user.tournament.get(1)} actualMatch={tournamentResult.get(1)}/>
                            <Match match={user.tournament.get(3)} actualMatch={tournamentResult.get(3)}/>
                            <Match match={user.tournament.get(2)} actualMatch={tournamentResult.get(2)}/>
                            <Match match={user.tournament.get(7)} actualMatch={tournamentResult.get(7)}/>
                            <Match match={user.tournament.get(5)} actualMatch={tournamentResult.get(5)}/>
                            <Match match={user.tournament.get(4)} actualMatch={tournamentResult.get(4)}/>
                            <Match match={user.tournament.get(6)} actualMatch={tournamentResult.get(6)}/>
                            <Match match={user.tournament.get(8)} actualMatch={tournamentResult.get(8)} last={true}/>
                        </div>
                    </div>
                    <div className="tournament scroll-to-element">
                        <div className="tournament-round">
                            <div className="tournament-round-header-content">
                                <img src="img/trophy.png"/><h1>QUARTER FINAL</h1>
                            </div>
                            <Match match={user.tournament.get(9)} actualMatch={tournamentResult.get(9)}/>
                            <Match match={user.tournament.get(10)} actualMatch={tournamentResult.get(10)}/>
                            <Match match={user.tournament.get(11)} actualMatch={tournamentResult.get(11)}/>
                            <Match match={user.tournament.get(12)} actualMatch={tournamentResult.get(12)} last={true}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;