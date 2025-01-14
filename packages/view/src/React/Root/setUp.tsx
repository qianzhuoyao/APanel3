import { Button, CardBody, Input, Slider, Tooltip } from "@nextui-org/react";

import { Card } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import { memo, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setScale } from "../Store/sceneStore";

const Add = memo(() => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
  >
    <path
      fill="#1b1b1f"
      d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1"
    />
  </svg>
));
const Subtract = memo(() => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 16 16"
  >
    <path
      fill="#1b1b1f"
      d="M3 8a.75.75 0 0 1 .75-.75h8.5a.75.75 0 0 1 0 1.5h-8.5A.75.75 0 0 1 3 8"
    />
  </svg>
));

const Undo = memo(() => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
  >
    <path
      fill="#1b1b1f"
      d="M8 19q-.425 0-.712-.288T7 18t.288-.712T8 17h6.1q1.575 0 2.738-1T18 13.5T16.838 11T14.1 10H7.8l1.9 1.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275L4.7 9.7q-.15-.15-.213-.325T4.426 9t.063-.375T4.7 8.3l3.6-3.6q.275-.275.7-.275t.7.275t.275.7t-.275.7L7.8 8h6.3q2.425 0 4.163 1.575T20 13.5t-1.737 3.925T14.1 19z"
    />
  </svg>
));

const Redo = memo(() => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
  >
    <path
      fill="#1b1b1f"
      d="M16.2 10H9.9q-1.575 0-2.738 1T6 13.5T7.163 16T9.9 17H16q.425 0 .713.288T17 18t-.288.713T16 19H9.9q-2.425 0-4.163-1.575T4 13.5t1.738-3.925T9.9 8h6.3l-1.9-1.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l3.6 3.6q.15.15.213.325t.062.375t-.062.375t-.213.325l-3.6 3.6q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7z"
    />
  </svg>
));

export const SetUp = ({ level }: { level: number }) => {
  const setUpOperator = useMemo(
    () => [
      {
        id: 0,
        name: "回滚操作",
        icon: <Undo />,
      },
      {
        id: 1,
        name: "撤销操作",
        icon: <Redo />,
      },
    ],
    []
  );

  const [isSliderVisible, setIsSliderVisible] = useState(false);

  const dispatch = useDispatch();

  const scale = useSelector(
    (state: { scene: { scale: number } }) => state.scene.scale
  );

  return (
    <div
      style={{ zIndex: level }}
      className="absolute left-2 bottom-2 flex items-center"
    >
      <div className="mr-2 relative">
        <div className="absolute left-0 bottom-11">
          <AnimatePresence initial={false}>
            {isSliderVisible && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                key="mapTreeBox"
              >
                <Card className="w-[200px] text-base " shadow="sm" radius="sm">
                  <CardBody className="p-2 h-[45px] overflow-hidden flex items-center justify-center">
                    <Slider
                      size="sm"
                      value={scale}
                      label=""
                      maxValue={10}
                      minValue={0.1}
                      step={0.01}
                      onChange={(e) => {
                        if (typeof e === "number") {
                          dispatch(setScale(e));
                        }
                      }}
                    />
                  </CardBody>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <Card className="text-base " shadow="sm" radius="sm">
          <CardBody className="p-1">
            <Input
              label=""
              size="sm"
              radius="sm"
              labelPlacement="outside"
              classNames={{
                inputWrapper: "p-0 w-[150px]",
                input: "text-center",
              }}
              value={`${(scale * 100).toFixed(0)}`}
              onChange={(e) => {
                dispatch(setScale(Number(e.target.value) / 100));
              }}
              placeholder="比例"
              startContent={
                <motion.div whileTap={{ y: 1 }}>
                  <Button
                    color="primary"
                    variant={"light"}
                    radius="sm"
                    size="sm"
                    isIconOnly
                    aria-label="subtract"
                    onPress={() => {
                      dispatch(setScale(scale - 0.1));
                    }}
                  >
                    <Subtract />
                  </Button>
                </motion.div>
              }
              endContent={
                <>
                  <label className="sr-only" htmlFor="currency">
                    Currency
                  </label>

                  <span
                    className="cursor-pointer"
                    onClick={() => setIsSliderVisible(!isSliderVisible)}
                  >
                    %
                  </span>

                  <motion.div whileTap={{ y: 1 }}>
                    <Button
                      color="primary"
                      variant={"light"}
                      radius="sm"
                      size="sm"
                      isIconOnly
                      aria-label="add"
                      onPress={() => {
                        dispatch(setScale(scale + 0.1));
                      }}
                    >
                      <Add />
                    </Button>
                  </motion.div>
                </>
              }
              type="number"
            />
          </CardBody>
        </Card>
      </div>

      <Card className="text-base" shadow="sm" radius="sm">
        <CardBody className="p-1">
          <div className="flex items-center">
            {setUpOperator.map((item) => (
              <Tooltip key={item.id} content={item.name}>
                <motion.div whileTap={{ y: 1 }}>
                  <Button
                    color="primary"
                    variant={"light"}
                    radius="sm"
                    size="sm"
                    isIconOnly
                    aria-label={item.name}
                    className="mr-1"
                  >
                    {item.icon}
                  </Button>
                </motion.div>
              </Tooltip>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
