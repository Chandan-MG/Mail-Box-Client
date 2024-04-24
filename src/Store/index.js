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



const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
    }
})

export const authActions = authSlice.actions;

export default store;