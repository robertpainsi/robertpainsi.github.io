import React from "react";
import Match from "./match.jsx";
import tournamentResult from "../tournamentResult";
import user from "../user";
import scrollTo from "../scrollTo";

class Tournament extends React.Component {
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
            <div className="tournament">
                <div className="tournament-round">
                    <div className="tournament-round-header-content">
                        <img src="img/trophy.png"/><h1>EIGHTH FINAL</h1>
                        <h5 className="bonus">0% BONUS</h5>
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
                <div className="tournament-round">
                    <div className="tournament-round-header-content">
                        <img src="img/trophy.png"/><h1>QUARTER FINAL</h1>
                        <h5 className="bonus">20% BONUS</h5>
                    </div>
                    <Match match={user.tournament.get(9)} actualMatch={tournamentResult.get(9)}/>
                    <Match match={user.tournament.get(10)} actualMatch={tournamentResult.get(10)}/>
                    <Match match={user.tournament.get(11)} actualMatch={tournamentResult.get(11)}/>
                    <Match match={user.tournament.get(12)} actualMatch={tournamentResult.get(12)} last={true}/>
                </div>
                <div className="tournament-round scroll-to-element">
                    <div className="tournament-round-header-content">
                        <img src="img/trophy.png"/><h1>SEMI FINAL</h1>
                        <h5 className="bonus">50% BONUS</h5>
                    </div>
                    <Match match={user.tournament.get(13)} actualMatch={tournamentResult.get(13)}/>
                    <Match match={user.tournament.get(14)} actualMatch={tournamentResult.get(14)} last={true}/>
                </div>
                <div className="tournament-round not-started">
                    <div className="tournament-round-header-content">
                        <img src="img/trophy.png"/><h1>PETITE FINAL</h1>
                        <h5 className="bonus">100% BONUS</h5>
                    </div>
                    <Match match={user.tournament.get(15)} actualMatch={tournamentResult.get(15)} last={true}/>
                </div>
                <div className="tournament-round not-started">
                    <div className="tournament-round-header-content">
                        <img src="img/trophy.png"/><h1>FINAL</h1>
                        <h5 className="bonus">100% BONUS</h5>
                    </div>
                    <Match match={user.tournament.get(16)} actualMatch={tournamentResult.get(16)} last={true}/>
                </div>
            </div>
        );
    }
}

export default Tournament;