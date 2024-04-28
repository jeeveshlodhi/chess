import { Square, PieceSymbol, Color } from "chess.js";

export interface ChessBoardType {
  square: Square;
  type: PieceSymbol;
  color: Color;
}

export const ItemTypes = {
  PIECE: "piece",
};
