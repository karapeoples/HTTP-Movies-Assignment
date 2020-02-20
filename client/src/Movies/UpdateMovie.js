import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';



const initialItem = {
  title: '',
  director: '',
  metascore: '',
  stars: [],
};

const UpdateMovie = props => { 

  const [movie, setMovie] = useState(initialItem);
  const { id } = useParams();
  
  
    useEffect(() => {
      axios
        .get(`http://localhost:5000/api/movies/${id}`)
        .then(response => {
          console.log(response)
          setMovie(response.data)
        })
        .catch(err => {
          console.log(err)
        })
    }, [id])

const changeHandler = ev => {
    ev.persist();
    let value = ev.target.value;
    if (ev.target.name === 'metascore') {
      value = parseInt(value, 10);
    }

    setMovie({
      ...movie,
      [ev.target.name]: value
    });
};
  
const handleStars = event => {
  setMovie({
    ...movie,
    stars: [event.target.value],
  })
}

const handleSubmit = e => {
  e.preventDefault();
  axios
  .put(`http://localhost:5000/api/movies/${id}`, movie)
  .then(res => {
  setMovie(initialItem)
  props.history.push('/')
})
.catch(err => console.log(err))
  };

  return (
    <div>
      <h2 className='form'>Update Movie</h2>
      <form className='form' onSubmit={handleSubmit} >
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="Title"
          value={movie.title}
        />
        <div/>

        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="Director"
          value={movie.director}
        />
        <div/>

        <input
          type="number"
          name="metascore"
          onChange={changeHandler}
          placeholder="Metascore"
          value={movie.metascore}
        />
        <div/>
        <input
          type="text"
          name="Stars"
          onChange={handleStars}
          placeholder="Stars"
          value={movie.stars}
        />
        <div/>

        

        <button>Update</button>
      </form>
    </div>
  );
};

export default UpdateMovie;