import {configureStore} from '@reduxjs/toolkit'
import cryptoAppSlice from './cryptoAppSlice'

export default configureStore({
    reducer: {
        crypto: cryptoAppSlice
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})