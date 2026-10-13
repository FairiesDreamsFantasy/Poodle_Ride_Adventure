/**
 * System/AI/In-Game/Puzzle_Recognition/index.tsx
 * Logic for in-game puzzle piece recognition and verification.
 * Used on a special-case basis, preserving the developer's custom designs.
 */

export interface PuzzlePiece {
  id: string;
  name: string;
  type: string;
  properties?: Record<string, any>;
}

export interface PuzzleSlot {
  slotId: string;
  acceptedPieceId: string;
  isCompleted: boolean;
}

/**
 * Validates whether the inserted piece fits the target puzzle slot correctly.
 */
export const verifyPuzzlePieceMatch = (
  insertedPiece: PuzzlePiece | null,
  targetSlot: PuzzleSlot
): boolean => {
  if (!insertedPiece) return false;
  return insertedPiece.id === targetSlot.acceptedPieceId;
};

/**
 * Executes a puzzle state update when a correct item is placed.
 */
export const processPuzzlePlacement = (
  insertedPiece: PuzzlePiece,
  slots: PuzzleSlot[],
  onSuccessTrigger?: () => void
): { updatedSlots: PuzzleSlot[]; isFullySolved: boolean } => {
  const updatedSlots = slots.map(slot => {
    if (verifyPuzzlePieceMatch(insertedPiece, slot)) {
      return { ...slot, isCompleted: true };
    }
    return slot;
  });

  const isFullySolved = updatedSlots.every(slot => slot.isCompleted);

  if (isFullySolved && onSuccessTrigger) {
    onSuccessTrigger();
  }

  return { updatedSlots, isFullySolved };
};
