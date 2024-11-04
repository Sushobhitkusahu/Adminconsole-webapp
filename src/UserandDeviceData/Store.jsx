import { configureStore, createSlice } from '@reduxjs/toolkit';

// slice for managing device data
const deviceSlice = createSlice({
    name: 'device',
    initialState: {
        deviceData: null,
        loading: false,
        error: null,
        editData: {},
        isEditing: false,
        macadd: null,
        model: null,
        serialNo: null,
    },
    reducers: {
        setDeviceData: (state, action) => {
            state.deviceData = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setErr: (state, action) => {
            state.error = action.payload;
        },
        setEditData: (state, action) => {
            state.editData = action.payload;
        },
        setmacadd: (state, action) => {
            state.macadd = action.payload
        },
        setModel: (state, action) => {
            state.model = action.payload
        },
        setSerialNo: (state, action) => {
            state.serialNo = action.payload
        },
        toggleEditing: (state) => {
            state.isEditing = !state.isEditing;
        },
    },
});

//  slice for managing user data
const userSlice = createSlice({
    name: 'user',
    initialState: {
        phoneNumber: '',
        userData: null,
        macAddresses: {},
        err: null,
        Loading: false,
        userEditing: false,
        macEditing: {},
    },
    reducers: {
        setPhoneNumber: (state, action) => {
            state.phoneNumber = action.payload;
        },
        setUserData: (state, action) => {
            state.userData = action.payload;
        },
        setMacAddresses: (state, action) => {
            state.macAddresses = action.payload;
        },
        seterror: (state, action) => {
            state.err = action.payload;
        },
        setloadingg: (state, action) => {
            state.Loading = action.payload;
        },
        setUserEditing: (state, action) => {
            state.userEditing = action.payload;
        },
        setMacEditing: (state, action) => {
            state.macEditing = action.payload;
        },
        handleMacEditt: (state, action) => {
            const { mac } = action.payload;
            state.macEditing[mac] = !state.macEditing[mac];
        },
        updateUserData: (state, action) => {
            const { key, value } = action.payload;
            state.userData = { ...state.userData, [key]: value };
        },
        updateMacAddresses: (state, action) => {
            const { mac, key, value } = action.payload;
            state.macAddresses = {
                ...state.macAddresses,
                [mac]: { ...state.macAddresses[mac], [key]: value },
            };
        },
    },
});
//slice for orders data fetch only.
const orderSlice = createSlice({
    name: 'orders',
    initialState: {
        orders: {},
    },
    reducers: {
        setOrders: (state, action) => {
            state.orders = action.payload;
        },
    },
});
export const {
    setOrders,
} = orderSlice.actions;

// Export device actions to use in the component
export const {
    setDeviceData,
    setLoading,
    setErr,
    setEditData,
    setmacadd,
    setModel,
    setSerialNo,
    toggleEditing,
} = deviceSlice.actions;

// Export user actions to use in the component
export const {
    setPhoneNumber,
    setUserData,
    setMacAddresses,

    seterror,

    setloadingg,
    setUserEditing,
    setMacEditing,
    handleMacEditt,
    updateUserData,
    updateMacAddresses,
} = userSlice.actions;

// Create a store with both the user and device slices
const store = configureStore({
    reducer: {
        device: deviceSlice.reducer,
        user: userSlice.reducer,
        orders: orderSlice.reducer,
    },
});

export default store;
