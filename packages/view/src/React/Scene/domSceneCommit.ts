import { BaseNode } from "@repo/model/NodeManager/type";

const createNode = (node: BaseNode) => {};
const deleteNode = (condition: (node: BaseNode) => boolean) => {};
const updateNode = (update: (node: BaseNode) => BaseNode) => {};
const queryNodes = (condition: (node: BaseNode) => boolean) => {};
