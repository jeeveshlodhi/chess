import { chessTheme } from "../utils/pieceInages";
import { ChessBoardType, ItemTypes } from "../utils/types";
import { useDrag, useDrop } from "react-dnd";
import Square from "./Square";
import { darkColor, lightColor } from "../utils/constants";
import { Chess } from "chess.js";
import { useEffect, useState } from "react";
import PlayerData from "./PlayerData";

interface chessBoardProp {
  chess: Chess;
  setChess: React.Dispatch<React.SetStateAction<Chess>>;
}

function ChessBoard(props: chessBoardProp) {
  const [sounds, setSounds] = useState({});

  useEffect(() => {
    // Load all audio files when component mounts
    const loadedSounds: any = {};
    Object.keys(chessTheme.sounds).forEach((soundName) => {
      const audio = new Audio(chessTheme.sounds[soundName]);
      audio.load();
      loadedSounds[soundName] = audio;
    });
    setSounds(loadedSounds);
  }, []);

  return (
    <div className=" w-fit">
      <PlayerData playerColor={"b"}/>
      <div className="grid grid-cols-8">
        {props.chess
          .board()
          .map((row: (ChessBoardType | null)[], i: number) => {
            return row.map((square: ChessBoardType | null, j) => {
              var piece =
                square?.color && square?.type
                  ? square.color + square.type
                  : null;
              if (piece !== null) {
                piece = chessTheme.pieces[piece];
              }
              const location = String.fromCharCode(j + 97) + (8 - i).toString();
              return (
                <Square
                  sounds={sounds}
                  chess={props.chess}
                  setChess={props.setChess}
                  squareData={square}
                  location={[i, j]}
                  squareColor={(i + j) % 2 == 0 ? lightColor : darkColor}
                  pieceColorName={location}
                  size={80}
                  url={piece}
                  key={location}
                />
              );
            });
          })}
      </div>
      <PlayerData playerColor={"w"} />
    </div>
  );
}

export default ChessBoard;
