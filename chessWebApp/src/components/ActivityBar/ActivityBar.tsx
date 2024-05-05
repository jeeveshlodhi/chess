import { Chess, Color } from "chess.js";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import LoggedInActivity from "./LoggedInActivity";
import axios from "axios";

interface ActivityBoardProps {
  chess: Chess;
}

function ActivityBar(props: ActivityBoardProps) {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const handleSignIn = async () => {
    await axios.post("http://localhost:8000/login", {});
  };

  const handleRegister = async () => {
    await axios.post("http://localhost:8000/signup", {});
  };

  if (isLoggedIn === true) {
    return <LoggedInActivity chess={props.chess} />;
  }

  return (
    <>
      <div
        className="w-[30%] rounded-md p-4"
        style={{ backgroundColor: "rgba(0, 0 , 0, 0.2)" }}
      >
        <button
          onClick={handleSignIn}
          className="py-5 w-full rounded-md text-white font-bold bg-black20 mb-5 mt-20"
        >
          {" "}
          Sign In
        </button>
        <button
          onClick={handleRegister}
          className="py-5 w-full rounded-md text-white font-bold bg-black20"
        >
          {" "}
          Register
        </button>
      </div>
    </>
  );
}

export default ActivityBar;
