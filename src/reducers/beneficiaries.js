// reducers/beneficiaries.js
import { createSlice } from '@reduxjs/toolkit';

const beneficiariesSlice = createSlice({
  name: 'beneficiaries',
  initialState: {
    beneficiaries: []
  },
  reducers: {
    addBeneficiary(state, action) {
      state.beneficiaries.push({ id: Date.now(), ...action.payload });
    },
    editBeneficiary: (state, action) => {
      const { index, newData } = action.payload;
      if (index !== -1) {
        state.beneficiaries[index] = { ...state.beneficiaries[index], ...newData };
      }
    },
    removeBeneficiary(state, action) {
      const id = action.payload;
      state.beneficiaries = state.beneficiaries.filter(b => b.id !== id);
    },
  },
});

export const { addBeneficiary, editBeneficiary, removeBeneficiary } = beneficiariesSlice.actions;

export default beneficiariesSlice.reducer;
