import React from "react";

const MovieCard = ({
  movie: { title, vote_average, poster_path, release_date, original_language },
}) => {
  return (
    <div className="movie-card">
      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
            : "/No-Poster.png"
        }
        alt="{title}"
      />
      <div className="mt-4">
        <h3>{title}</h3>
        <div className="flex">
          <div className="rating">
            <img src="Star.svg" alt="Star Icon" />
            <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
          </div>
          <span className="text-white ml-2 mt-1">•</span>
          <p className="lang text-white m-1">
            {original_language.charAt(0).toUpperCase() +
              original_language.slice(1)}
          </p>
          <span className="text-white mt-1">•</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
