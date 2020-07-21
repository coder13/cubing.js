import {
  CommandLineAction,
  CommandLineChoiceParameter,
  CommandLineFlagParameter,
  CommandLineStringParameter,
} from "@rushstack/ts-command-line";
import { Puzzles } from "../Puzzles";
import {
  PuzzleGeometry,
  getPuzzleGeometryByName,
  getPuzzleGeometryByDesc,
} from "../PuzzleGeometry";

export abstract class PuzzleAction extends CommandLineAction {
  protected allMoves: CommandLineFlagParameter;
  protected puzzle: CommandLineChoiceParameter;
  protected puzzleDescription: CommandLineStringParameter;

  protected onDefineParameters(): void {
    this.allMoves = this.defineFlagParameter({
      parameterLongName: "--all-moves",
      description: "Includes all moves (i.e. slice moves for 3x3x3).",
    });

    this.puzzle = this.defineChoiceParameter({
      parameterLongName: "--puzzle-name",
      parameterShortName: "-p",
      description: "// TODO",
      alternatives: Object.keys(Puzzles),
    });

    this.puzzleDescription = this.defineStringParameter({
      argumentName: "DESCRIPTION",
      parameterLongName: "--puzzle-description",
      description: "// TODO",
    });
  }

  protected getPuzzleGeometry(): PuzzleGeometry {
    if (this.puzzle.value) {
      return getPuzzleGeometryByName(this.puzzle.value);
    } else if (this.puzzleDescription.value) {
      return getPuzzleGeometryByDesc(this.puzzleDescription.value);
    } else {
      return getPuzzleGeometryByName("3x3x3");
    }
  }
}
