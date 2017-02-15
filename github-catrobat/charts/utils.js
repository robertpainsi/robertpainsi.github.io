"use strict";

export default {
    JENKINS: 'catrobatjenkins',
    createMapOfPullRequests: function(pullRequests) {
        let pulls = new Map();
        for (let pull of pullRequests) {
            pulls.set(pull.number, pull);
        }
        return pulls;
    },
    getAllChanges: function(pullRequests) {
        let changes = new Map();
        for (let pull of pullRequests) {
            changes.set(pull.number, {
                additions: pull.additions,
                deletions: pull.deletions,
                changes: pull.additions + pull.deletions
            });
        }
        return changes;
    },
    getAllDurations: function(pullRequests) {
        let durations = new Map();
        for (let pull of pullRequests) {
            durations.set(pull.number, {
                duration: pull.Duration
            });
        }
        return durations;
    }
}

// SHOULD BE MOVED OR ARE ALREADY LOCATED IN SNUTILS
/*
 export function mapPullRequests(pullRequests, key) {
 if (!isFunction(key)) {
 key = (pr) => pr[key];
 }
 let foo = new Map();
 for (let pr of pullRequests) {
 let k = key(pr);
 if (foo.has(k)) {
 foo.get(k).push(pr);
 } else {
 foo.set(k, [pr]);
 }
 }
 return foo;
 }

 export function sortMapByKey(map, keyFunc) {
 if (!keyFunc) {
 keyFunc = (k1, k2) => {
 return k1 - k2;
 }
 }
 return new Map([...map.entries()].sort((a, b) => {
 return keyFunc(a[0], b[0]);
 }));
 }

 export function foo(pulls, key) {
 return sortMapByKey(mapPullRequests(pulls.filter((pr) => pr.Duration >= 10 * MINUTE), key));
 }
 */
