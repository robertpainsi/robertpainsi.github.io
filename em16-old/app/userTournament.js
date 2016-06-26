'use strict';

import Tournament from "./tournament";
import hash from "./hash";

const userTournament = new Tournament();
hash.tournament = userTournament;

export default userTournament;