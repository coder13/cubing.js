import { FaceNameSwizzler } from "./FaceNameSwizzler";
import { PGVendoredMove, PGVendoredMoveQuantum } from "./interfaces";

export interface NotationMapper {
  notationToInternal(move: PGVendoredMove): PGVendoredMove | null;
  notationToExternal(move: PGVendoredMove): PGVendoredMove | null;
}

export class NullMapper implements NotationMapper {
  public notationToInternal(move: PGVendoredMove): PGVendoredMove {
    return move;
  }

  public notationToExternal(move: PGVendoredMove): PGVendoredMove {
    return move;
  }
}

function negate(family: string, v: number | undefined): PGVendoredMove {
  if (v === undefined) {
    v = -1;
  } else if (v === -1) {
    v = undefined;
  } else {
    v = -v;
  }
  return new PGVendoredMove(family, v);
}

export class NxNxNCubeMapper implements NotationMapper {
  constructor(public slices: number) {}

  public notationToInternal(move: PGVendoredMove): PGVendoredMove {
    const grip = move.family;
    if (!move.innerLayer && !move.outerLayer) {
      if (grip === "x") {
        move = new PGVendoredMove("Rv", move.effectiveAmount);
      } else if (grip === "y") {
        move = new PGVendoredMove("Uv", move.effectiveAmount);
      } else if (grip === "z") {
        move = new PGVendoredMove("Fv", move.effectiveAmount);
      }
      if ((this.slices & 1) === 1) {
        if (grip === "E") {
          move = new PGVendoredMove(
            new PGVendoredMoveQuantum("D", (this.slices + 1) / 2),
            move.effectiveAmount,
          );
        } else if (grip === "M") {
          move = new PGVendoredMove(
            new PGVendoredMoveQuantum("L", (this.slices + 1) / 2),
            move.effectiveAmount,
          );
        } else if (grip === "S") {
          move = new PGVendoredMove(
            new PGVendoredMoveQuantum("F", (this.slices + 1) / 2),
            move.effectiveAmount,
          );
        }
      }
      if (this.slices > 2) {
        if (grip === "e") {
          move = new PGVendoredMove(
            new PGVendoredMoveQuantum("D", this.slices - 1, 2),
            move.effectiveAmount,
          );
        } else if (grip === "m") {
          move = new PGVendoredMove(
            new PGVendoredMoveQuantum("L", this.slices - 1, 2),
            move.effectiveAmount,
          );
        } else if (grip === "s") {
          move = new PGVendoredMove(
            new PGVendoredMoveQuantum("F", this.slices - 1, 2),
            move.effectiveAmount,
          );
        }
      }
    }
    return move;
  }

  // do we want to map slice moves to E/M/S instead of 2U/etc.?
  public notationToExternal(move: PGVendoredMove): PGVendoredMove {
    const grip = move.family;
    if (!move.innerLayer && !move.outerLayer) {
      if (grip === "Rv") {
        return new PGVendoredMove("x", move.effectiveAmount);
      } else if (grip === "Uv") {
        return new PGVendoredMove("y", move.effectiveAmount);
      } else if (grip === "Fv") {
        return new PGVendoredMove("z", move.effectiveAmount);
      } else if (grip === "Lv") {
        return negate("x", move.effectiveAmount);
      } else if (grip === "Dv") {
        return negate("y", move.effectiveAmount);
      } else if (grip === "Bv") {
        return negate("z", move.effectiveAmount);
      }
    }
    return move;
  }
}

// face renaming mapper.  Accepts two face name remappers.  We
// work between the two.

export class FaceRenamingMapper implements NotationMapper {
  constructor(
    public internalNames: FaceNameSwizzler,
    public externalNames: FaceNameSwizzler,
  ) {}

  // TODO:  consider putting a cache in front of this
  public convertString(
    grip: string,
    a: FaceNameSwizzler,
    b: FaceNameSwizzler,
  ): string {
    let suffix = "";
    if ((grip.endsWith("v") || grip.endsWith("v")) && grip <= "_") {
      suffix = grip.slice(grip.length - 1);
      grip = grip.slice(0, grip.length - 1);
    }
    const upper = grip.toUpperCase();
    let isLowerCase = false;
    if (grip !== upper) {
      isLowerCase = true;
      grip = upper;
    }
    grip = b.joinByFaceIndices(a.splitByFaceNames(grip));
    if (isLowerCase) {
      grip = grip.toLowerCase();
    }
    return grip + suffix;
  }

  public convert(
    move: PGVendoredMove,
    a: FaceNameSwizzler,
    b: FaceNameSwizzler,
  ): PGVendoredMove {
    const grip = move.family;
    const ngrip = this.convertString(grip, a, b);
    if (grip === ngrip) {
      return move;
    } else {
      return new PGVendoredMove(
        new PGVendoredMoveQuantum(ngrip, move.innerLayer, move.outerLayer),
        move.effectiveAmount,
      );
    }
  }

