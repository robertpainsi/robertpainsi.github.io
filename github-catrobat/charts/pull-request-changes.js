"use strict";

import snutils from "snutils";
import utils from "../data-generator/utils";
import github from "../data-generator/github";

const repo = github.Users.$Catrobat.Repositories.$Catroid;

let sorted = [...utils.getAllChanges(repo.PullRequests)].sort(function([number1, details1], [number2, details2]) {
    return snutils.collection.compareAscent(details1.changes, details2.changes);
}).map(([number, details]) => Object.assign({number}, details));

snutils.io.writeJsonSync('./data/pull-request-changes.json', sorted);