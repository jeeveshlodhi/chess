import { Color } from "chess.js";
import React from "react";

interface PlayerDataProps{
  playerColor: Color
}

function PlayerData(props: PlayerDataProps) {
  const defaultBlackPlayer =
    "https://www.chess.com/bundles/web/images/black_400.png";
  return (
    <div className="flex py-1 justify-between">
      <div className="flex">
        <img src={defaultBlackPlayer} className="w-10 h-10" alt="" />
        <div className="flex flex-col px-2">
          <p className="font-bold">Username</p>
        </div>
      </div>
      <div className="bg-black20 font-bold text-2xl w-40 flex justify-end items-center px-2 rounded-md">
        <p>10:00</p>
      </div>
    </div>
  );
}

export default PlayerData;
