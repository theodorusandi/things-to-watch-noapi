import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ThemeProvider } from "styled-components";
// components
import Page from "./components/Page";
import Start from "./components/Start";
// assets
import typesDataArray from "./data/types.js";
import genresDataArray from "./data/genres.js"
import ratingsDataArray from "./data/ratings.js"
import theme from "./styles/theme.js";
import Result from "./components/Result";

function App() {
  const [movieData, setMovieData] = useState({
    type: "",
    genre: "",
    rating: 0,
  });

  const navigate = useNavigate();

  const handleInputChange = (key, value, next) => {
    setMovieData((prevMovieData) => ({
      ...prevMovieData,
      [key]: value,
    }));

    navigate(next);
  };

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route
          path="/type"
          element={
            <Page
              title="Movie or Series?"
              dataArray={typesDataArray}
              handleInputChange={handleInputChange}
              name="type"
              next="/genre"
            />
          }
        />
        <Route
          path="/genre"
          element={
            <Page
              title="What mood are you in?"
              dataArray={genresDataArray}
              handleInputChange={handleInputChange}
              name="genre"
              next="/rating"
            />
          }
        />
        <Route
          path="/rating"
          element={
            <Page
              title="Top rated or for fun only?"
              dataArray={ratingsDataArray}
              handleInputChange={handleInputChange}
              name="rating"
              next="/result"
            />
          }
        />
        <Route path="/result" element={<Result movieData={movieData} />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
