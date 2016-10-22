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
    let remainingMerges = 0;
    let remainingRejects = 0;
    pulls.filter((pr) => pr.Duration >= duration).forEach((pr) => {
        if (pr.merged) {
            remainingMerges++;
        } else {
            remainingRejects++;
        }
    });
    map.set(duration, {
        duration: duration / DAY,
        mergeProbability: remainingMerges / (remainingMerges + remainingRejects)
    })
}

snutils.io.writeJsonSync('./data/merged-after-probability.json', [...map.values()]);
