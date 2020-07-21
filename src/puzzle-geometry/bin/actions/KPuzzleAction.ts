import { PuzzleAction } from "../PuzzleAction";

export class KPuzzleAction extends PuzzleAction {
  public constructor() {
    super({
      actionName: "kpuzzle",
      summary: "Generate a KPuzzle file.",
      documentation: "// TODO",
    });
  }

  protected async onExecute(): Promise<void> {
    console.log(JSON.stringify(this.getPuzzleGeometry().writekpuzzle()));
  }
}
