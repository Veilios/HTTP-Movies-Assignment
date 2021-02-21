import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

const initialState = {
    movie: '',
    director: '',
    metascore: '',
    stars: []
}

const UpdateMovie = (props) => {
    console.log(props);
    const { push } = useHistory();
    const params = useParams();
    const [movie, setMovie] = useState(initialState);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${params.id}`)
            .then(res => {
                setMovie(res.data);
            })
            .catch(err => console.error("Unable to retrieve item", err.message));
    }, [params.id]);

    const handleChange = (e) => {
        let value = e.target.name === "stars" ? e.target.value.split(",") : e.target.value;
        setMovie({ ...movie, [e.target.name]: value });
      };

    const handleSubmit = e => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${params.id}`, movie)
            .then(res => {
                console.log("Update Movie: handleSubmit: res: ", res);
                setMovie(res.data);
                push(`/movies/${params.id}`);
            })
            .catch(err => console.log("Cannot Update Movie: ", err.message));
    };

    return (
        <div className="update-form">
            <form onSubmit={handleSubmit} >
                <label htmlFor="title">Title:</label>
                <input name="title" id="title" type="text" onChange={handleChange} />

                <label htmlFor="director">Director:</label>
                <input name="director" id="director" type="text" onChange={handleChange} />

                <label htmlFor="metascore">Metascore:</label>
                <input name="metascore" id="metascore" type="number" onChange={handleChange} />

                <label htmlFor="stars">Actors:</label>
                <input name="stars" id="stars" type="text" onChange={handleChange} />

                <button>Update</button>
            </form>
        </div>
    )
};

export default UpdateMovie;