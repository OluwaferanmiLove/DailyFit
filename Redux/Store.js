import {createStore} from 'redux';
import SetupReducer from './Setup/SetupReducer';

const store = createStore(SetupReducer);

export default store;
