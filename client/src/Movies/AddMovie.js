import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const initialState = {
    id: Date.now(),
    title: "",
    director: "",
    metascore: "",
    stars: [""]
};

const AddMovie = () => {
    const [newMovie, setNewMovie] = useState(initialState);
    const { push } = useHistory();

    const handleChange = e => {
        setNewMovie({
            ...newMovie,
            [e.target.name]: e.target.value
        });
    };

    const handelSubmit = e => {
        e.preventDefault();
        axios.post(`http://localhost:5000/api/movies`, newMovie)
            .then(res => {
                console.log("NewMovie HandleSubmit res: ", res);
            })
            .catch(err => console.error("Could not add new movie: ", err.message));
    };


    return (
        <div>
            <form onSubmit={handelSubmit}>
                <label htmlFor="title">Title: </label>
                <input type="text" id="title" name="title" onChange={handleChange} />

                <label htmlFor="director">Director: </label>
                <input type="text" id="director" name="director" onChange={handleChange} />

                <label htmlFor="metascore">Metascore: </label>
                <input type="number" id="metascore" name="metascore" onChange={handleChange} />

                <label htmlFor="stars">Actors: </label>
                <input type="text" id="stars" name="stars" onChange={handleChange} />

                <button>Add Movie</button>
            </form>
        </div>
    )

};

export default AddMovie;