import { PuzzleAction } from "../PuzzleAction";
import { CommandLineFlagParameter } from "@rushstack/ts-command-line";

export class SVGAction extends PuzzleAction {
  protected svg3D: CommandLineFlagParameter;

  public constructor() {
    super({
      actionName: "svg",
      summary: "Generate an SVG for the puzzle.",
      documentation: "// TODO",
    });
  }

  protected onDefineParameters(): void {
    super.onDefineParameters();

    this.svg3D = this.defineFlagParameter({
      parameterLongName: "--3d",
      description: "Use a 3D perspective.",
    });
  }

  protected async onExecute(): Promise<void> {
    console.log(this.getPuzzleGeometry().generatesvg());
  }
}
