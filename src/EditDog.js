import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spinner, Alert } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

function EditDog({ match }) {
    // State variables to store the dog data, loading status, and error message
    const [dog, setDog] = useState({
        breed: '',
        size: '',
        hypoallergenic: false,
        about: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { id } = useParams(); // Get the dog ID from the URL params

    // Fetch dog data from the API when the component mounts or when the ID changes
    useEffect(() => {
        const fetchDog = async () => {
            try {
                const response = await axios.get(`https://6626ad71052332d55323a83f.mockapi.io/dog/${id}`)
                setDog(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching dog:', error);
                setError('An error occurred while fetching dog. Please try again later.');
                setLoading(false);
            }
        };

        fetchDog();
    }, [id]);

    // Function to handle changes in the input field
    const handleChange = (e) => {
        const { name, value } = e.target;
        setDog(prevDog => ({
            ...prevDog,
            [name]: value
        }));
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await axios.put(`https://6626ad71052332d55323a83f.mockapi.io/dog/${id}`, dog);
            alert('Dog updated successfully!');
        } catch (error) {
            console.error('Error updating dog:', error);
            setError('An error occurred while updating the dog. Please try again later.');
        }
    };

    // Render loading spinner while data is being fetched
    if (loading) {
        return <Spinner animation='border' />
    }

    // Render error message if there was an error fetching data
    if (error) {
        return <Alert variant='danger'>{error}</Alert>
    }

    // Render the form to edit the dog data
    return (
        <div className="container mt-4">
            <h1>Edit Dog</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="breed" className="form-label">Breed:</label>
                    <input
                        type="text"
                        name="breed"
                        id="breed"
                        className="form-control"
                        value={dog.breed}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="size" className="form-label">Size:</label>
                    <select
                        name="size"
                        id="size"
                        className="form-select"
                        value={dog.size}
                        onChange={handleChange}
                    >
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                        <option value="Large">Large</option>
                        <option value="X-Large">X-Large</option>
                    </select>
                </div>
                <div className="mb-3">
                    <div className="form-check">
                        <input
                            type="checkbox"
                            name="hypoallergenic"
                            id="hypoallergenic"
                            className="form-check-input"
                            checked={dog.hypoallergenic}
                            onChange={(e) => setDog(prevDog => ({ ...prevDog, hypoallergenic: e.target.checked }))}
                        />
                        <label htmlFor="hypoallergenic" className="form-check-label">Hypoallergenic</label>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="about" className="form-label">About:</label>
                    <textarea
                        name="about"
                        id="about"
                        className="form-control"
                        value={dog.about}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Update Dog</button>
                {/* Link to navigate back to the Dog List */}
                <Link to="/" className="btn btn-secondary ms-2">Back to Dog List</Link>
            </form>
        </div>
    );
}

export default EditDog;
