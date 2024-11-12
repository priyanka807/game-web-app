"use client"
import React, {useState} from 'react'
import Image from "next/image";

const GameCard = ({ title, image }) => {
    const [imageCard, setImageCard] = useState([1,2,3,4,5])

  return (
    <>
     <div className="game-card-list">
    {imageCard.map((game, index) => (
      <Image
        key={index}
        src="/cardGame.png"
        height={315}
        width={433}
        alt={game}
        className="game-card-img"
      />
    ))}
  </div>
    </>
   
  );
};

export default GameCard;
