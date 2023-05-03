import { createSlice } from '@reduxjs/toolkit'

const filtersSlice = createSlice({
    name: 'filters',
    initialState: {
        search: '',
        status: 'All',
        priority: [],
    },
    reducers: {
        searchFilterChange: (state , action) => {
            state.search = action.payload
        },
        statusFilterChange: (state , action) => {
            state.status = action.payload
        },
        priorityFilterChange: (state , action) => {
            state.priority = action.payload
        }
    }
})

export default filtersSlice;