import React from "react";
import ActivityBar from "../components/ActivityBar/ActivityBar";
import ChessBoard from "../components/ChessBoard";
import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Chess } from "chess.js";

function ChessRoom() {
  const chess = new Chess();
  const [board, setBoard] = useState<Chess>(chess);
  return (
    <div className="flex">
      <div className="w-[60%]">
        <DndProvider backend={HTML5Backend}>
          <ChessBoard chess={board} setChess={setBoard} />
        </DndProvider>
      </div>
      <ActivityBar chess={board} />
    </div>
  );
}

export default ChessRoom;
