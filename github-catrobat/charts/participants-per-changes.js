"use strict";

import snutils from "snutils";
import utils from "../data-generator/utils";
import github from "../data-generator/github";

const repo = github.Users.$Catrobat.Repositories.$Catroid;

let participants = new Map();
let ignoreEvents = new Set([
    'subscribed', 'base_ref_changed', 'head_ref_deleted', 'head_ref_restored', 'unsubscribed', 'mentioned'
]);
for (let pull of repo.PullRequests) {
    let p = new Set();
    p.add(pull.User.login);

    for (let comment of pull.Comments) {
        let commentter = comment.User.login;
        if (commentter === utils.JENKINS) continue;
        p.add(commentter);
    }

    for (let event of pull.Events) {
        let commentter = event.User.login;
        if (commentter === utils.JENKINS || ignoreEvents.has(event.event)) continue;
        p.add(commentter);
    }
    participants.set(pull.number, {participants: p.size, merged: pull.merged});
}
let data = snutils.map.mergeObjects(participants, utils.getAllChanges(repo.PullRequests));

snutils.io.writeJsonSync('./data/participants-per-changes.json', [...data.values()]);
