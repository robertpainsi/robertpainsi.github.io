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

export const switzerland = new Nation('Schweiz', 'Switzerland.png');
export const poland = new Nation('Polen', 'Poland.png');
export const wales = new Nation('Wales', 'Wales.png');
export const northernIreland = new Nation('Nordirland', 'NorthernIreland.png');
export const croatia = new Nation('Kroatien', 'Croatia.png');
export const portugal = new Nation('Portugal', 'Portugal.png');
export const france = new Nation('Frankreich', 'France.png');
export const ireland = new Nation('Irland', 'Ireland.png');
export const germany = new Nation('Deutschland', 'Germany.png');
export const slovakia = new Nation('Slovakei', 'Slovakia.png');
export const hungary = new Nation('Ungarn', 'Hungary.png');
export const belgium = new Nation('Belgien', 'Belgium.png');
export const italy = new Nation('Italien', 'Italy.png');
export const spain = new Nation('Spanien', 'Spain.png');
export const england = new Nation('England', 'England.png');
export const iceland = new Nation('Island', 'Iceland.png');
export const unknown = new Nation('Unknown', 'Antarctica.png');