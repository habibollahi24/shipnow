import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit'
import todosReducer from "./features/todos/todos-slice"


//
import {
  persistStore, persistReducer, FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web


const rootReducer = combineReducers({
  todos: todosReducer
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ["todos"]
}

const persistedReducer = persistReducer(persistConfig, rootReducer)




const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),

})


const persistor = persistStore(store)







// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export { store, persistor }