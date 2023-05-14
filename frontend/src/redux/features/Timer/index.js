import { createSlice } from '@reduxjs/toolkit';
const timerSlice = createSlice({
  name: 'timer',
  initialState: {
    maxTime: 0,
  },

  reducers: {
    setTime: (state, action) => {
      return { ...state, maxTime: action.payload };
    },
  },
});
export const { setTime } = timerSlice.actions;
export default timerSlice.reducer;
