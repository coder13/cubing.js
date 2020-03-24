const ksolve = `
# Test comment
Name 222NOGOODNAME3322

# Marc Ringuette 9/12/2018
#
# 12 orientations of 16 pieces flattened into 4x16 permutations.
#
# Solved position here is IDentity (1-64 in sequence); this is handy for composing moves into macro-moves.

Set Stickers 64 1

Solved
Stickers
 1 2 3 4 5 6   7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64
End

Move Rx
Stickers
17 20 18 19 21 23 24 22 5 8 6 7 1 3 4 2 29 31 32 30 25 28 26 27 9 11 12 10 13 16 14 15 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64
End

Move Ry
Stickers
13 14 15 16 1 2 3 4 5 6 7 8 9 10 11 12 29 30 31 32 17 18 19 20 21 22 23 24 25 26 27 28 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64
End
`;
import { parse } from "../../src/kpuzzle";

parse(ksolve);

import { Sequence } from "../../src/alg";
import "../../src/twisty";
import { App } from "./app";
import { getURLParam } from "./url-params";

window.addEventListener("load", () => {
  if (!getURLParam("debug-js")) {
    return;
  }
  const appElement = document.querySelector("app")!;
  let alg: Sequence;
  try {
    alg = getURLParam("alg");
  } catch (e) {
    alg = new Sequence([]);
  }
  (window as any).app = new App(appElement, {
    puzzleName: getURLParam("puzzle"),
    alg,
  });
});
