import { networkTypes } from './types';
import * as nodes from './nodes';

const nodeList = Object.fromEntries(
  Object.values(networkTypes).map(type => [
    type.name,
    Object.values(nodes).filter(node => node.type === type)
  ])
);

export default nodeList;
