import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import authReducer from './slice/auth.slice';
import { userPersist } from 'src/utils/persistConfig';
const rootReducer = combineReducers({
  auth: persistReducer(userPersist, authReducer),
});

export default rootReducer;
