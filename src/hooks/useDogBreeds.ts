import { useQuery } from "@tanstack/react-query";

type Breeds = {
  id: string;
  type: string;
  attributes: {
    name: string;
    description: string;
    hypoallergenic: boolean;
  };
};

const fetchDogBreeds = async () => {
  const response = await fetch('https://dogapi.dog/api/v2/breeds');
  const { data } = await response.json();
  return data;
};

const useDogBreeds = <T = Array<Breeds>>(select?: (data: Array<Breeds>) => T) => {
  return useQuery({
    queryKey: ['dog-breeds'],
    queryFn: () => fetchDogBreeds(),
    select,
  });
};

export const useSearchDogBreedsNamesAndDescriptions = (search?: string) => {
  return useDogBreeds((data) => {
    const allBreeds = data.map(({ id, attributes: { name, description } }) => ({
      id,
      name,
      description,
    }));

    if (!search) return allBreeds;

    const searchResults = data.filter(({ attributes: { name } }) => {
      return name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    });

    if (!searchResults.length) return [];

    return searchResults.map(({ id, attributes: { name, description } }) => ({
      id,
      name,
      description,
    }));
  });
};
