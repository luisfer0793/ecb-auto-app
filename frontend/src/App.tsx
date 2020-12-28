import React, { useState, useEffect } from 'react';

import { CarCardList, StyledModal } from './components';

import { Container, Spinner, Button } from 'react-bootstrap';

import './App.css';

interface Car {
  _id: string;
  km: number;
  make: string;
  model: string;
  estimateDate: string;
  description: string;
  underMaintenance: boolean;
  image: string;
}

function App() {
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchCars = async () => {
      setIsLoading(true);
      const response = await fetch('http://localhost:5000/');
      const data = await response.json();
      setCars(data.cars);
      setIsLoading(false);
    };

    fetchCars();
  }, []);

  const addCarToMaintenanceHandler = async (carId: string) => {
    try {
      const carToUpdate = cars.find(car => car._id === carId);
      const updatedCar = {
        ...carToUpdate,
        underMaintenance: true
      };
      let hasError = false;
      const response = await fetch(`http://localhost:5000/${updatedCar._id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedCar),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        hasError = true;
      }
      const responseData = await response.json();
      if (hasError) {
        throw new Error(responseData.message);
      }
      setCars(responseData.cars);
      setIsModalVisible(false);
    } catch (error) {
        alert(error.message || 'Something went wrong!');
    }
  };

  return (
    <>
      <Container>
        <h1 className="text-center my-5">Available Vehicles</h1>
        {isLoading 
          ? (
            <div className="d-flex justify-content-center align-items-center">
              <Spinner animation="border" variant="info" />
            </div> )
          : (
            <main>
              <CarCardList cars={cars} />
              <div className="my-5">
                <Button 
                  variant="success"
                  onClick={() => setIsModalVisible(true)}
                  block
                >
                  Pick a Car
                </Button>
              </div>
            </main>
        )}
      </Container>
      <StyledModal
        cars={cars}
        show={isModalVisible}
        onHide={setIsModalVisible}
        addCarToMaintenanceHandler={addCarToMaintenanceHandler}
      />
    </>
  );
}

export default App;
