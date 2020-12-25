import React, { FC } from 'react';

import CarCard from './CarCard';

type CardsProps = {
  cars: {
    _id: string;
    km: number;
    make: string;
    model: string;
    estimateDate: string;
    description: string;
    underMaintenance: boolean;
    image: string;
  }[];
};

const cardListStyles = {
  display: 'grid',
  gridGap: '20px',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))'
};

const CarCardList: FC<CardsProps> = ({cars}) => {
  return (
    <div style={cardListStyles}>
      {cars.map(car => (
        <CarCard
          key={car._id}
          _id={car._id}
          km={car.km}
          make={car.make}
          model={car.model}
          estimateDate={car.estimateDate}
          description={car.description}
          underMaintenance={car.underMaintenance}
          image={car.image}
        />
      ))}
    </div>
  );
};

export default CarCardList;