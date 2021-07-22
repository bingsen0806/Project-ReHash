import React, { useContext, useEffect, useState } from "react";
import TopBar from "../../components/topbar/TopBar";
import ItemListsTangible from "../../components/itemlistsTangible/ItemListsTangible";
import "./home.css";
import ItemListsIntangible from "../../components/itemlistsIntangible/ItemListsIntangible";
import TrendingSwaps from "../../components/trendingSwaps/TrendingSwaps";
import Ads from "../../components/ads/Ads";
import { AuthContext } from "../../context/AuthContext";
import GroupIconContainer from "../../components/groupIconContainer/GroupIconContainer";
import axios from "axios";

export default function Home() {
  const { user, sockio } = useContext(AuthContext);
  const [recommendedGroups, setRecommendedGroups] = useState([]);

  useEffect(() => {
    console.log("socket is: ", sockio?.id);
    console.log("user is: ", user);
  }, [sockio, user]);

  useEffect(() => {
    const getRecommendedGroups = async () => {
      try {
        if (user) {
          const res = await axios.get("/api/groups/recommended/" + user._id);
          if (res.status === 200) {
            setRecommendedGroups(res.data);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    getRecommendedGroups();
  }, [user]);

  return (
    <div>
      <TopBar currentUser={user} />
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
            <span>Explore Intangible {sockio?.id}</span>
          </div>
          <ItemListsIntangible />
        </div>
        <div className="recommendedGroups">
          <div className="itemsType">
            <span>Recommended Groups</span>
          </div>
          <GroupIconContainer recommendedGroups={recommendedGroups} />
        </div>
        {/* <div className="trendingSwap">
          <span className="trendingSwapHead">Trending Swaps</span>
          <TrendingSwaps className="trendingSwapItems" />
        </div> */}
      </div>
    </div>
  );
}
