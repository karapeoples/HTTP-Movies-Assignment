import React, { useState } from "react";
import axios from "axios";

const AddMovie = props => {

  const movie = {
id:Date.now(),
 title: '',
 director: '',
 metascore: '',
 stars: [],
 }
  const [addMovie, setAddMovie] = useState(movie);

  const changeHandler = ev => {
    let value = ev.target.value;
    if (ev.target.name === 'metascore') {
      value = parseInt(value, 10);
    }

    setAddMovie({
      ...addMovie,
      [ev.target.name]: value
    });
};
  
const handleStars = event => {
  setAddMovie({
    ...addMovie,
    stars: [event.target.value],
  })
}

  const handleSubmit = e => {
    e.preventDefault();
    setAddMovie({...addMovie})
      axios
          .post("http://localhost:5000/api/movies/", addMovie)
          .then(res => {
            console.log(res.data)
            setAddMovie(movie);
            props.history.push('/')
          })
          .catch(error => {
            console.log("Whoops go back, thats an error!", error);
          });
  }
    
      
  return (
<div>
      <h2 className="form">Add Movie</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="Title"
          value={addMovie.title}
        />
        <div/>

        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="Director"
          value={addMovie.director}
        />
        <div/>

        <input
          type="number"
          name="metascore"
          onChange={changeHandler}
          placeholder="Metascore"
          value={addMovie.metascore}
        />
        <div/>
        <input
          type="text"
          name="Stars"
          onChange={handleStars}
          placeholder="Stars"
          value={addMovie.stars}
        />
        <div/>
        <button>Add Movie</button>
      </form>
    </div>

  )
}
    export default AddMovie