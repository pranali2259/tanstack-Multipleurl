import React, { useState,useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

const URL = 'http://localhost:5000/list';

function Todo() {
    const queryClient = useQueryClient();
    const [newTodoTitle, setNewTodoTitle] = useState('');

    const { data: todos, isLoading } = useQuery<Todo[]>({
        queryKey: ['todos'],
        queryFn: async () => {
            const res = await fetch(URL);
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        },
    });

    const addTodoMutation = useMutation({
        mutationFn: (newTodo: { title: string; completed: boolean }) => {
            return fetch(URL, {
                method: 'POST',
                body: JSON.stringify(newTodo),
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then((res) => res.json());
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey:['todos']});
        },
    });

    const updateTodoMutation = useMutation({
        mutationFn: (updatedTodo: Todo) => {
            return fetch(`${URL}/${updatedTodo.id}`, {
                method: 'PUT',
                body: JSON.stringify(updatedTodo),
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then((res) => res.json());
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey:['todos']});
        },
    });

    const deleteTodoMutation = useMutation({
        mutationFn: (todoId: number) => {
            return fetch(`${URL}/${todoId}`, {
                method: 'DELETE',
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:['todos']});
        },
    });

    const handleAddTodo = () => {
        if (!newTodoTitle) return;

        addTodoMutation.mutate({ title: newTodoTitle, completed: false });
        setNewTodoTitle('');
    };

    const handleUpdateTodo = (todo: Todo) => {
        const updatedTodo = { ...todo, completed: !todo.completed };
        updateTodoMutation.mutate(updatedTodo);
    };

    const handleDeleteTodo = (todoId: number) => {
        deleteTodoMutation.mutate(todoId);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

   
    return (
        <main className='flex flex-col items-center justify-between p-4'>
            <h1 style={{ color: 'blue' }}>Todos</h1>
            <input
                type="text"
                value={newTodoTitle}
                onChange={(e) => setNewTodoTitle(e.target.value)}
                placeholder="Add new todo"
            />
            <button onClick={handleAddTodo}>Add Todo</button>
            <div>
                {todos?.map((todo) => (
                    <div key={todo.id} className="flex justify-between items-center">
                        <h2
                            onClick={() => handleUpdateTodo(todo)}
                            style={{
                                textDecoration: todo.completed ? 'line-through' : 'none',
                                cursor: 'pointer',
                            }}
                        >
                            {todo.title}
                        </h2>
                        <button onClick={() => handleDeleteTodo(todo.id)}>Remove</button>
                    </div>
                ))}
            </div>
        </main>
    );
}

export default Todo;
