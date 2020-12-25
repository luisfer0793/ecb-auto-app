import React, { FC, Dispatch, SetStateAction } from 'react';

import StyledForm from './StyledForm';
import { Modal } from 'react-bootstrap';

type ModalProps = {
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
  show: boolean;
  onHide: Dispatch<SetStateAction<boolean>>;
  addCarToMaintenanceHandler: (carId: string) => Promise<void>;
};

const StyledModal: FC<ModalProps> = (props) => {
  const ids = props.cars
    .filter(car => !car.underMaintenance)
    .map(car => car._id);
  return (
    <Modal
      show={props.show}
      onHide={() => props.onHide(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Information Required
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>In order for us to send the car for maintenance we need the following information.</p>
        <StyledForm 
          ids={ids}
          addCarToMaintenanceHandler={props.addCarToMaintenanceHandler}
        />
      </Modal.Body>
    </Modal>
  );
};

export default StyledModal;