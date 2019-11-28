import { parse } from "../../src/alg/index";
import { parse as kpuzzleParse } from "../../src/kpuzzle/index";
import { getPuzzleGeometryByName } from "../../src/puzzle-geometry/index";
import { Twisty } from "../../src/twisty/index";

window.addEventListener("load", () => {
  const pg = getPuzzleGeometryByName("megaminx");
  const stickerDat = pg.get3d(0.0131);

  const kpuzzle = kpuzzleParse(pg.writeksolve("TwizzlePuzzle", true));

  const elem = document.querySelector("#custom-pg3d");
  const twisty = new Twisty(elem, {
    alg: parse("[[U', R], [U, R']]"),
    puzzle: kpuzzle,
    playerConfig: {
      visualizationFormat: "PG3D",
      experimentalPG3DStickerDat: stickerDat,
    },
  });
});