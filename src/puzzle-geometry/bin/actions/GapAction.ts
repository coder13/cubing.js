import { PuzzleAction } from "../PuzzleAction";

export class GapAction extends PuzzleAction {
  public constructor() {
    super({
      actionName: "gap",
      summary: "Generate GAP code for the puzzle.",
      documentation: "// TODO",
    });
  }

  protected async onExecute(): Promise<void> {
    console.log(this.getPuzzleGeometry().writegap());
  }
}
