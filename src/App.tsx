import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DogBreeds } from './components/DogBreeds';
import { BrowserRouter, Route, Routes } from "react-router";
import { DogBreed } from './components/DogBreed';

const queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: Infinity } } });

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DogBreeds />} />
          <Route path="/:id" element={<DogBreed />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App
