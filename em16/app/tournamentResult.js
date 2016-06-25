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

export default result;