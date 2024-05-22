import { configureStore } from '@reduxjs/toolkit';
import beneficiariesReducer from './reducers/beneficiaries';

const store = configureStore({
  reducer: {
    beneficiaries: beneficiariesReducer,
  },
});

export default store;
