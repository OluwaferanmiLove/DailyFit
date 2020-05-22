import {SKIP, SETUP} from './SetupType';

export const skip = () => {
  return {
    type: SKIP,
  };
};

export const setUp = (goal, level, age, gender, time) => {
  return {
    type: SETUP,
    payload: [goal, level, age, gender, time],
  };
};
