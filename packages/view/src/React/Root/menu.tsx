import { Button, Card, CardBody, Divider, Tooltip } from "@nextui-org/react";
import { memo, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActionMode, setIsLock } from "../Store/sceneStore";
import { motion } from "framer-motion";
import { ACTION_MODE } from "./actionConstant";
import { IActionMode } from "./type";

const Iframe = memo(({ fill }: { fill?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
  >
    <path
      fill={fill}
      d="M11.5 13.5h5v-2h-5zM11 15q-.425 0-.712-.288T10 14v-3q0-.425.288-.712T11 10h6q.425 0 .713.288T18 11v3q0 .425-.288.713T17 15zm-7 5q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm0-2h16V8H4z"
    />
  </svg>
));

const Line = memo(({ fill }: { fill?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
  >
    <path
      fill={fill}
      fillRule="evenodd"
      d="M1 10a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H2a1 1 0 0 1-1-1"
      clipRule="evenodd"
    />
  </svg>
));

const Image = memo(({ fill }: { fill?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
  >
    <path
      fill={fill}
      d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm0-2h14V5H5zm0 0V5zm2-2h10q.3 0 .45-.275t-.05-.525l-2.75-3.675q-.15-.2-.4-.2t-.4.2L11.25 16L9.4 13.525q-.15-.2-.4-.2t-.4.2l-2 2.675q-.2.25-.05.525T7 17"
    />
  </svg>
));

const Triangle = memo(({ fill }: { fill?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
  >
    <path
      fill="none"
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M10.363 3.591L2.257 17.125a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636-2.87L13.637 3.59a1.914 1.914 0 0 0-3.274 0z"
    />
  </svg>
));

const Text = memo(({ fill }: { fill?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
  >
    <g fill="none">
      <path
        fill={fill}
        fillRule="evenodd"
        d="M7.934 2h8.132c.886 0 1.65 0 2.262.082c.655.088 1.284.287 1.793.797c.51.51.709 1.138.797 1.793C21 5.284 21 6.048 21 6.934V7.95a1 1 0 1 1-2 0V7c0-.971-.002-1.599-.064-2.061c-.059-.434-.153-.57-.229-.646s-.212-.17-.646-.229C17.6 4.002 16.971 4 16 4h-3v17a1 1 0 1 1-2 0V4H8c-.971 0-1.599.002-2.061.064c-.434.059-.57.153-.646.229s-.17.212-.229.646C5.002 5.4 5 6.029 5 7v.95a1 1 0 1 1-2 0V6.934c0-.886 0-1.65.082-2.262c.088-.655.287-1.284.797-1.793c.51-.51 1.138-.709 1.793-.797C6.284 2 7.048 2 7.934 2"
        clipRule="evenodd"
      />
      <path
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M7 21h10"
      />
    </g>
  </svg>
));

const Circle = memo(({ fill }: { fill?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
  >
    <path
      fill={fill}
      d="M12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"
    />
  </svg>
));

const Rhombus = memo(({ fill }: { fill?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
  >
    <path
      fill={fill}
      d="M12 2c-.5 0-1 .19-1.41.59l-8 8c-.79.78-.79 2.04 0 2.82l8 8c.78.79 2.04.79 2.82 0l8-8c.79-.78.79-2.04 0-2.82l-8-8C13 2.19 12.5 2 12 2m0 2l8 8l-8 8l-8-8Z"
    />
  </svg>
));

const Rect = memo(({ fill }: { fill?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 256 256"
  >
    <path
      fill={fill}
      d="M216 36H40a20 20 0 0 0-20 20v144a20 20 0 0 0 20 20h176a20 20 0 0 0 20-20V56a20 20 0 0 0-20-20m-4 160H44V60h168Z"
    />
  </svg>
));

const Mouse = memo(({ fill }: { fill?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
  >
    <path
      fill="none"
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.4"
      d="m6.244 3.114l12.298 8.66A.693.693 0 0 1 18.346 13l-4.62.877a.565.565 0 0 0-.334.82l2.31 4.377a.693.693 0 0 1-.22.981l-1.663.866a.693.693 0 0 1-.935-.289l-2.31-4.387a.577.577 0 0 0-.866-.232L6.325 19.27a.692.692 0 0 1-1.155-.554V3.703a.693.693 0 0 1 1.074-.589"
    />
  </svg>
));

const Hand = memo(({ fill }: { fill?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 16 16"
    >
      <path
        fill={fill}
        fillRule="evenodd"
        d="M14 10.3V4.54a1.5 1.5 0 0 0-2-1.415V2.54a1.5 1.5 0 0 0-2.052-1.395C9.775.508 9.192.035 8.498.035s-1.27.468-1.45 1.11A1.5 1.5 0 0 0 4.996 2.54v4.79l-.146-.146a1.917 1.917 0 0 0-2.71 2.71l3.76 3.76a4.737 4.737 0 0 0 8.09-3.35zM8.5 1.04a.5.5 0 0 0-.5.5v5a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.854.354l-1-1a.91.91 0 0 0-1.29 0a.91.91 0 0 0 0 1.29l3.76 3.76a3.741 3.741 0 0 0 6.39-2.64v-5.76a.5.5 0 0 0-1 0v2a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-1 0v4a.5.5 0 0 1-1 0v-5a.5.5 0 0 0-.5-.5z"
        clipRule="evenodd"
      />
    </svg>
  );
});

const Unlock = memo(({ fill }: { fill?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
  >
    <path
      fill={fill}
      d="M17 9H9V7a3 3 0 0 1 5.12-2.13a3.1 3.1 0 0 1 .78 1.38a1 1 0 1 0 1.94-.5a5.1 5.1 0 0 0-1.31-2.29A5 5 0 0 0 7 7v2a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-7a3 3 0 0 0-3-3m1 10a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1Z"
    />
  </svg>
));

const Lock = memo(({ fill }: { fill?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
  >
    <path
      fill={fill}
      d="M6 22q-.825 0-1.412-.587T4 20V10q0-.825.588-1.412T6 8h1V6q0-2.075 1.463-3.537T12 1t3.538 1.463T17 6v2h1q.825 0 1.413.588T20 10v10q0 .825-.587 1.413T18 22zm0-2h12V10H6zm6-3q.825 0 1.413-.587T14 15t-.587-1.412T12 13t-1.412.588T10 15t.588 1.413T12 17M9 8h6V6q0-1.25-.875-2.125T12 3t-2.125.875T9 6zM6 20V10z"
    />
  </svg>
));

export const Menu = ({ level }: { level: number }) => {
  const dispatch = useDispatch();

  const isLock = useSelector(
    (state: { scene: { isLock: boolean } }) => state.scene.isLock
  );
  const actionMode = useSelector(
    (state: { scene: { actionMode: IActionMode } }) => state.scene.actionMode
  );

  const operator = useMemo(
    () => [
      {
        id: ACTION_MODE.HAND,
        name: "幕布拖拽",
        icon: (fill: string) => <Hand fill={fill} />,
      },
      {
        id: ACTION_MODE.MOUSE,
        name: "选择",
        icon: (fill: string) => <Mouse fill={fill} />,
      },
      {
        id: ACTION_MODE.RECT,
        name: "矩形",
        icon: (fill: string) => <Rect fill={fill} />,
      },
      {
        id: ACTION_MODE.RHOMBUS,
        name: "菱形",
        icon: (fill: string) => <Rhombus fill={fill} />,
      },
      {
        id: ACTION_MODE.CIRCLE,
        name: "圆形",
        icon: (fill: string) => <Circle fill={fill} />,
      },
      {
        id: ACTION_MODE.TRIANGLE,
        name: "三角形",
        icon: (fill: string) => <Triangle fill={fill} />,
      },
      {
        id: ACTION_MODE.TEXT,
        name: "文本",
        icon: (fill: string) => <Text fill={fill} />,
      },
      {
        id: ACTION_MODE.IMAGE,
        name: "图片",
        icon: (fill: string) => <Image fill={fill} />,
      },
      {
        id: ACTION_MODE.LINE,
        name: "线条",
        icon: (fill: string) => <Line fill={fill} />,
      },
      {
        id: ACTION_MODE.IFRAME,
        name: "网页",
        icon: (fill: string) => <Iframe fill={fill} />,
      },
    ],
    []
  );

  return (
    <div
      className="absolute left-[50%] top-2 translate-x-[-50%]"
      style={{ zIndex: level }}
    >
      <Card className="text-base" shadow="sm" radius="sm">
        <CardBody className="p-1">
          <div className="flex items-center">
            <Button
              color={"primary"}
              variant={isLock ? "solid" : "light"}
              radius="sm"
              size="sm"
              isIconOnly
              aria-label={isLock ? "unlock" : "lock"}
              onPress={() => {
                dispatch(setIsLock(!isLock));
              }}
            >
              {!isLock ? <Unlock fill="#1b1b1f" /> : <Lock fill="#ffffff" />}
            </Button>
            <Divider orientation="vertical" className="h-[32px] mx-1" />
            {operator.map((item) => (
              <Tooltip key={item.id} content={item.name}>
                <motion.div whileTap={{ y: 1 }}>
                  <Button
                    color="primary"
                    variant={actionMode === item.id ? "solid" : "light"}
                    radius="sm"
                    size="sm"
                    isIconOnly
                    aria-label={item.name}
                    className="mr-1"
                    onPress={() => {
                      dispatch(setActionMode(item.id));
                    }}
                  >
                    {item.icon(actionMode === item.id ? "#ffffff" : "#1b1b1f")}
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
