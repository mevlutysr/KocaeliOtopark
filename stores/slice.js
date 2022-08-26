import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    AdSoyad: "",
    Telefon: "",
    Plaka: "",
    Email: "",
    Password: "",
    Latitude: "",
    Longitude: "",
    CarData: "",
    Loader: false,
    Id: "",
}

export const Slice = createSlice({
    name: 'Slice',
    initialState,
    reducers: {
        setAdSoyad: (state,action) => {
            state.AdSoyad = action.payload
        },
        setTelefon: (state,action) => {
            state.Telefon = action.payload
        },
        setPlaka: (state,action) => {
            state.Plaka = action.payload
        },
        setEmail: (state,action) => {
            state.Email = action.payload
        },
        setPassword: (state,action) => {
            state.Password = action.payload
        },
        setLatitude: (state,action) => {
            state.Latitude = action.payload
        },
        setLongitude: (state,action) => {
            state.Longitude = action.payload
        },
        setCarData: (state,action) => {
            state.CarData = action.payload
        },
        setLoader: (state,action) => {
            state.Loader = action.payload
        },
        setId: (state,action) => {
            state.Id = action.payload
        }        

    }
})
export const { setAdSoyad, setId, setCarData, setEmail, setLoader, setLatitude, setLongitude, setPlaka, setPassword, setTelefon } = Slice.actions
export default Slice.reducer