import { createSelector } from "@reduxjs/toolkit";

// export const todoListSelect = (state) => {
//     const newTodo = state.todoList.filter((item) => {
//         return item.name.includes(state.filters.search);
//     })
//     return newTodo;
// };

export const todoListSelect = (state) => state.todoList.todos;

export const getTextSearch = (state) => state.filters.search;

export const getStatusSearch = (state) => state.filters.status;

export const getPrioritySearch = (state) => state.filters.priority;

export const getTodo = createSelector(todoListSelect, getTextSearch, getStatusSearch, getPrioritySearch, (todoList, textSearch, status, priority) => {
    // const newTodo = todoList.filter((item) => {
    //     return item.name.includes(textSearch);
    // })

    if (status === 'All') {
        return todoList.filter((item) => {
            return priority.length ? item.name.includes(textSearch) && priority.includes(item.priority) : item.name.includes(textSearch);
        })
    } else {
        return todoList.filter((item) => {
            return item.name.includes(textSearch) && (status === 'Completed' ? item.completed : !item.completed ) && (priority.length ? priority.includes(item.priority) : true);
        })
    }
})