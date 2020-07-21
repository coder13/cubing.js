import {
  CommandLineFlagParameter,
  CommandLineParser,
} from "@rushstack/ts-command-line";
import { SchreierSimsAction } from "./actions/SchreierSimsAction";
import { GapAction } from "./actions/GapAction";
import { KPuzzleAction } from "./actions/KPuzzleAction";
import { SVGAction } from "./actions/SVGAction";

export class PuzzleGeometryCommandLine extends CommandLineParser {
  protected verbose: CommandLineFlagParameter;

  public constructor() {
    super({
      toolFilename: "puzzle-geometry",
      toolDescription: "Puzzle Geometry helper tool.",
    });

    this.addAction(new KPuzzleAction());
    this.addAction(new SVGAction());
    this.addAction(new SchreierSimsAction());
    this.addAction(new GapAction());
  }

  protected onDefineParameters(): void {
    this.verbose = this.defineFlagParameter({
      parameterLongName: "--verbose",
      parameterShortName: "-v",
      description: "Verbose output",
    });
  }

  protected onExecute(): Promise<void> {
    // console.log("PuzzleGeometryCommandLine: onExecute", {
    //   verbose: this.verbose.value,
    // });
    return super.onExecute();
  }
}

const commandLine: PuzzleGeometryCommandLine = new PuzzleGeometryCommandLine();
commandLine.execute();
