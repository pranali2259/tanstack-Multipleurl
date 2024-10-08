 
import React from 'react'
 import List from './List'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();
const index = () => {
  return (
    <div>
       <div>
     <QueryClientProvider client={queryClient}>
        <List/> 
  </QueryClientProvider>
    </div>
    </div>
  )
}

export default index
