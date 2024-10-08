import React from 'react';
import useFetchData from './Fetch';

const TodoComponent = () => {
  const { data:todos, error:errorTodo, isLoading:isLoadingTodos } = useFetchData('https://jsonplaceholder.typicode.com/todos');
  const { data:users, error:errorUsers, isLoading:isLoadingUsers } = useFetchData('https://jsonplaceholder.typicode.com/users');
  if (isLoadingTodos ||isLoadingUsers ) return <div>Loading...</div>;
   

  return (
    <div className="p-4">
    <h1 className="text-2xl font-bold mb-4">Todos</h1>
    <ul className="list-disc pl-5 mb-8">
      {todos?.slice(0, 10).map(todo => (
        <li key={todo.id} className="text-lg mb-1">
          {todo.userId} - {todo.title}
        </li>
      ))}
    </ul>
  
    <h1 className="text-2xl font-bold mb-4">Users</h1>
    <table className="min-w-full border-collapse border border-gray-200">
      <thead className="bg-gray-100">
        <tr>
          <th className="border border-gray-300 px-4 py-2">Name</th>
          <th className="border border-gray-300 px-4 py-2">Email</th>
          <th className="border border-gray-300 px-4 py-2">Username</th>
          <th className="border border-gray-300 px-4 py-2">Website</th>
        </tr>
      </thead>
      <tbody>
        {users?.map(user => (
          <tr key={user.id} className="hover:bg-gray-50">
            <td className="border border-gray-300 px-4 py-2">{user.name}</td>
            <td className="border border-gray-300 px-4 py-2">{user.email}</td>
            <td className="border border-gray-300 px-4 py-2">{user.username}</td>
            <td className="border border-gray-300 px-4 py-2">{user.website}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
};

export default TodoComponent;