import { Chess, Color, PieceSymbol } from "chess.js";
import React from "react";
import { ChessBoardType } from "../utils/types";
import {
  ConnectDropTarget,
  DragPreviewImage,
  useDrag,
  useDrop,
} from "react-dnd";
import { darkColor, lightColor } from "../utils/constants";
import Piece from "./Piece";

interface SquareProps {
  sounds: any;
  chess: Chess;
  setChess: React.Dispatch<React.SetStateAction<Chess>>;
  squareData: ChessBoardType | null;
  location: Array<number>;
  squareColor: string;
  url: string | null;
  pieceColorName: string;
  size: number;
}

function Square(props: SquareProps) {
  const [, drop] = useDrop({
    accept: "piece",
    drop: (item: { type: string; id: string }) => {
      console.log(item);
      const [fromPosition] = item.id.split("_");
      const to =
        String.fromCharCode(props.location[1] + 97) +
        (8 - props.location[0]).toString();
      props.setChess((prevChess) => {
        const newChess = new Chess(prevChess.fen());
        try {
          newChess.move({ from: fromPosition, to: to });
          props.sounds["promote"].play()
        } catch (e) {
        }
        console.log(newChess);
        return newChess;
      });
    },
  });
  return (
    <div
      draggable={props.squareData?.type !== undefined}
      ref={drop}
      style={{
        width: props.size,
        height: props.size,
        backgroundColor: props.squareColor,
      }}
      id={props.location[0] + "," + props.location[1]}
      className="text-black relative"
    >
      <Piece
        isText={props.location[1] == 0 || props.location[0] == 7}
        isColor={props.squareColor == darkColor ? lightColor : darkColor}
        text={
          props.location[1] == 0
            ? (8 - props.location[0]).toString()
            : String.fromCharCode(props.location[1] + 97)
        }
        textStyle={
          props.location[1] == 0
            ? "absolute font-bold pl-1"
            : "absolute font-bold pr-1 bottom-0 right-0"
        }
        pieceColorName={props.pieceColorName}
        squareData={props.squareData}
        url={props.url}
      />
    </div>
  );
}

export default Square;
