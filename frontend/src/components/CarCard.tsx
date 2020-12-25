import React, { FC } from 'react';

import { Card } from 'react-bootstrap';

type CarCardProps = {
  _id: string;
  km: number,
  make: string;
  model: string;
  estimateDate: string;
  description: string;
  underMaintenance: boolean;
  image: string;
};

const CarCard: FC<CarCardProps> = ({
  _id,
  km,
  make,
  model,
  estimateDate,
  description,
  underMaintenance,
  image,
}) => {
  return (
    <Card className="text-center">
      {underMaintenance && <Card.Header as="h5" style={{backgroundColor: '#F8D7DA', color: '#ff4262'}}>Vehicle Under Maintenance</Card.Header>}
      <Card.Img variant="top" src={image} style={{height:'200px'}}/>
      <Card.Body className="d-flex flex-column justify-content-between">
        <Card.Title as="h4" className="my-3"><strong>{make}</strong></Card.Title>
        <Card.Subtitle as="h5" className="my-3 text-muted">{model}</Card.Subtitle>
        <Card.Text as="div" className="my-3">
          <strong>Car ID</strong>
          <br/>
          {_id}
        </Card.Text>
        <Card.Text as="div" className="my-3">
          <strong>Description</strong>
          <br/>
          {description}
        </Card.Text>
        <Card.Text as="div" className="my-3">
          <strong>Mileage</strong>
          <br/>
          {km}km
        </Card.Text>
        <Card.Text className="my-3">
          <strong>Delivery Date</strong>
          <br/>
          {estimateDate}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CarCard;