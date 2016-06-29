'use strict';

import React from "react";
import User from "./user.jsx";
import Match from "./match.jsx";
import tournamentResult from "../tournamentResult";
import parser from "../parser";
import user from "../user";
import scrollTo from "../scrollTo";

class App extends React.Component {
    componentWillMount() {
        parser.parseHash(this.props.location.hash);
    }

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
        return (
            <div className="app">
                <div className="app-header">
                    <div className="app-header-content">
                        <div style={{'display': 'inline-block', 'marginRight': '20px'}}>
                            <img src="img/em16.png"/>
                        </div>
                        <User/>
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
                                <img src="img/trophy.png"/><h1>FOURTH FINAL</h1>
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