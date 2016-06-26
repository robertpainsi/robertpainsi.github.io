'use strict';

class Nation {
    constructor(name, flag) {
        this._name = name;
        this._flag = flag;
    }

    get name() {
        return this._name;
    }

    get flag() {
        return this._flag;
    }

    toString() {
        return this.name;
    }
}

export const switzerland = new Nation('Schweiz', 'Switzerland-flag.png');
export const poland = new Nation('Polen', 'Poland-flag.png');
export const wales = new Nation('Wales', 'Wales.png');
export const northernIreland = new Nation('Nordirland', 'Northern-ireland.png');
export const croatia = new Nation('Kroatien', 'Croatian-flag.png');
export const portugal = new Nation('Portugal', 'Portugal-flag.png');
export const france = new Nation('Frankreich', 'France-flag.png');
export const ireland = new Nation('Irland', 'Ireland-flag.png');
export const germany = new Nation('Deutschland', 'Germany-flag.png');
export const slovakia = new Nation('Slovakei', 'Slovakia-flag.png');
export const hungary = new Nation('Ungarn', 'Hungary-flag.png');
export const belgium = new Nation('Belgien', 'Belgium-flag.png');
export const italy = new Nation('Italien', 'Italy-flag.png');
export const spain = new Nation('Spanien', 'Spain-flag.png');
export const england = new Nation('England', 'England-flag.png');
export const iceland = new Nation('Island', 'Iceland-flag.png');