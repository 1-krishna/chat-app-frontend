import { combineReducers } from 'redux';
import messagesReducer from './messages/messages.reducer';
import detailsReducer from './details/details.reducer';
//import { persistReducer } from 'redux-persist';
//import storage from 'redux-persist/lib/storage';

// const persistConfig = {
//     key: 'root',
//     storage,
//     whitelist: ['cart']
// }

const rootReducer = combineReducers({
    messages: messagesReducer,
    details: detailsReducer
});

//export default persistReducer(persistConfig, rootReducer);

export default rootReducer;