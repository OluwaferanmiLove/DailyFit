const initialState = {
  workoutLevel: null,
  workoutGoal: {},
  age: null,
  gender: null,
  workoutTime: null,
  workoutNowGoal: null,
  workoutNowLevel: null,
  workoutNowTime: null,
  workoutNowIndex: null,
  workoutNowName: null,
  appLoading: true,
  onBoarded: false,
  setuped: false,
  darkMode: false,
  workoutData: null,
  statExpected: null,
  workoutNum: null,
  workoutMin: null,
  pushNotificationSwitch: false,
};

const SetupReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SKIP':
      return {
        ...state,
        workoutLevel: 'Beginner',
        workoutGoal: null,
        age: null,
        gender: null,
        workoutTime: null,
      };
    case 'SETUP':
      return {
        ...state,
        workoutGoal: action.payload.goal,
        workoutLevel: action.payload.level,
        age: action.payload.age,
        gender: action.payload.gender,
        workoutTime: action.payload.time,
      };
    case 'WORKOUT':
      return {
        ...state,
        workoutNowGoal: action.payload.goal,
        workoutNowLevel: action.payload.level,
        workoutNowTime: action.payload.time,
      };
    case 'ONBOARD':
      return {
        ...state,
        onBoarded: action.payload,
      };
    case 'SETUPED':
      return {
        ...state,
        setuped: true,
      };
    case 'APPLOADING':
      return {
        ...state,
        appLoading: false,
      };
    case 'WORKOUTDATA':
      return {
        ...state,
        workoutData: action.payload,
      };
    case 'STATDATA':
      return {
        ...state,
        statExpected: action.payload,
      };
    case 'WORKOUTNUM':
      return {
        ...state,
        workoutNum: action.payload,
      };
    case 'CUSTOMWORKOUT':
      return {
        ...state,
        workoutNowGoal: action.payload.goal,
        workoutNowIndex: action.payload.index,
        workoutNowName: action.payload.name,
        workoutNowLevel: action.payload.level,
        workoutNowTime: action.payload.time,
      };
    case 'COLORMODE':
      return {
        ...state,
        darkMode: action.payload,
      };
    case 'PUSHNOTIF':
      return {
        ...state,
        pushNotificationSwitch: action.payload,
      };
    // case 'WORKOUTMINUTE':
    //   return {
    //     ...state,
    //     darkMode: action.payload,
    //   };
    default:
      return state;
  }
};

export default SetupReducer;
