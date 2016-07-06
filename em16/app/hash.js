'use strict';

class Hash {
    set user(user) {
        this._user = user;
    }

    update() {
        var name = this._user.name || '';
        var tournament = (this._user._tournament) ? this._user._tournament.toHash() : '';
        location.hash = '#' + name + '/' + tournament;
    }
}

export default new Hash();