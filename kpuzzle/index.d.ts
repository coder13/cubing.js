export function Combine(def: KPuzzleDefinition, t1: Transformation, t2: Transformation): Transformation;
export function Multiply(def: KPuzzleDefinition, t: Transformation, amount: number): Transformation;
export function IdentityTransformation(definition: KPuzzleDefinition): Transformation;
export function Invert(def: KPuzzleDefinition, t: Transformation): Transformation;
export function Order(def: KPuzzleDefinition, t: Transformation): number;
export function EquivalentTransformations(def: KPuzzleDefinition, t1: Transformation, t2: Transformation): boolean;
export function EquivalentStates(def: KPuzzleDefinition, t1: Transformation, t2: Transformation): boolean;
declare class MoveExpander {
    constructor();
    setFaceNames(fn: string[]): void;
    addGrip(grip1: string, grip2: string, nslices: number, def: KPuzzleDefinition): void;
    expandSlicesByName(mv: string, def: KPuzzleDefinition): Transformation | undefined;
    unswizzle(grip: string): string;
    expandSlices(rep: string, blockMove: BlockMove, def: KPuzzleDefinition): Transformation | undefined;
}
interface OrbitTransformation {
    permutation: number[];
    orientation: number[];
}
export interface Transformation {
    [/* orbit name */ key: string]: OrbitTransformation;
}
interface OrbitDefinition {
    numPieces: number;
    orientations: number;
}
export interface KPuzzleDefinition {
    name: string;
    orbits: {
        [/* orbit name */ key: string]: OrbitDefinition;
    };
    startPieces: Transformation;
    moves: {
        [/* move name */ key: string]: Transformation;
    };
    svg?: string;
    moveExpander?: MoveExpander;
}
export function stateForBlockMove(def: KPuzzleDefinition, blockMove: BlockMove): Transformation;
export class KPuzzle {
    definition: KPuzzleDefinition;
    state: Transformation;
    constructor(definition: KPuzzleDefinition);
    reset(): void;
    serialize(): string;
    applyBlockMove(blockMove: BlockMove): void;
    applyAlg(a: Sequence): void;
    applyMove(moveName: string): this;
    getMoveExpander(create: boolean): MoveExpander | undefined;
    setFaceNames(faceNames: string[]): void;
    addGrip(grip1: string, grip2: string, nslices: number): void;
    expandSlices(rep: string, blockMove: BlockMove): Transformation | undefined;
    expandSlicesByName(mv: string): Transformation | undefined;
    unswizzle(grip: string): string;
}
declare class InternalMove {
    base: number;
    twist: number;
    constructor(base: number, twist: number);
    getTransformation(canon: Canonicalize): Transformation;
    asString(canon: Canonicalize): string;
}
export class Canonicalize {
    def: KPuzzleDefinition;
    commutes: boolean[][];
    moveorder: number[];
    movenames: string[];
    transforms: Transformation[][];
    moveindex: {
        [key: string]: number;
    };
    baseMoveCount: number;
    constructor(def: KPuzzleDefinition);
    blockMoveToInternalMove(mv: BlockMove): InternalMove;
    sequenceToSearchSequence(s: Sequence, tr?: Transformation): SearchSequence;
    mergeSequenceToSearchSequence(s: Sequence, tr?: Transformation): SearchSequence;
}
export class SearchSequence {
    moveseq: InternalMove[];
    trans: Transformation;
    constructor(canon: Canonicalize, tr?: Transformation);
    clone(): SearchSequence;
    mergeOneMove(mv: InternalMove): number;
    appendOneMove(mv: InternalMove): number;
    popMove(): number;
    oneMoreTwist(): number;
    mergeSequence(seq: SearchSequence): number;
    getSequenceAsString(): string;
}
export class CanonicalSequenceIterator {
    canon: Canonicalize;
    ss: SearchSequence;
    targetLength: number;
    constructor(canon: Canonicalize, state?: Transformation);
    nextState(base: number, canonstate: number[]): null | number[];
    genSequence(togo: number, canonstate: number[]): Generator<SearchSequence, null, void>;
    generator(): Generator<SearchSequence, SearchSequence, void>;
    genSequenceTree(canonstate: number[]): Generator<SearchSequence, null, number>;
}
export const Puzzles: {
    [key: string]: KPuzzleDefinition;
};
export const parse: (s: string) => KPuzzleDefinition;
export class SVG {
    kPuzzleDefinition: KPuzzleDefinition;
    element: HTMLElement;
    gradientDefs: SVGDefsElement;
    constructor(kPuzzleDefinition: KPuzzleDefinition);
    drawKPuzzle(kpuzzle: KPuzzle, nextState?: Transformation, fraction?: number): void;
    draw(definition: KPuzzleDefinition, state: Transformation, nextState?: Transformation, fraction?: number): void;
}

//# sourceMappingURL=index.d.ts.map
