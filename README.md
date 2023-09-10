# react-headless-tree

[![npm version](https://badge.fury.io/js/react-headless-tree.svg)](https://www.npmjs.com/package/react-headless-tree)
[![Downloads](https://img.shields.io/npm/dm/react-headless-tree.svg)](https://www.npmjs.com/package/react-headless-tree)

The `react-headless-tree` package is a versatile React headless component designed to facilitate the creation of tree structures, akin to a file repository tree.

# Usage
This component primarily relies on two props: `data` and `node`.

## The `data` prop
The data prop represents the data structure of the tree and adheres to the following type definition:

```typescript
type TreeDataType<DATA_TYPE> = {
  data?: DATA_TYPE;
  children?: TreeDataType<DATA_TYPE>[];
};
```

This definition allows users to define the hierarchical structure of the tree with optional data elements and child nodes.

## The `node` prop
The node prop serves as a critical component for customizing the appearance and behavior of individual nodes within the tree. It is defined as follows:

```typescript
node: (
  props: PropsWithChildren<{
    data: DATA_TYPE;
    depth: number;
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onToggle: () => void;
    setOpen: (isOpen: boolean) => void;
  }>
) => ReactElement;
```
This prop enables users to implement their unique tree designs by providing a custom React component. The node component receives essential information about the node, such as its data, depth within the tree, open/closed state, and functions for handling node interactions.

With the flexibility of the node prop, users can seamlessly tailor the appearance and behavior of their tree structures to suit their specific application requirements.
