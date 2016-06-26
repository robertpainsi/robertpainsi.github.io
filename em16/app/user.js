'use strict';

import userTournament from "./userTournament";
import hash from "./hash";

class User {
    constructor() {
        this._name = '';
        this._tournament = userTournament;
    }

    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name;
        hash.name = this._name;
    }

    get tournament() {
        return this._tournament;
    }
}

export default new User();