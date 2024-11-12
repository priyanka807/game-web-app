"use client"
import GameCard from "@/components/gameCard/GameCard";
import GameList from "@/components/gameList/GameList";
import Header from "@/components/header/Header";
import Sidebar from "@/components/sidebar/Sidebar";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'

export default function Home() {
  const [isAuthenticated,setIsAuthenticated] = useState(false)
  const router = useRouter()
  const games = [
    { title: "Viking", image: "/path/to/viking-image.jpg" },
    { title: "Fairy Slots", image: "/path/to/fairy-slot-image.jpg" },
 
  ];
  useEffect(() => {
    const newUser = localStorage.getItem("newUser");
    if (newUser) {
      setIsAuthenticated(true); 
    } else {
      router.push("/login"); 
    }
  }, [router]);

 
  if (!isAuthenticated) return null;
  return (
    <div className="main-container">
      <Header />
      <div className="main">
        <Sidebar />
        <GameList games={games} />
        <div>
          <GameCard />
          <GameCard />
        </div>
      </div>
    </div>
  );
}