  public notationToInternal(move: PGVendoredMove): PGVendoredMove {
    const r = this.convert(move, this.externalNames, this.internalNames);
    return r;
  }

  public notationToExternal(move: PGVendoredMove): PGVendoredMove {
    return this.convert(move, this.internalNames, this.externalNames);
  }
}

// Sits on top of a (possibly null) notation mapper, and
// adds R++/R--/D++/D-- notation mapping.
export class MegaminxScramblingNotationMapper implements NotationMapper {
  constructor(private child: NotationMapper) {}

  public notationToInternal(move: PGVendoredMove): PGVendoredMove | null {
    if (move.innerLayer === undefined && move.outerLayer === undefined) {
      if (Math.abs(move.effectiveAmount) === 1) {
        if (move.family === "R++") {
          return new PGVendoredMove(
            new PGVendoredMoveQuantum("L", 3, 2),
            -2 * move.effectiveAmount,
          );
        } else if (move.family === "R--") {
          return new PGVendoredMove(
            new PGVendoredMoveQuantum("L", 3, 2),
            2 * move.effectiveAmount,
          );
        } else if (move.family === "D++") {
          return new PGVendoredMove(
            new PGVendoredMoveQuantum("U", 3, 2),
            -2 * move.effectiveAmount,
          );
        } else if (move.family === "D--") {
          return new PGVendoredMove(
            new PGVendoredMoveQuantum("U", 3, 2),
            2 * move.effectiveAmount,
          );
        }
      }
      if (move.family === "y") {
        return new PGVendoredMove("Uv", move.effectiveAmount);
      }
    }
    return this.child.notationToInternal(move);
  }

  // we never rewrite click moves to these moves.
  public notationToExternal(move: PGVendoredMove): PGVendoredMove | null {
    if (move.family === "Uv") {
      return new PGVendoredMove(
        new PGVendoredMoveQuantum("y", move.innerLayer, move.outerLayer),
        move.effectiveAmount,
      );
    }
    if (move.family === "Dv") {
      return negate("y", move.effectiveAmount);
    }
    return this.child.notationToExternal(move);
  }
}

export class SkewbNotationMapper implements NotationMapper {
  constructor(private child: FaceNameSwizzler) {}

  public notationToInternal(move: PGVendoredMove): PGVendoredMove | null {
    if (move.innerLayer || move.outerLayer) {
      return null;
    }
    if (move.family === "F") {
      return new PGVendoredMove(
        new PGVendoredMoveQuantum("DFR", move.outerLayer, move.innerLayer),
        move.effectiveAmount,
      );
    } else if (move.family === "R") {
      return new PGVendoredMove(
        new PGVendoredMoveQuantum("DBR", move.outerLayer, move.innerLayer),
        move.effectiveAmount,
      );
    } else if (move.family === "L") {
      return new PGVendoredMove(
        new PGVendoredMoveQuantum("DFL", move.outerLayer, move.innerLayer),
        move.effectiveAmount,
      );
    } else if (move.family === "B") {
      return new PGVendoredMove(
        new PGVendoredMoveQuantum("DBL", move.outerLayer, move.innerLayer),
        move.effectiveAmount,
      );
      /*
       *   (1) We are not including x/y/z in Skewb; they aren't WCA notation and
       *   it's unclear anyone needs them for reconstructions.
       *
    } else if (move.family === "x") {
      return new BlockMove(move.outerLayer, move.innerLayer, "Rv", move.amount);
    } else if (move.family === "y") {
      return new BlockMove(move.outerLayer, move.innerLayer, "Uv", move.amount);
    } else if (move.family === "z") {
      return new BlockMove(move.outerLayer, move.innerLayer, "Fv", move.amount);
       */
    } else {
      return null;
    }
  }

  // we never rewrite click moves to these moves.
  public notationToExternal(move: PGVendoredMove): PGVendoredMove | null {
    if (this.child.spinmatch(move.family, "DFR")) {
      return new PGVendoredMove(
        new PGVendoredMoveQuantum("F", move.innerLayer, move.outerLayer),
        move.effectiveAmount,
      );
    } else if (this.child.spinmatch(move.family, "DRB")) {
      return new PGVendoredMove(
        new PGVendoredMoveQuantum("R", move.innerLayer, move.outerLayer),
        move.effectiveAmount,
      );
    } else if (this.child.spinmatch(move.family, "DFL")) {
      return new PGVendoredMove(
        new PGVendoredMoveQuantum("L", move.innerLayer, move.outerLayer),
        move.effectiveAmount,
      );
    } else if (this.child.spinmatch(move.family, "DBL")) {
      return new PGVendoredMove(
        new PGVendoredMoveQuantum("B", move.innerLayer, move.outerLayer),
        move.effectiveAmount,
      );
      /*
       *   See (1) above.
       *
    } else if (move.family === "Rv") {
      return new BlockMove(move.outerLayer, move.innerLayer, "x", move.amount);
    } else if (move.family === "Uv") {
      return new BlockMove(move.outerLayer, move.innerLayer, "y", move.amount);
    } else if (move.family === "Fv") {
      return new BlockMove(move.outerLayer, move.innerLayer, "z", move.amount);
       */
    } else {
      return null;
    }
  }
}

