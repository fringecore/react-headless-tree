import React, {
  PropsWithChildren,
  useCallback,
  useState,
  ReactElement,
} from "react";

type TreeDataType<DATA_TYPE> = {
  data?: DATA_TYPE;
  children?: TreeDataType<DATA_TYPE>[];
};

type Props<DATA_TYPE> = {
  data?: TreeDataType<DATA_TYPE>;
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
  depth?: number;
};

export default function HeadlessTree<DATA>({
  data,
  node: Node,
  depth = 0,
}: Props<DATA>) {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const onToggle = useCallback(() => {
    setIsOpen((isOpen) => !isOpen);
  }, [setIsOpen]);

  return (
    <>
      {data?.data && (
        <Node
          depth={depth}
          data={data.data}
          isOpen={isOpen}
          setOpen={setIsOpen}
          onOpen={onOpen}
          onClose={onClose}
          onToggle={onToggle}
        >
          {(data?.children ?? []).map((child) => (
            <HeadlessTree depth={depth + 1} node={Node} data={child} />
          ))}
        </Node>
      )}
    </>
  );
}
