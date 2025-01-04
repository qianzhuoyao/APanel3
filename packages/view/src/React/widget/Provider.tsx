import { useEffect, useState } from "react";
import { useSyncMode } from "../hooks/useSyncMode";
import { drawer } from "../paint";
import * as Uuid from "uuid";
import { useClickBody } from "../hooks/useClickBody";
import { getModel } from "../block";

export const Provider = () => {
  const [data, setData] = useState<
    {
      width: number;
      height: number;
      left: number;
      top: number;
      "data-bind-name": string;
      "data-bind-group-id": string;
    }[]
  >([]);

  const setRef = useSyncMode();

  useClickBody(() => {
    console.log('handlerId-4')
    getModel().map((value) => {
      if (value.block.handler) {
        value.block.handler = value.block.handler?.setSelected(false);
      }
    });
  });

  useEffect(() => {
    const s = drawer({
      onDrawFinish: (DOMRect, e) => {
        const groupId = Uuid.v4();
        setData((a) =>
          a.concat([
            {
              ...DOMRect,
              "data-bind-name": groupId,
              "data-bind-group-id": groupId,
            },
          ])
        );
      },
    });
    return () => {
      s.unsubscribe();
    };
  }, []);

  return (
    <>
      {data.map((d, index) => (
        <div
          key={index}
          style={{
            width: d.width + "px",
            height: d.height + "px",
            left: d.left + "px",
            top: d.top + "px",
          }}
          ref={setRef}
          data-bind-name={d["data-bind-name"]}
          data-bind-group-id={d["data-bind-group-id"]}
        ></div>
      ))}
    </>
  );
};
