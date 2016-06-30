'use strict';

import Tournament from "./tournament";
import {
    belgium,
    croatia,
    england,
    france,
    germany,
    hungary,
    iceland,
    ireland,
    italy,
    northernIreland,
    poland,
    portugal,
    slovakia,
    spain,
    switzerland,
    wales
} from "./nation";

const result = new Tournament();

result.setScore(switzerland, 5, poland, 6);
result.setScore(wales, 1, northernIreland, 0);
result.setScore(croatia, 0, portugal, 1);
result.setScore(france, 2, ireland, 1);
result.setScore(germany, 3, slovakia, 0);
result.setScore(hungary, 0, belgium, 4);
result.setScore(italy, 2, spain, 0);
result.setScore(england, 1, iceland, 2);

result.setScore(poland, 4, portugal, 6);
// result.setScore(wales, 0, belgium, 0);
// result.setScore(germany, 0, italy, 0);
// result.setScore(france, 0, iceland, 0);

export default result;