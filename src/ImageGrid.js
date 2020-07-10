import React from "react";
import "./ImageGrid.css";

function ImageGrid({ searchResults }) {
  return (
    <div id="photos">
      {searchResults.map((item, index) => {
        const source = item.link.endsWith(".jpg", item.link.length)
          ? item.link
          : item.image.thumbnailLink;
        return (
          <a
            className="card"
            key={index}
            href={item.image.contextLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="card-image" src={source} alt={item.title} />
            <span className="card-title">{item.title}</span>
          </a>
        );
      })}
    </div>
  );
}

export default ImageGrid;
