"use client";
import React, {useState} from 'react'
import Image from "next/image";
import GameCard from "../gameCard/GameCard";

const GameList = ({ games }) => {
  const [images, setImage] = useState(["/image32.png", "/image33.png", "/image34.png"])
  return (
    <div className="game-list">
      {images.map((game, index) => (
        <Image
          key={index}
          src={game}
          height={772}
          width={341}
          alt={game}
          className="game-list-img"
        />
      ))}
    </div>
  );
};

export default GameList;
