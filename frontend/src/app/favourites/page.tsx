"use client";

import { useEffect, useState } from "react";
import styles from "./Favourites.module.css";
import Loader from "@/UI/Loader/Loader";

const Favourites = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [favourites, setFavourites] = useState(null);

  return <div>
    {isLoading ? <Loader /> : favourites}
  </div>;
};

export default Favourites;
