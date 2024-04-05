import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import authReducer from './reducers/authReducer';
import persistConfig from './persistConfig';

const rootReducer = combineReducers({
  auth: authReducer,
});

export default persistReducer(persistConfig, rootReducer);
