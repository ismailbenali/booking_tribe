import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {searchFlights} from "../api";

/**
 * Helper for quickly resetting state
 */
const getInitialState = () => ({all: [], loading: false});

/**
 * search flights
 */
export const $search = createAsyncThunk('flights/search', async ({flyFrom, limit, sort, locale, to, dateFrom, dateTO, returnFrom, returnTo}) => {

    const flights = await searchFlights(flyFrom, limit, sort, locale, to, dateFrom, dateTO, returnFrom, returnTo)

    return flights.data
});

// flights Slice
const Flights = createSlice({
    name: 'flights',
    initialState: getInitialState(),
    reducers: {},
    extraReducers: {
        //search flights
        [$search.fulfilled]: (state, action) => {
            const stateUpdate = {...state};
            stateUpdate.all = [...action.payload, ...stateUpdate.all]
            stateUpdate.loading = false;
            return stateUpdate;
        },
        [$search.pending]: (state) => {
            const stateUpdate = {...state};
            stateUpdate.loading = true;
            return stateUpdate;
        },
    },
});

export const selectFlights = (state) => state.flights.all;
export const selectSearchFlightsLoading = (state) => state.flights.loading;

export default Flights.reducer;
