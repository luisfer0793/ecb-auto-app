import React, { FC } from 'react';

import { Form, Button } from 'react-bootstrap';

type FormProps = {
  ids: string[];
  addCarToMaintenanceHandler: (carId: string) => Promise<void>;
};

const StyledForm: FC<FormProps> = props => {
  let _id: string;
  return (
    <Form onSubmit={event => event.preventDefault()}>
      <Form.Group controlId="formBasicName">
        <Form.Label>Client Name</Form.Label>
        <Form.Control type="text" placeholder="Client Name" required/>
      </Form.Group>

      <Form.Group controlId="formBasicDate">
        <Form.Label>Delivery Date</Form.Label>
        <Form.Control type="date" placeholder="Delivery Date" required/>
      </Form.Group>

      <Form.Group controlId="formBasicCarId">
        <Form.Label>Car ID</Form.Label>
        <Form.Control as="select" onChange={(e) => _id = e.target.value} placeholder="--Select an ID--">
            <option value="--Select an ID--" disabled>--Select an ID--</option>
          {props.ids.map(id => (
            <option key={id} value={id}>{id}</option>
          ))}
        </Form.Control>
      </Form.Group>

      <Button 
        variant="primary"
        type="submit"
        
        onClick={() => props.addCarToMaintenanceHandler(_id)}
      >
        Add To Maintenance
      </Button>
    </Form>
  );
};

export default StyledForm;