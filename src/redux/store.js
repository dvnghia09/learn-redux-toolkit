

import { configureStore } from '@reduxjs/toolkit'
import filtersSlice from './filtersReducer'
import todoSlice from './todoReducer'

const store = configureStore({
    reducer: {
        filters: filtersSlice.reducer,
        todoList: todoSlice.reducer,
    }
})

export default store;