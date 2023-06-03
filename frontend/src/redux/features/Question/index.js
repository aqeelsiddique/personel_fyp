// Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../api';
const questionSlice = createSlice({
  name: 'questions',
  initialState: {
    error: '',
    loading: false,
    data: [],
    randomIndex: 0,
  },
  reducers: {},
  // adding cases for handling state life cycle of promise returned by thunk
  extraReducers: (builder) => {
    builder.addCase(fetchQuestion.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(fetchQuestion.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        randomIndex: Math.floor(
          Math.random() * (action.payload.data.length - 0) + 0
        ),
      };
    });
    builder.addCase(fetchQuestion.rejected, (state, action) => {
      console.log('Fetched Question Data:', action.payload.data); // Log the fetched data

      return { ...state, error: action.payload, loading: false };

    });
  },
});
export default questionSlice.reducer;

// Thunks Here
export const fetchQuestion = createAsyncThunk(
  'questions/fetch',
  async (data, { rejectWithValue }) => {
    try {
      return await axios.get(`/questions/${data}`);
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);




// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "../../../api";

// export const fetchQuestion = createAsyncThunk(
//   "questions/fetch",
//   async (data, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`/questions/${data}`);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error?.response?.data);
//     }
//   }
// );

// const questionSlice = createSlice({
//   name: "questions",
//   initialState: {
//     error: "",
//     loading: false,
//     data: [],
//     randomIndex: 0,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(fetchQuestion.pending, (state) => {
//       return { ...state, loading: true };
//     });
//     builder.addCase(fetchQuestion.fulfilled, (state, action) => {
//       return {
//         ...state,
//         loading: false,
//         data: action.payload,
//         randomIndex: Math.floor(Math.random() * action.payload.length),
//       };
//     });
//     builder.addCase(fetchQuestion.rejected, (state, action) => {
//       console.log("Fetched Question Data:", action.payload); 
//       // Log the fetched data
//       return { ...state, error: action.payload, loading: false };
//     });
//   },
// });

// export default questionSlice.reducer;
