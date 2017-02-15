"use strict";

import snutils from "snutils";
import utils from "./utils";
import github from "./github";

const repo = github.Users.$Catrobat.Repositories.$Catroid;

let participants = new Map();
let ignoreEvents = new Set([
    'subscribed', 'base_ref_changed', 'head_ref_deleted', 'head_ref_restored', 'unsubscribed', 'mentioned'
]);
for (let pull of repo.PullRequests) {
    let p = new Set();
    p.add(pull.User.login);

    for (let comment of pull.Comments) {
        let commenter = comment.User.login;
        if (commenter === utils.JENKINS) continue;
        p.add(commenter);
    }

    for (let event of pull.Events) {
        let commenter = event.User.login;
        if (commenter === utils.JENKINS || ignoreEvents.has(event.event)) continue;
        p.add(commenter);
    }
    participants.set(pull.number, {number: pull.number, participants: p.size, merged: pull.merged});
}
let data = snutils.map.mergeObjects(participants, utils.getAllChanges(repo.PullRequests));

snutils.io.writeJsonSync('./output/participants-per-changes.json', [...data.values()]);
