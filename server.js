const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());

let movies = [
  { id: 1, title: "Inception", director: "Christopher Nolan", year: 2010 },
  { id: 2, title: "Interstellar", director: "Christopher Nolan", year: 2014 },
  { id: 3, title: "Parasite", director: "Bong Joon-ho", year: 2019 },
  { id: 4, title: "The Matrix", director: "The Wachowskis", year: 1999 },
];

app.get("/", (req, res) => {
  res.send("Welcome to the Movie API! Use /info for guidance!");
});

app.get("/info", (req, res) => {
  res.send(
    "To fetch all movies, use GET /movies. To add a new movie, use POST /movies. To UPDATE or delete a movie, use PUT or DELETE on /movies/:id respectively"
  );
});

app.get("/movies", (req, res) => {
  res.send(movies);
});

app.get("/movies/:id", (req, res) => {
   //take the id number user gives, turn it into id
  const id = parseInt(req.params.id);
  // find a match
  const movie = movies.find((m) => m.id === id)
  if (movie) {
    res.send(movie);
    //if there is no match, return 404, if not, send(the movie)
  } else {
    res.status(404).send("Movie not found");
  }
});

//stretch goal, search
app.get("/movies/search", (req, res) => {
    const searchTerm = req.params.title;
    const movie = movies.find((m) => m.title === searchTerm);
  
    if (movie) {
      res.send(movie.title);
    } else {
      res.status(404).send("Movie not found");
    }
  });
  

  app.post("/movies/add", (req, res) => {
    const title = req.query.title;
    const director = req.query.director;
    const year = req.query.year;
  
    // Check if all required fields are provided
    if (!title || !director || !year) {
      return res.status(400).send("Missing required data.");
    }
  
    const newMovie = {
      id: movies.length + 1,
      title,
      director,
      year,
    };
  
    movies.push(newMovie);
    res.status(201).json(newMovie);
  });
  








app.delete("/movies/:id", (req, res) => {
  const id = parseInt(req.params.id);
  movies = movies.filter((film) => film.id !== id);
  res.send("That movie has been deleted.");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
