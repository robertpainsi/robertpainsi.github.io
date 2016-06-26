'use strict';

class Hash {
    constructor() {
        this._name = '';
    }

    set name(name) {
        this._name = name;
    }

    set tournament(tournament) {
        this._tournament = tournament;
    }

    update() {
        location.hash = '#' + this._name + '/' + this._tournament.toHash();
    }
}

export default new Hash();