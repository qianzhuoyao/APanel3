/**
 *
 * root:{
 * id:'root',
 * x:0,
 * y:0,
 * w:96,
 * y:51,
 * z:1,
 * gridSize:[20,20],
 * state:{}
 * event:{}
 * subPNodes:[
 *{
 * gridSize:[10,10],
 * state:{}
 * event:{}
 * id:'subnode1',
 * x:0,
 * y:0,
 * w:1,
 * y:1,
 * z:1,
 * subPNodes:[]
 *}
 * ]
 * }
 */
export interface PNodeType {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  z: number;
  containerGridSize: [number, number];
  state: Record<string, any>;
  event: Record<string, any>;
  subPNodes: PNodeType[];
}

export const createPNode = () => {};
