import React, { useContext } from "react";
import Nav from "../Component/Nav";

import { listingDataContext } from "../Context/ListingContext";
import Card from "../Component/Card";

function Home() {
  let { listingData, setListingData, newListData, isLoading } =
    useContext(listingDataContext);
  return (
    <div>
      <Nav />
      <div className="max-w-7xl mx-auto px-4 mt-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: 8 }).map((_, idx) => (
                <div
                  key={idx}
                  className="w-full bg-white rounded-xl shadow-sm overflow-hidden animate-pulse"
                >
                  <div className="w-full h-[220px] bg-gray-200" />
                  <div className="p-3 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-2/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/3" />
                  </div>
                </div>
              ))
            : newListData.map((list) => (
                <Card
                  key={list._id}
                  title={list.title}
                  landmark={list.landmark}
                  city={list.city}
                  image1={list.image1}
                  image2={list.image2}
                  image3={list.image3}
                  rent={list.rent}
                  id={list._id}
                  ratings={list.ratings}
                  isBooked={list.isBooked}
                  host={list.host}
                />
              ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
