import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spinner, Alert, ListGroup, Button } from 'react-bootstrap';
import DeleteDog from './DeleteDog';
import { Link } from 'react-router-dom';


function DogList() {
    // State variables to store the list of dogs, loading status, and error message
    const [dogs, setDogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Function to fetch the list of dogs from the API
    useEffect(() => {
        const fetchDogs = async () => {
            try {
                const response = await axios.get('https://6626ad71052332d55323a83f.mockapi.io/dog');
                setDogs(response.data);
            } catch (error) {
                console.error('Error fetching dogs:', error);
                setError('An error occurred while fetching dogs. Please try again later.');
            } finally {
                setLoading(false); // Set loading to false after fetching data
            }
        }

        fetchDogs(); // Call the fetchDogs function when the component mounts
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://6626ad71052332d55323a83f.mockapi.io/dog/${id}`);
            setDogs(dogs.filter(dog => dog.id !== id)); // Remove the deleted dog from the list
            alert('Dog deleted successfully!');
        } catch (error) {
            console.error('Error deleting dog:', error);
        }
    };

    // Render loading spinner while data is being fetched
    if (loading) {
        return <Spinner animation="border" />
    }

    // Render error message if there was an error fetching data
    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

    // Render the list of dogs
    return (
        <div className='container mt-4'>
            <h1 className='mb-4'>List of Dogs</h1>
            {/* Link to AddDog page */}
            <Link to="/add" className='btn btn-primary mb-3'>Add Dog</Link> {/* Link to AddDog */}

            {/* Render list of dogs */}
            <ListGroup>
                {dogs.map(dog => (
                    <ListGroup.Item key={dog.id} className='mb-3'>
                        <h3>{dog.breed}</h3>
                        <p><strong>Size:</strong> {dog.size}</p>
                        <p><strong>Hypoallergenic:</strong> {dog.hypoallergenic ? 'Yes' : 'No'}</p>
                        <p><strong>About:</strong> {dog.about}</p>
                        <div className='mt-2'>
                            {/* Link to EditDog page */}
                            <Link to={`/edit/${dog.id}`} className='btn btn-info mr-2'>Edit</Link>
                            {/* Button to delete the dog */}
                            <div className="d-inline-block">
                                <Button variant="danger" onClick={() => handleDelete(dog.id)}>Delete</Button>
                            </div>
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
}

export default DogList;