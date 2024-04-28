import React from 'react';
import axios from 'axios';

function DeleteDog({ id, onDelete }) {
    // Function to handle dog deletion
    const handleDelete = async () => {
        try {
            // Send DELETE request to the API endpoint
            await axios.delete(`https://6626ad71052332d55323a83f.mockapi.io/dogs/${id}`);
            // Call onDelete function to update the list of dogs after deletion
            onDelete(id); 
            // Alert user about successful deletion
            alert('Dog deleted successfully!');
        } catch (error) {
            // Log any errors that occur during deletion
            console.error('Error deleting dog:', error);
        }
    };

    return (
        <div>
            {/* Button to trigger deletion */}
            <button onClick={handleDelete}>Delete Dog</button>
        </div>
    );
}

export default DeleteDog;
