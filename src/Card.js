import React from "react";
import "./Card.css";

function Card({ index, title, link, src }) {
  return (
    <a
      className="card"
      key={index}
      href={link}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img className="card-image" src={src} alt={title} />
      <span className="card-title">{title}</span>
    </a>
  );
}

export default Card;
