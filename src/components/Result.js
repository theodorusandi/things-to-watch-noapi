import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMovies } from "../api/apiClient";
// components
import styled from "styled-components";

const StyledButton = styled.button`
  display: ${({ loadingCount }) => (loadingCount === 0 ? "block" : "none")};
  padding: 1em 2em;
  border-radius: 5px;
  border: none;
  background-color: ${({ theme }) => theme.colors.xiketic};
  color: white;
  cursor: pointer;
  &:hover {
    transition: all 0.25s ease;
    color: black;
    background-color: ${({ theme }) => theme.colors.selectiveYellow};
  }
`;

const StyledImgContainer = styled.div`
  display: ${({ loadingCount }) => (loadingCount === 0 ? "grid" : "none")};
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.5em;
  align-content: center;
  justify-content: center;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5em;
    padding: 0 0.25em;

    h1 {
      // handle long title
      max-width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    img {
      height: 50%;
    }

    p {
      line-height: 1.5;
      text-align: left;
    }
  }
`;

const StyledResult = styled.section`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0.5em 1em;

  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 2em;

  > span {
    display: ${({ loadingCount }) => (loadingCount === 0 ? "none" : "block")};
  }
`;

const generateRandomIndexes = (min, max, num) => {
  if (max <= min) return [];

  let result = new Set();

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  };

  while (num) {
    let randomInt = getRandomInt(min, max);
    if (result.has(randomInt)) continue;
    result.add(randomInt);
    num--;
  }

  return Array.from(result);
};

const Result = ({ movieData }) => {
  const [movies, setMovies] = useState([]);
  const [loadingCount, setLoadingCount] = useState(-1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await getMovies(movieData);
        const results = response.data.results;

        if (results === null) {
          setLoadingCount(0);
          setMovies(null);
        } else {
          const indexes = generateRandomIndexes(
            0,
            results.length,
            Math.min(results.length, 5)
          );

          const moviesToWatchResult = indexes.map((index) => results[index]);

          setLoadingCount(indexes.length);
          setMovies(moviesToWatchResult);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchMovies();
  }, [movieData]);

  return (
    <StyledResult loadingCount={loadingCount}>
      <span className="loading">Loading...</span>

      <StyledImgContainer loadingCount={loadingCount}>
        {movies === null ? (
          <div>No results...</div>
        ) : (
          movies.map((movie) => (
            <div key={movie.id}>
              <h1 title={movie.title}>{movie.title}</h1>
              <span>IMDB Rating : {movie.imDbRating}</span>
              <img
                onLoad={() =>
                  setLoadingCount((prevLoadingCount) => prevLoadingCount - 1)
                }
                src={movie.image}
                alt=""
              />
              <p>{movie.plot}</p>
            </div>
          ))
        )}
      </StyledImgContainer>

      <StyledButton loadingCount={loadingCount} onClick={() => navigate("/")}>
        Restart
      </StyledButton>
    </StyledResult>
  );
};

export default Result;
