"use strict";

import snutils from "snutils";
import github from "../data-generator/github";

const {MINUTE, DAY} = snutils.time;

const repo = github.Users.$Catrobat.Repositories.$Catroid;

let pulls = repo.ClosedPullRequests.filter((pr) => pr.Duration >= 10 * MINUTE)
    .sort((pr1, pr2) => snutils.collection.compareDescent(pr1.Duration, pr2.Duration));

let map = new Map();
for (let pull of pulls) {
    let duration = pull.Duration;
    let all = 0;
    let merges = 0;
    let rejects = 0;
    pulls.filter((pr) => pr.Duration <= duration).forEach((pr) => {
        all++;
        if (pr.merged) {
            merges++;
        } else {
            rejects++;
        }
    });
    map.set(duration, {
        duration: duration / DAY,
        all: all / pulls.length,
        merges: merges / pulls.length,
        rejects: rejects / pulls.length
    })
}

snutils.io.writeJsonSync('./data/merged-after.json', [...map.values()]);
