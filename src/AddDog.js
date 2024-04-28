import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function AddDog() {
    // State variables for form inputs and error handling
    const [breed, setBreed] = useState('');
    const [size, setSize] = useState('');
    const [hypoallergenic, setHypoallergenic] = useState(false);
    const [about, setAbout] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        setError(''); // Clear any previous errors
        try {
            // Validate breed and size inputs
            if (!breed.trim() || !size.trim()) {
                setError('Please provide both breed and size.');
                return;
            }
            // Send POST request to add a new dog
            await axios.post('https://6626ad71052332d55323a83f.mockapi.io/dog', {
                breed,
                size,
                hypoallergenic,
                about
            });
            setSuccess(true); // Set success message
            //setName('');
        } catch (error) {
            console.error('Error adding dog:', error);
            setError('An error occured while adding the dog. Please try again later.');
        }
    };

    return (
        <div className='container mt-4'>
            <h1>Add Dog</h1>
            {/* Dog form */}
            <form onSubmit={handleSubmit}>
                {/* Breed input */}
                <div className='mb-3'>
                    <label htmlFor="breed" className='form-label'>Breed:</label>
                    <input type="text" id="breed" className='form-control' value={breed} onChange={(e) => setBreed(e.target.value)} />
                </div>
                {/* Size dropdown */}
                <div className='mb-3'>
                    <label htmlFor="size" className='form-label'>Size:</label>
                    <select id="size" className='form-select' value={size} onChange={(e) => setSize(e.target.value)}>
                        <option value="">Select Size</option>
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                        <option value="Large">Large</option>
                        <option value="X-Large">X-Large</option>
                    </select>
                </div>
                {/* Hypoallergenic checkbox */}
                <div className="mb-3">
                    <div className="form-check">
                        <input type="checkbox" id="hypoallergenic" className="form-check-input" checked={hypoallergenic} onChange={(e) => setHypoallergenic(e.target.checked)} />
                        <label htmlFor="hypoallergenic" className="form-check-label">Hypoallergenic</label>
                    </div>
                </div>
                {/* About textarea */}
                <div className="mb-3">
                    <label htmlFor="about" className="form-label">About:</label>
                    <textarea id="about" className="form-control" value={about} onChange={(e) => setAbout(e.target.value)} />
                </div>
                {/* Submit button */}
                <button type="submit" className="btn btn-primary">Add Dog</button>
            </form>
            {/* Error and success messages */}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>Dog added successfully!</p>}
            <Link to="/" className='btn btn-secondary mt-3'>Back to Dog List</Link> {/* Link to DogList */}
        </div>
    );
}

export default AddDog;