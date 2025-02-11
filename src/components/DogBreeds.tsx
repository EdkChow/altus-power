import { useState } from "react";
import { useSearchDogBreedsNamesAndDescriptions } from "../hooks/useDogBreeds";
import { Link } from "react-router";

export const DogBreeds = () => {
  const [search, setSearch] = useState('');

  const {
    data: dogBreeds,
    isError,
    isPending,
  } = useSearchDogBreedsNamesAndDescriptions(search);

  if (isPending) return <div>loading...</div>;

  if (isError) return <div>error</div>;

  return (
    <div>
      <h1>Dog Breeds</h1>
      <input
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name"
        type="text"
        value={search}
      />
      <ul>
        {dogBreeds.map(({ id, name, description }) => (
          <li key={id}>
            <Link to={`/${id}`}>
              <h2>{name}</h2>
            </Link>
            <p>{description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
