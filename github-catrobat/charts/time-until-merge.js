"use strict";

import snutils from "snutils";
import utils from "../data-generator/utils";
import github from "../data-generator/github";

const {DAY} = snutils.time;

const repo = github.Users.$Catrobat.Repositories.$Catroid;
const pulls = repo.ClosedPullRequests;

let x = [...snutils.map.mergeObjects(
    utils.getAllDurations(pulls),
    utils.getAllChanges(pulls),
    new Map(pulls.map((pull) => [pull.number, {merged: pull.merged}])))
].map(function([number, {duration, changes, merged}]) {
    return {duration: duration / DAY, changes, merged};
});

snutils.io.writeJsonSync('./data/time-until-merge.json', x);
