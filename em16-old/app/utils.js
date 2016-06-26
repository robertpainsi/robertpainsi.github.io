'use strict';

class Utils {
    static normalizeHash(hash) {
        if (hash.startsWith('#')) {
            return hash.substring(1);
        }
        return hash;
    };
}

export const normalizeHash = Utils.normalizeHash;

export default Utils;
