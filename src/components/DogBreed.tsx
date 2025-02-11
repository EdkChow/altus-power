import { Link } from "react-router";
import { useDogBreed } from "../hooks/useDogBreed";

export const DogBreed = () => {
  const {
    data: dogBreedDetails,
    isError,
    isPending,
  } = useDogBreed();

  if (isPending) return <div>loading...</div>;

  if (isError) return <div>error</div>;

  const {
    attributes: {
      name,
      description,
      hypoallergenic,
      female_weight,
      male_weight,
      life,
    },
  } = dogBreedDetails;
  
  return (
    <div>
      <Link to="/">{`< back`}</Link>
      <h1>{name}</h1>
      <p>{description}</p>
      <p>hypoallergenic: {hypoallergenic ? 'true' : 'false'}</p>
      <p>female weight: {female_weight.min}lbs - {female_weight.max}lbs</p>
      <p>male weight: {male_weight.min}lbs - {male_weight.max}lbs</p>
      <p>life: {life.min} - {life.max} years</p>
    </div>
  );
};
