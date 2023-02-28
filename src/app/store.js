import userReducer from '../reducers/userReducer'
import { configureStore } from '@reduxjs/toolkit'
import localforage from 'localforage'
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import { settingSlice } from '../reducers/settingReducer'
import { memberSlice } from '../reducers/memberReducer'
import { organizationSlice } from '../reducers/organizationReducer'
import { sequenceSlice } from '../reducers/sequenceReducer'
import { questionSlice } from '../reducers/questionReducer'
import { currentSequenceSlice } from '../reducers/currentSequenceReducer'
import { onboardingSlice } from '../reducers/onboardingReducer'

const appReducer = combineReducers({
  user: userReducer,
  setting: settingSlice.reducer,
  member: memberSlice.reducer,
  organization: organizationSlice.reducer,
  sequence: sequenceSlice.reducer,
  question: questionSlice.reducer,
  currentSequence: currentSequenceSlice.reducer,
  onboarding: onboardingSlice.reducer,
})

const rootReducer = (state, action) => {
  console.log('action', action)
  if (action.type === 'LOGOUT') {
    localforage.removeItem('persist:root')
    return appReducer(undefined, action)
  }
  return appReducer(state, action)
}

const persistConfig = {
  key: 'root',
  storage: localforage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
})

export default store
