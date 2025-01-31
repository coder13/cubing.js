import type { KPuzzleDefinition } from "../../../kpuzzle";

export const pyraminxKPuzzle: KPuzzleDefinition = {
  name: "Pyraminx",
  orbits: {
    CENTERS: { numPieces: 4, numOrientations: 3 },
    TIPS: { numPieces: 4, numOrientations: 3 },
    EDGES: { numPieces: 6, numOrientations: 2 },
  },
  startStateData: {
    CENTERS: { pieces: [0, 1, 2, 3], orientation: [0, 0, 0, 0] },
    TIPS: { pieces: [0, 1, 2, 3], orientation: [0, 0, 0, 0] },
    EDGES: {
      pieces: [0, 1, 2, 3, 4, 5],
      orientation: [0, 0, 0, 0, 0, 0],
    },
  },
  moves: {
    U: {
      CENTERS: { permutation: [0, 1, 2, 3], orientation: [1, 0, 0, 0] },
      TIPS: { permutation: [0, 1, 2, 3], orientation: [1, 0, 0, 0] },
      EDGES: {
        permutation: [1, 2, 0, 3, 4, 5],
        orientation: [1, 0, 1, 0, 0, 0],
      },
    },
    L: {
      CENTERS: { permutation: [0, 1, 2, 3], orientation: [0, 1, 0, 0] },
      TIPS: { permutation: [0, 1, 2, 3], orientation: [0, 1, 0, 0] },
      EDGES: {
        permutation: [5, 1, 2, 0, 4, 3],
        orientation: [1, 0, 0, 0, 0, 1],
      },
    },
    R: {
      CENTERS: { permutation: [0, 1, 2, 3], orientation: [0, 0, 1, 0] },
      TIPS: { permutation: [0, 1, 2, 3], orientation: [0, 0, 1, 0] },
      EDGES: {
        permutation: [0, 3, 2, 4, 1, 5],
        orientation: [0, 0, 0, 1, 1, 0],
      },
    },
    B: {
      CENTERS: { permutation: [0, 1, 2, 3], orientation: [0, 0, 0, 1] },
      TIPS: { permutation: [0, 1, 2, 3], orientation: [0, 0, 0, 1] },
      EDGES: {
        permutation: [0, 1, 4, 3, 5, 2],
        orientation: [0, 0, 0, 0, 1, 1],
      },
    },
    u: {
      CENTERS: { permutation: [0, 1, 2, 3], orientation: [0, 0, 0, 0] },
      TIPS: { permutation: [0, 1, 2, 3], orientation: [1, 0, 0, 0] },
      EDGES: {
        permutation: [0, 1, 2, 3, 4, 5],
        orientation: [0, 0, 0, 0, 0, 0],
      },
    },
    l: {
      CENTERS: { permutation: [0, 1, 2, 3], orientation: [0, 0, 0, 0] },
      TIPS: { permutation: [0, 1, 2, 3], orientation: [0, 1, 0, 0] },
      EDGES: {
        permutation: [0, 1, 2, 3, 4, 5],
        orientation: [0, 0, 0, 0, 0, 0],
      },
    },
    r: {
      CENTERS: { permutation: [0, 1, 2, 3], orientation: [0, 0, 0, 0] },
      TIPS: { permutation: [0, 1, 2, 3], orientation: [0, 0, 1, 0] },
      EDGES: {
        permutation: [0, 1, 2, 3, 4, 5],
        orientation: [0, 0, 0, 0, 0, 0],
      },
    },
    b: {
      CENTERS: { permutation: [0, 1, 2, 3], orientation: [0, 0, 0, 0] },
      TIPS: { permutation: [0, 1, 2, 3], orientation: [0, 0, 0, 1] },
      EDGES: {
        permutation: [0, 1, 2, 3, 4, 5],
        orientation: [0, 0, 0, 0, 0, 0],
      },
    },
  },
};
