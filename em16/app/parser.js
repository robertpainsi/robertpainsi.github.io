'use strict';

import {normalizeHash} from "./utils";
import user from "./user";

class Parser {
    constructor() {
    }

    parseHash(hash) {
        this._parseData(normalizeHash(hash));
    }

    _parseData(data) {
        if (data.indexOf('/') >= 0) {
            let splitData = data.split('/');

            user.name = splitData[0];
            this._parseTips(splitData[1]);

        }
    }

    _parseTips(tips) {
        if (tips.indexOf(';') === -1) return;

        tips.split(';').forEach(function (tip) {
            if (tip === '') return;
            let splitTip = tip.split('#');
            let splitScore = splitTip[1].split(':');

            let matchId = parseInt(splitTip[0], 10);
            let match = user.tournament.get(matchId);
            if (splitScore[0] >= 0) {
                match.firstScore = parseInt(splitScore[0], 10);
            }

            if (splitScore[1] >= 0) {
                match.secondScore = parseInt(splitScore[1], 10);
            }

        });
    }
}

export default new Parser();