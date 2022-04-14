import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {carServices} from "../services";


export const parkGetAll = createAsyncThunk(
    'carConstructor/parkGetAll',
    async (_, {rejectWithValue}) => {
        try {
            return await carServices.getAllParks()
        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
)

export const parkCreate = createAsyncThunk(
    'carConstructor/parkCreate',
    async ({data}, {dispatch}) => {
        try {
            const newPark = await carServices.createPark(data)
            dispatch(addPark({data: newPark}))
        } catch (e) {
            console.log((e.message));
        }
    }
)


export const parkDelete = createAsyncThunk(
    'carConstructor/parkDelete',
    async ({id}, {dispatch}) => {
        try {
            await carServices.deleteParkByID(id);
            dispatch(deletePark({id}))
        } catch (e) {
            console.log(e.message)
        }
    }
)


export const carGetAll = createAsyncThunk(
    'carConstructor/carGetAll',
    async (_, {rejectWithValue}) => {
        try {
            return await carServices.getAll()
        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
)

export const carCreate = createAsyncThunk(
    'carConstructor/carCreate',
    async ({data}, {dispatch}) => {
        try {
            const newCar = await carServices.create(data)
            dispatch(addCar({data: newCar}))
        } catch (e) {
            console.log((e.message));
        }
    }
)

export const carDelete = createAsyncThunk(
    'carConstructor/carDelete',
    async ({id}, {dispatch}) => {
        try {
            await carServices.deleteByID(id);
            dispatch(deleteCar({id}))
        } catch (e) {
            console.log(e.message)
        }
    }
)

export const updateCarById = createAsyncThunk(
    'carConstructor/updateCarById',
    async ({id, car}, {dispatch}) => {
        const newCar = await carServices.updateById(id, car);
        dispatch(updateCar({car: newCar}))
        return {car: newCar}
    }
)

const carSlice = createSlice({
    name: 'carConstructor',
    initialState: {
        cars: [],
        status: null,
        error: null,
        carForUpdate: null,
        parks: []
    },

    reducers: {
        addCar: (state, action) => {
            state.cars.push(action.payload.data)
        },
        deleteCar: (state, action) => {
            state.cars = state.cars.filter(car => car.id !== action.payload.id)
        },
        carToUpdate: (state, action) => {
            state.carForUpdate = action.payload.park_cars
        },
        updateCar: (state, action) => {
            const carIndex = state.cars.findIndex(car => car.id === action.payload.car.id);
            state.cars[carIndex] = action.payload.car
            state.carForUpdate = null
        },

        addPark: (state, action) => {
            state.parks.push(action.payload.data)
        },
        deletePark: (state, action) => {
            state.parks = state.parks.filter(park => park.id !== action.payload.id)
        },

    },

    extraReducers: {
        [carGetAll.pending]: (state) => {
            state.status = 'pending'
            state.error = null
        },
        [carGetAll.fulfilled]: (state, action) => {
            state.cars = action.payload
        },
        [carGetAll.rejected]: (state, action) => {
            state.status = 'rejected'
            state.error = action.payload
        },

        // ==================================
        [parkGetAll.pending]: (state) => {
            state.status = 'pending'
            state.error = null
        },
        [parkGetAll.fulfilled]: (state, action) => {
            state.parks = action.payload
        },
        [parkGetAll.rejected]: (state, action) => {
            state.status = 'rejected'
            state.error = action.payload
        },

        // ==================================
    }
})

const carReducer = carSlice.reducer;
export const {addCar, deleteCar, deletePark, addPark} = carSlice.actions;
export const {carToUpdate, updateCar} = carSlice.actions;

export default carReducer
