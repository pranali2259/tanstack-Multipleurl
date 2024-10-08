import { useQuery } from '@tanstack/react-query';
import Data from './Data'

const fetchData = async (url:string):Promise<Data[]> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const useFetchData = (url:string, options = {}) => {
    return useQuery<Data[], Error>({
      queryKey: ['data', url],  
      queryFn: () => fetchData(url),  
      ...options,  
    });
  };

export default useFetchData;