import { render, screen } from '@testing-library/react';
import { DogBreed } from './DogBreed';
import '@testing-library/jest-dom';
import { Breed } from '../hooks/useDogBreed';
import { useDogBreed as _useDogBreed } from '../hooks/useDogBreed';

const DOG_BREED_DETAILS: Partial<Breed> = {
  attributes: {
    name: 'dog name',
    description: 'dog description',
    hypoallergenic: true,
    female_weight: {
      max: 1,
      min: 0,
    },
    male_weight: {
      max: 1,
      min: 0,
    },
    life: {
      max: 1,
      min: 0,
    },
  },
};

jest.mock('../hooks/useDogBreed');

const useDogBreed = _useDogBreed as jest.Mock;

describe('DogBreed', () => {
  it('should display loading... if data is pending', () => {
    useDogBreed.mockReturnValue({
      data: undefined,
      isError: false,
      isPending: true,
    });

    render(<DogBreed />);

    expect(screen.getByText('loading...')).toBeInTheDocument();
  });

  it('should display error when api returns an error', () => {
    useDogBreed.mockReturnValue({
      data: undefined,
      isError: true,
      isPending: false,
    });
    
    render(<DogBreed />);

    expect(screen.getByText('error')).toBeInTheDocument();
  });

  it.each([
    'dog name',
    'dog description',
    'hypoallergenic: true',
    'female weight: 0lbs - 1lbs',
    'male weight: 0lbs - 1lbs',
    'life: 0 - 1 years',
  ])('should display dog breed details', (text) => {
    useDogBreed.mockReturnValue({
      data: DOG_BREED_DETAILS,
      isError: false,
      isPending: false,
    });
    
    render(<DogBreed />);

    expect(screen.getByText(text)).toBeInTheDocument();
  });
});
