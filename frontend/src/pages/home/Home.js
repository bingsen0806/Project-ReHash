import React, { useContext } from "react";
import TopBar from "../../components/topbar/TopBar";
import ItemListsTangible from "../../components/itemlistsTangible/ItemListsTangible";
import "./home.css";
import ItemListsIntangible from "../../components/itemlistsIntangible/ItemListsIntangible";
import TrendingSwaps from "../../components/trendingSwaps/TrendingSwaps";
import Ads from "../../components/ads/Ads";
import { AuthContext } from "../../context/AuthContext";

export default function Home() {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <TopBar />
      <Ads />
      <div className="homeWrapper">
        <div className="tangible">
          <div className="itemsType">
            <span>Explore Tangible</span>
          </div>
          <ItemListsTangible />
        </div>
        <div className="intangible">
          <div className="itemsType">
            <span>Explore Intangible</span>
          </div>
          <ItemListsIntangible />
        </div>

        <div className="trendingSwap">
          <span className="trendingSwapHead">Trending Swaps</span>
          <TrendingSwaps className="trendingSwapItems" />
        </div>
      </div>
    </div>
  );
}
