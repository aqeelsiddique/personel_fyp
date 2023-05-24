// Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../api';
const teamSlice = createSlice({
  name: 'teams',
  initialState: {
    error: '',
    loading: false,
    data: [],
    currentTeam: 0,
    currentRound: 0,
    totalRounds: 0,
    totalTeams: 0,
    roundSelected: '',
    selectedSubject: '',
  },

  reducers: {
    setCurrentTeam: (state, action) => {
      return { ...state, currentTeam: action.payload };
    },
    setCurrentRound: (state, action) => {
      return { ...state, currentRound: action.payload };
    },
    setTotalRounds: (state, action) => {
      return { ...state, totalRounds: action.payload };
    },
    setTeamScore: (state, action) => {
      console.log('Action: ', action.payload);
      console.log('Current State: ', state.data);
      return {
        ...state,
        data: state.data.map((team) => {
          console.log('Team: ', team.teamname);
          if (
            team.teamname.trim().toLowerCase() ===
            action?.payload?.name.trim().toLowerCase()
          ) {
            return { ...team, score: action?.payload?.score };
          } else return team;
        }),
      };
    },
    setRoundSelected: (state, action) => {
      return { ...state, roundSelected: action.payload };
    },
    setSubject: (state, action) => {
      return { ...state, selectedSubject: action.payload };
    },
  },
  // adding cases for handling state life cycle of promise returned by thunk
  extraReducers: (builder) => {
    builder.addCase(fetchTeams.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(fetchTeams.fulfilled, (state, action) => {
      return {
        ...state,
        data: action.payload.data.map((item) => {
          return { ...item, score: 0 };
        }),
        totalTeams: action.payload.data.length,
        loading: false,
      };
    });
    builder.addCase(fetchTeams.rejected, (state, action) => {
      return { ...state, error: action.payload, loading: false };
    });
  },
});

export const {
  setCurrentRound,
  setCurrentTeam,
  setTotalRounds,
  setTeamScore,
  setRoundSelected,
  setSubject,
} = teamSlice.actions;
export default teamSlice.reducer;

// Thunks Here
export const fetchTeams = createAsyncThunk(
  'teams/fetch',
  async (data, { rejectWithValue }) => {
    try {
      return await axios.get(`/selectteams?round=${data}`);
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
