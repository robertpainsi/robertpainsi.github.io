'use strict';

import hash from "./hash";

class User {
    constructor() {
        this._name = '';
        hash.user = this;
    }

    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name;
        hash.update();
    }

    get tournament() {
        return this._tournament;
    }

    set tournament(tournament) {
        this._tournament = tournament;
        hash.update();
    }

    set(name, tournament) {
        this._name = name;
        this._tournament = tournament;
        hash.update();
    }
}

export default new User();