import { Chess, Color } from "chess.js";
import React, { useEffect, useState } from "react";

interface ActivityBoardProps {
  chess: Chess;
}

interface moveInterface {
  move: string;
  player: Color;
}

function ActivityBar(props: ActivityBoardProps) {
  const [history, setHistory] = useState<moveInterface[]>([]);

  useEffect(() => {
    if (props.chess.history().length > 0) {
      const lastMove = props.chess.history({ verbose: true })[
        props.chess.history().length - 1
      ];
      const move: moveInterface = {
        move: lastMove.san,
        player: props.chess.turn() === "w" ? "b" : "w", // Determine player based on whose turn it is after the move
      };
      setHistory((prevHistory) => [...prevHistory, move]);
    }
  }, [props.chess]); // Depend on props.chess only

  return (
    <div className="w-[30%] rounded-md p-4" style={{backgroundColor : 'rgba(0, 0 , 0, 0.2)'}}>
      <ol type="1">
        {history.map((move, index) =>
          index % 2 === 0 ? (
            <li
              key={index}
              style={{
                backgroundColor:
                  index % 4 === 0 ? "rgba(0,0,0,0)" : "rgba(0, 0 , 0,.2)",
              }}
              className="grid grid-cols-3 text-left "
            >
              <p className="w-4">{index + 1}</p>
              <p className="w-24">{move.move}</p>
              {history[index + 1] && ( // Check if the next move exists
                <p className="w-24">{history[index + 1].move}</p>
              )}
            </li>
          ) : null
        )}
      </ol>
    </div>
  );
}

export default ActivityBar;
