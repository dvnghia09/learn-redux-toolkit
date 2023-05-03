import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const todoSlice = createSlice({
    name: 'todoList',
    initialState : { status: 'idle', todos: [] },
    reducers: {
        addTodo: (state, action) => {
            state.push(action.payload)
        },
        updateStatue: (state , action) => {
            const correntTodo = state.find(todo => todo.id === action.payload)
            if (correntTodo) {
                correntTodo.completed = !correntTodo.completed
            }
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchTodos.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.todos = action.payload;
                state.status = 'idle';
            })
    }
})

export const fetchTodos = createAsyncThunk('todo/fetachTodos', async () => {
    const res = await axios.get('http://127.0.0.1:8000/api/todo-redux');
    return res.data
})

export const addNewTodo = createAsyncThunk('todo/addNewTodo', async (newTodo, dispatch) => {
    const res = await axios.post('http://127.0.0.1:8000/api/todo-store', newTodo)
    dispatch.dispatch(fetchTodos())
    return res.data
})

export const updateTodo = createAsyncThunk('todo/updateTodo', async (data, dispatch) => {
    const res = await axios.put('http://127.0.0.1:8000/api/todo-update/' + data.id, {
        completed: data.completed,
    })
    console.log('ok')
    dispatch.dispatch(fetchTodos())
    return res.data
})

export default todoSlice;