import React from 'react'
import Todo from './component/Todo'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();
const App = () => {
  return (
    <div>
     <QueryClientProvider client={queryClient}>
        <Todo/> 
  </QueryClientProvider>
    </div>
  )
}

export default App
