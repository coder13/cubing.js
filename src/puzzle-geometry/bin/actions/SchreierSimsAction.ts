import {
  CommandLineFlagParameter,
  CommandLineChoiceParameter,
} from "@rushstack/ts-command-line";
import { PuzzleAction } from "../PuzzleAction";

export class SchreierSimsAction extends PuzzleAction {
  protected allMoves: CommandLineFlagParameter;
  protected puzzle: CommandLineChoiceParameter;

  public constructor() {
    super({
      actionName: "schreier-sims",
      summary: "Runs a calculation using the Schreier-Sims algorithm",
      documentation:
        "For more details, see: https://en.wikipedia.org/wiki/Schreier%E2%80%93Sims_algorithm",
    });
  }

  protected async onExecute(): Promise<void> {
    console.log("PushAction implementation goes here.", {
      allMoves: this.allMoves.value,
      puzzle: this.puzzle.value,
    });
  }
}
