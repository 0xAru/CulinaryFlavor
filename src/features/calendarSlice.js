import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    value: []
}

const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        addEvent: (state, action) => {
            state.value.push(action.payload);
        },

        removeEvent: (state, action) => {
            state.value = state.value.filter(event => event.id !== action.payload); // Supprime l'événement par ID
        },

        updateEvent: (state, action) => {
            const index = state.value.findIndex(event => event.id === action.payload.id);
            if (index !== -1) {
                state.value[index] = { ...state.value[index], ...action.payload }; // Met à jour l'événement
            }
        }
    },
})
export const { addEvent, removeEvent, updateEvent } = calendarSlice.actions;
export default calendarSlice.reducer;