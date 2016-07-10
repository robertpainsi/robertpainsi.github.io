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

result.setScore(switzerland, 4, poland, 5);
result.setScore(wales, 1, northernIreland, 0);
result.setScore(croatia, 0, portugal, 1);
result.setScore(france, 2, ireland, 1);
result.setScore(germany, 3, slovakia, 0);
result.setScore(hungary, 0, belgium, 4);
result.setScore(italy, 2, spain, 0);
result.setScore(england, 1, iceland, 2);

result.setScore(poland, 3, portugal, 5);
result.setScore(wales, 3, belgium, 1);
result.setScore(germany, 6, italy, 5);
result.setScore(france, 5, iceland, 2);

result.setScore(portugal, 2, wales, 0);
result.setScore(germany, 0, france, 2);

result.setScore(portugal, 1, france, 0);

export default result;