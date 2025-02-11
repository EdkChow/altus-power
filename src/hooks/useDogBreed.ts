import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

export type Breed = {
  id: string;
  type: string;
  attributes: {
    name: string;
    description: string;
    hypoallergenic: boolean;
    female_weight: {
      max: number;
      min: number;
    };
    life: {
      max: number;
      min: number;
    };
    male_weight: {
      max: number;
      min: number;
    };
  };
  relationships: {
    group: {
      data: {
        id: string;
        type: string;
      };
    };
  };
};

const fetchDogBreed = async (id?: string) => {
  if (!id) return;

  const response = await fetch(`https://dogapi.dog/api/v2/breeds/${id}`);
  const { data } = await response.json();
  return data;
};

export const useDogBreed = () => {
  const { id } = useParams();

  return useQuery<Breed>({
    queryKey: ['dog-breed', id],
    queryFn: () => fetchDogBreed(id),
    enabled: !!id,
  });
};
