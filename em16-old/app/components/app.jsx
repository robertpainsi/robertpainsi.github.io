'use strict';

import React from "react";
import User from "./user.jsx";
import Match from "./match.jsx";
import parser from "../parser";
import user from "../user";

class App extends React.Component {
    componentWillMount() {
        parser.parseHash(this.props.location.hash);
    }

    render() {
        return (
            <div>
                <div align="center">
                    <User/>
                </div>
                <div className="tournament">
                    <div className="round">
                        <Match match={user.tournament.get(1)}/>
                        <Match match={user.tournament.get(2)}/>
                        <Match match={user.tournament.get(3)}/>
                        <Match match={user.tournament.get(4)}/>
                        <Match match={user.tournament.get(5)}/>
                        <Match match={user.tournament.get(6)}/>
                        <Match match={user.tournament.get(7)}/>
                        <Match match={user.tournament.get(8)}/>
                    </div>
                    <div className="round round-four">
                        <Match match={user.tournament.get(9)}/>
                        <div className="match invisible"></div>
                        <Match match={user.tournament.get(10)}/>
                        <div className="match invisible"></div>
                        <Match match={user.tournament.get(11)}/>
                        <div className="match invisible"></div>
                        <Match match={user.tournament.get(12)}/>
                    </div>
                    <div className="round round-half">
                        <Match match={user.tournament.get(13)}/>
                        <div className="match invisible"></div>
                        <div className="match invisible"></div>
                        <div className="match invisible"></div>
                        <Match match={user.tournament.get(14)}/>
                    </div>
                    <div className="round">
                        <Match match={user.tournament.get(15)}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;