export class PyraminxNotationMapper implements NotationMapper {
  constructor(private child: FaceNameSwizzler) {}

  public notationToInternal(move: PGVendoredMove): PGVendoredMove | null {
    if (move.innerLayer || move.outerLayer) {
      return null;
    }
    if (move.family === "U") {
      return new PGVendoredMove(
        new PGVendoredMoveQuantum("flr", move.innerLayer, move.outerLayer),
        move.effectiveAmount,
      );
    } else if (move.family === "R") {
      return new PGVendoredMove(
        new PGVendoredMoveQuantum("fld", move.innerLayer, move.outerLayer),
        move.effectiveAmount,
      );
    } else if (move.family === "L") {
      return new PGVendoredMove(
        new PGVendoredMoveQuantum("frd", move.innerLayer, move.outerLayer),
        move.effectiveAmount,
      );
    } else if (move.family === "B") {
      return new PGVendoredMove(
        new PGVendoredMoveQuantum("dlr", move.innerLayer, move.outerLayer),
        move.effectiveAmount,
      );
    } else if (move.family === "u") {
      return new PGVendoredMove(
        new PGVendoredMoveQuantum("FLR", move.innerLayer, move.outerLayer),
        move.effectiveAmount,
      );
    } else if (move.family === "r") {
      return new PGVendoredMove(
        new PGVendoredMoveQuantum("FLD", move.innerLayer, move.outerLayer),
        move.effectiveAmount,
      );
    } else if (move.family === "l") {
      return new PGVendoredMove(
        new PGVendoredMoveQuantum("FRD", move.innerLayer, move.outerLayer),
        move.effectiveAmount,
      );
    } else if (move.family === "b") {
      return new PGVendoredMove(
        new PGVendoredMoveQuantum("DLR", move.innerLayer, move.outerLayer),
        move.effectiveAmount,
      );
    } else if (move.family === "y") {
      return negate("Dv", move.effectiveAmount);
    } else {
      return null;
    }
  }

  // we never rewrite click moves to these moves.
  public notationToExternal(move: PGVendoredMove): PGVendoredMove | null {
    if (move.family === move.family.toLowerCase()) {
      const fam = move.family.toUpperCase();
      if (this.child.spinmatch(fam, "FLR")) {
        return new PGVendoredMove(
          new PGVendoredMoveQuantum("U", move.innerLayer, move.outerLayer),
          move.effectiveAmount,
        );
      } else if (this.child.spinmatch(fam, "FLD")) {
        return new PGVendoredMove(
          new PGVendoredMoveQuantum("R", move.innerLayer, move.outerLayer),
          move.effectiveAmount,
        );
      } else if (this.child.spinmatch(fam, "FRD")) {
        return new PGVendoredMove(
          new PGVendoredMoveQuantum("L", move.innerLayer, move.outerLayer),
          move.effectiveAmount,
        );
      } else if (this.child.spinmatch(fam, "DLR")) {
        return new PGVendoredMove(
          new PGVendoredMoveQuantum("B", move.innerLayer, move.outerLayer),
          move.effectiveAmount,
        );
      }
    }
    if (move.family === move.family.toUpperCase()) {
      if (this.child.spinmatch(move.family, "FLR")) {
        return new PGVendoredMove(
          new PGVendoredMoveQuantum("u", move.innerLayer, move.outerLayer),
          move.effectiveAmount,
        );
      } else if (this.child.spinmatch(move.family, "FLD")) {
        return new PGVendoredMove(
          new PGVendoredMoveQuantum("r", move.innerLayer, move.outerLayer),
          move.effectiveAmount,
        );
      } else if (this.child.spinmatch(move.family, "FRD")) {
        return new PGVendoredMove(
          new PGVendoredMoveQuantum("l", move.innerLayer, move.outerLayer),
          move.effectiveAmount,
        );
      } else if (this.child.spinmatch(move.family, "DLR")) {
        return new PGVendoredMove(
          new PGVendoredMoveQuantum("b", move.innerLayer, move.outerLayer),
          move.effectiveAmount,
        );
      }
    }
    if (move.family === "Dv") {
      return negate("y", move.effectiveAmount);
    } else {
      return null;
    }
  }
}
