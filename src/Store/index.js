import {createSlice, configureStore} from '@reduxjs/toolkit';

const initialAuthState = {
    token: localStorage.getItem('token') || '',
    isLoggedIn: localStorage.getItem('isLoggedIn')==='true'
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        login(state, action){
            state.token = action.payload.token;
            state.isLoggedIn = true;
            localStorage.setItem('token',action.payload.token);
            localStorage.setItem('isLoggedIn','true');
        },
        logout(state){
            state.token = '';
            state.isLoggedIn = false;
            localStorage.removeItem("token");
            localStorage.removeItem( "isLoggedIn");
        },
        toggleMode(state){
            state.isLoggedIn = !state.isLoggedIn;
        }
    }
});

const initialInBoxState = {
    inboxCount: null,
    selectedItem: null
}

const inboxSlice = createSlice({
    name: 'inbox',
    initialState: initialInBoxState,
    reducers: {
        inBoxCount(state, action){
            state.inboxCount = action.payload;
        },
        InBoxItem(state, action) {
            state.selectedItem= action.payload;
            // console.log(action.payload);
        }
    }
});



const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        inbox: inboxSlice.reducer
    }
})

export const authActions = authSlice.actions;
export const inboxActions = inboxSlice.actions;

export default store;