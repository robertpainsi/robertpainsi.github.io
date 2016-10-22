"use strict";

import snutils from "snutils";
import github from "../data-generator/github";

const repo = github.Users.$Catrobat.Repositories.$Catroid;

let commenters = new Map();
for (let pull of repo.PullRequests) {
    for (let comment of pull.Comments) {
        if (comment.body.toLowerCase() === 'retest this please'
            || comment.body.toLowerCase() === 'ok to test') continue;
        let user = comment.User.login;
        let c = commenters.get(user) || {comments: 0, issues: 0, reviews: 0};
        c.comments++;
        c.issues++;
        commenters.set(user, c);
    }
    for (let comment of pull.ReviewComments) {
        let user = comment.User.login;
        let c = commenters.get(user) || {comments: 0, issues: 0, reviews: 0};
        c.comments++;
        c.reviews++;
        commenters.set(user, c);
    }
}

let sortedCommenters = [...commenters].sort(function([_1, commentsInfo1], [_2, commentsInfo2]) {
    return snutils.collection.compareDescent(commentsInfo2.comments, commentsInfo1.comments);
}).map(function([user, commentsInfo]) {
    return {
        user,
        comments: commentsInfo.comments,
        issues: commentsInfo.issues,
        reviews: commentsInfo.reviews,
    }
});

snutils.io.writeJsonSync('./data/top-commenters.json', sortedCommenters);