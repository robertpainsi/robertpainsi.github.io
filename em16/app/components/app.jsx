'use strict';

import React from "react";
import User from "./user.jsx";
import Match from "./match.jsx";

import tournamentResult from "../tournamentResult";
import parser from "../parser";
import user from "../user";

class App extends React.Component {
    componentWillMount() {
        parser.parseHash(this.props.location.hash);
    }

    render() {
        return (
            <div className="app">
                <div className="app-header">
                    <User/>
                </div>
                <div className="app-content">
                    <Match match={user.tournament.get(1)} actualMatch={tournamentResult.get(1)}/>
                    <Match match={user.tournament.get(2)} actualMatch={tournamentResult.get(2)}/>
                    <Match match={user.tournament.get(3)} actualMatch={tournamentResult.get(3)}/>
                    <Match match={user.tournament.get(4)} actualMatch={tournamentResult.get(4)}/>
                    <Match match={user.tournament.get(5)} actualMatch={tournamentResult.get(5)}/>
                    <Match match={user.tournament.get(6)} actualMatch={tournamentResult.get(6)}/>
                    <Match match={user.tournament.get(7)} actualMatch={tournamentResult.get(7)}/>
                    <Match match={user.tournament.get(8)} actualMatch={tournamentResult.get(8)}/>
                </div>
            </div>
        );
    }
}

export default App;