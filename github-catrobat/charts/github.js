"use strict";

import {githubData, githubCache, githubApi} from "github-api";
import config from "./config";

export default githubData(githubCache(githubApi({
    apiUrl: config.github.apiUrl,
    user: config.github.user,
    pass: config.github.pass,
    sync: true
}), {
    cacheFolder: config.cache.folder
}), ['Catrobat']);