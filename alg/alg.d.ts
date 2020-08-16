type ReportingLevel = "none" | "warn" | "error";
export function setAlgPartTypeMismatchReportingLevel(level: ReportingLevel): void;
type AlgPartType = string;
export abstract class AlgPart {
    abstract type: AlgPartType;
}
export abstract class Unit extends AlgPart {
}
export abstract class Move extends Unit {
}
export abstract class Annotation extends Unit {
}
export abstract class Container extends Unit {
}
export class Sequence extends AlgPart {
    nestedUnits: Unit[];
    type: string;
    constructor(nestedUnits: Unit[]);
}
export interface WithAmount {
    amount: number;
}
export class Group extends Container implements WithAmount {
    nestedSequence: Sequence;
    amount: number;
    type: string;
    constructor(nestedSequence: Sequence, amount?: number);
}
export class Commutator extends Container implements WithAmount {
    A: Sequence;
    B: Sequence;
    amount: number;
    type: string;
    constructor(A: Sequence, B: Sequence, amount?: number);
}
export class Conjugate extends Container implements WithAmount {
    A: Sequence;
    B: Sequence;
    amount: number;
    type: string;
    constructor(A: Sequence, B: Sequence, amount?: number);
}
export class Pause extends Move {
    type: string;
    constructor();
}
export class NewLine extends Annotation {
    type: string;
    constructor();
}
export class Comment extends Annotation {
    comment: string;
    type: string;
    constructor(comment: string);
}
interface BlockMoveModifications {
    outerLayer?: number;
    innerLayer?: number;
    family?: string;
    amount?: number;
}
export function modifiedBlockMove(original: BlockMove, modifications: BlockMoveModifications): BlockMove;
export function experimentalAppendBlockMove(s: Sequence, newMove: BlockMove, coalesceLastMove?: boolean, mod?: number): Sequence;
export function experimentalConcatAlgs(...args: Sequence[]): Sequence;
export abstract class TraversalDownUp<DataDown, DataUp> {
    traverse(algPart: AlgPart, dataDown: DataDown): DataUp;
    traverseIntoUnit(algPart: AlgPart, dataDown: DataDown): Unit;
    traverseSequence(sequence: Sequence, dataDown: DataDown): DataUp;
    traverseGroup(group: Group, dataDown: DataDown): DataUp;
    traverseBlockMove(blockMove: BlockMove, dataDown: DataDown): DataUp;
    traverseCommutator(commutator: Commutator, dataDown: DataDown): DataUp;
    traverseConjugate(conjugate: Conjugate, dataDown: DataDown): DataUp;
    traversePause(pause: Pause, dataDown: DataDown): DataUp;
    traverseNewLine(newLine: NewLine, dataDown: DataDown): DataUp;
    traverseComment(comment: Comment, dataDown: DataDown): DataUp;
}
export abstract class TraversalUp<DataUp> extends TraversalDownUp<undefined, DataUp> {
    traverse(algPart: AlgPart): DataUp;
    traverseIntoUnit(algPart: AlgPart): Unit;
    traverseSequence(sequence: Sequence): DataUp;
    traverseGroup(group: Group): DataUp;
    traverseBlockMove(blockMove: BlockMove): DataUp;
    traverseCommutator(commutator: Commutator): DataUp;
    traverseConjugate(conjugate: Conjugate): DataUp;
    traversePause(pause: Pause): DataUp;
    traverseNewLine(newLine: NewLine): DataUp;
    traverseComment(comment: Comment): DataUp;
}
export function blockMoveToString(blockMove: BlockMove): string;
export const invert: (a: Sequence) => Sequence;
export const expand: (a: Sequence) => Sequence;
export const structureEquals: (a1: Sequence, a2: Sequence) => boolean;
export const coalesceBaseMoves: (a: Sequence) => Sequence;
export const algToString: (a: Sequence) => string;
export const algPartToStringForTesting: (a: AlgPart) => string;
export interface AlgJSON {
    type: string;
    nestedSequence?: AlgJSON;
    nestedUnits?: AlgJSON[];
    innerLayer?: number;
    outerLayer?: number;
    family?: string;
    amount?: number;
    A?: AlgJSON;
    B?: AlgJSON;
    comment?: string;
}
export function fromJSON(json: AlgJSON): Sequence;
export class ValidationError extends Error {
}
type Validator = (a: Sequence) => void;
export const validateSiGNMoves: Validator;
export const validateFlatAlg: Validator;
export function validateSiGNAlg(a: Sequence): void;
interface ParseOptions {
    validators?: Validator[];
}
export function parse(s: string, options?: ParseOptions): Sequence;
export function keyToMove(e: KeyboardEvent): BlockMove | null;
export function serializeURLParam(a: Sequence): string;
export function deserializeURLParam(a: string): Sequence;
export function getAlgURLParam(name: string): Sequence;
interface AlgCubingNetOptions {
    alg?: Sequence;
    setup?: Sequence;
    title?: string;
    puzzle?: "1x1x1" | "2x2x2" | "3x3x3" | "4x4x4" | "5x5x5" | "6x6x6" | "7x7x7" | "8x8x8" | "9x9x9" | "10x10x10" | "11x11x11" | "12x12x12" | "13x13x13" | "14x14x14" | "16x16x16" | "17x17x17";
    stage?: "full" | "cross" | "F2L" | "LL" | "OLL" | "PLL" | "CLS" | "ELS" | "L6E" | "CMLL" | "WV" | "ZBLL" | "void";
    view?: "editor" | "playback" | "fullscreen";
    type?: "moves" | "reconstruction" | "alg" | "reconstruction-end-with-setup";
}
export function algCubingNetLink(options: AlgCubingNetOptions): string;

//# sourceMappingURL=index.d.ts.map
