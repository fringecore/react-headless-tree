import { PropsWithChildren, ReactElement, useCallback, useState } from "react";

const data: TreeDataType<DataType> = {
  data: {
    name: "Ad-Iq",
    type: "directory",
  },
  children: [
    {
      data: {
        name: "src",
        type: "directory",
      },
      children: [
        {
          data: {
            name: "index.mts",
            type: "file",
            size: "2kb",
          },
        },
        {
          data: {
            name: "config",
            type: "directory",
          },
          children: [
            {
              data: {
                name: "typescriptConfig.json",
                type: "file",
                size: "303b",
              },
            },
            {
              data: {
                name: "src",
                type: "directory",
              },
              children: [
                {
                  data: {
                    name: "index.mts",
                    type: "file",
                    size: "2kb",
                  },
                },
                {
                  data: {
                    name: "config",
                    type: "directory",
                    size: "303b",
                  },
                  children: [
                    {
                      data: {
                        name: "typescriptConfig.json",
                        type: "file",
                        size: "303b",
                      },
                    },
                    {
                      data: {
                        name: "tailwindConfig.json",
                        type: "file",
                        size: "303b",
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      data: {
        name: "assets",
        type: "directory",
      },
      children: [
        {
          data: {
            name: "logo.png",
            type: "file",
            size: "2mb",
          },
        },
        {
          data: {
            name: "moto-sans.ttf",
            type: "file",
            size: "500kb",
          },
        },
      ],
    },
    {
      data: {
        name: ".gitignore",
        type: "file",
        size: "30b",
      },
    },
  ],
};

type DataType = {
  name: string;
  type: "file" | "directory";
  size?: string;
};

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

function Node({
  data,
  isOpen,
  onToggle,
  children,
}: PropsWithChildren<{
  data: DataType;
  depth: number;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
  setOpen: (isOpen: boolean) => void;
}>) {
  return (
    <div style={{ paddingLeft: "10px" }}>
      <div onClick={onToggle}>
        {data.type === "directory" ? isOpen ? "⬆️" : "➡️" : <></>} {data.name}
      </div>
      {isOpen ? <div>{children}</div> : null}
    </div>
  );
}

export function HeadlessTree<DATA>({
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

function Index() {
  return (
    <>
      <HeadlessTree data={data} node={Node} />
    </>
  );
}

export default Index;
