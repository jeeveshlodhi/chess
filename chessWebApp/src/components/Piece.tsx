import React from "react";
import { DragPreviewImage, useDrag } from "react-dnd";
import { ChessBoardType } from "../utils/types";
import { useSelector } from "react-redux";
import { authState } from "../store/auth/authSlice";
import { RootState } from "../store/store";

interface PieceProps {
  isText: boolean;
  isColor: string;
  text: string;
  textStyle: string;
  pieceColorName: string;
  squareData: ChessBoardType | null;
  url: string | null;
}

function Piece(props: PieceProps) {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)

  const [{ isDragging }, drag, preview] = useDrag({
    item: {
      type: "piece",
      id: `${props.pieceColorName}_${props.squareData?.type}_${props.squareData?.color}`,
    },
    type: "piece",
    collect: (monitor) => {
      return { isDragging: !!monitor.isDragging() };
    },
  });
  return (
    <>
      {props.isText && <div style={{ color: props.isColor }} className={props.textStyle}>{props.text}</div>}
      {props.url != null ? (
        <DragPreviewImage connect={preview} src={props.url} />
      ) : (
        <></>
      )}
      {props.url != null ? (
        <img
          ref={ isLoggedIn === true ? drag: null  }
          src={props.url}
          alt=""
          style={{ opacity: isDragging ? 0 : 1 }}
        />
      ) : (
        <></>
      )}
    </>
  );
}

export default Piece;
