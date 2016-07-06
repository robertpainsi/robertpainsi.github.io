'use strict';

import Tournament from "./tournament";
import {normalizeHash} from "./utils";

class Parser {
    constructor() {
    }

    parseHash(hash) {
        return this._parseData(normalizeHash(hash));
    }

    _parseData(data) {
        if (data.indexOf('/') >= 0) {
            let splitData = data.split('/');
            return {
                name: splitData[0],
                tournament: this._parseTips(splitData[1])
            };
        } else {
            return {
                name: '',
                tournament: new Tournament()
            };
        }
    }

    _parseTips(tips) {
        let tournament = new Tournament();
        tips.split(';').forEach(function (tip) {
            if (tip === '') return;
            let splitTip = tip.split('#');
            let splitScore = splitTip[1].split(':');

            let matchId = parseInt(splitTip[0], 10);
            let match = tournament.get(matchId);
            if (splitScore[0] >= 0) {
                match.firstScore = parseInt(splitScore[0], 10);
            }

            if (splitScore[1] >= 0) {
                match.secondScore = parseInt(splitScore[1], 10);
            }
        });
        return tournament;
    }
}

export default new Parser();