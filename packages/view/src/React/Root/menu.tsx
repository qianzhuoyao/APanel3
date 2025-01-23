import {
  Button,
  Card,
  CardBody,
  Divider,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
} from "@nextui-org/react";
import { memo, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActionMode, setIsLock } from "../Store/sceneStore";
import { motion } from "framer-motion";
import { ACTION_MODE } from "./actionConstant";
import { IActionMode } from "./type";

const Frame = ({ fill }: { fill?: string }) => {
  return (
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
        strokeWidth="1.5"
        d="M21 6.6H3m18 10.8H3M6.6 3v18M17.4 3v18"
      />
    </svg>
  );
};

const Slice = ({ fill }: { fill?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 32 32"
    >
      <path
        fill={fill}
        d="M27 22.142V9.858A3.992 3.992 0 1 0 22.142 5H9.858A3.992 3.992 0 1 0 5 9.858v12.284A3.992 3.992 0 1 0 9.858 27h12.284A3.992 3.992 0 1 0 27 22.142M26 4a2 2 0 1 1-2 2a2 2 0 0 1 2-2M4 6a2 2 0 1 1 2 2a2 2 0 0 1-2-2m2 22a2 2 0 1 1 2-2a2 2 0 0 1-2 2m16.142-3H9.858A4 4 0 0 0 7 22.142V9.858A4 4 0 0 0 9.858 7h12.284A4 4 0 0 0 25 9.858v12.284A3.99 3.99 0 0 0 22.142 25M26 28a2 2 0 1 1 2-2a2.003 2.003 0 0 1-2 2"
      />
    </svg>
  );
};

const Scale = memo(({ fill }: { fill?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 21 21"
    >
      <g
        fill="none"
        fillRule="evenodd"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17.5 7.5v-4h-4m-4 4v4h4m4-8l-8 8" />
        <path d="M11.5 3.5h-6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6" />
      </g>
    </svg>
  );
});

const Move = memo(({ fill }: { fill?: string }) => {
  return (
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
        d="m14 5l-2-2m0 0l-2 2m2-2v18m0 0l2-2m-2 2l-2-2m9-5l2-2m0 0l-2-2m2 2H3m0 0l2 2m-2-2l2-2"
      />
    </svg>
  );
});

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

const Arrow = ({ fill }: { fill?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 15 15"
    >
      <path
        fill={fill}
        d="M.5.5V0a.5.5 0 0 0-.5.5zm0 4H0a.5.5 0 0 0 .854.354zm4-4l.354.354A.5.5 0 0 0 4.5 0zM2.146 2.854l12 12l.708-.708l-12-12zM0 .5v4h1v-4zm.854 4.354l4-4l-.708-.708l-4 4zM4.5 0h-4v1h4z"
      />
    </svg>
  );
};

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

const Section = ({ fill }: { fill?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
    >
      <path
        fill={fill}
        d="M7 8v5h6V8zM2 3h3v1h13V3h3v3h-1v13h1v3h-3v-1H5v1H2v-3h1V6H2zm3 16v1h13v-1h1V6h-1V5H5v1H4v13zM6 7h8v4h3v7H8v-4H6zm8 7H9v3h7v-5h-2zM3 4v1h1V4zm16 0v1h1V4zm0 16v1h1v-1zM3 20v1h1v-1z"
      />
    </svg>
  );
};

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

const Start = ({ fill }: { fill?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
    >
      <path
        fill={fill}
        d="m8.85 16.825l3.15-1.9l3.15 1.925l-.825-3.6l2.775-2.4l-3.65-.325l-1.45-3.4l-1.45 3.375l-3.65.325l2.775 2.425zm3.15-.723l-3.63 2.192q-.16.079-.297.064q-.136-.016-.265-.094q-.13-.08-.196-.226t-.012-.319l.966-4.11l-3.195-2.77q-.135-.11-.178-.263t.019-.293t.165-.23q.104-.087.28-.118l4.216-.368l1.644-3.892q.068-.165.196-.238T12 5.364t.288.073t.195.238l1.644 3.892l4.215.368q.177.03.281.119q.104.088.166.229q.061.14.018.293t-.178.263l-3.195 2.77l.966 4.11q.056.171-.011.318t-.197.226q-.128.08-.265.095q-.136.015-.296-.064zm0-3.852"
      />
    </svg>
  );
};

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

const Pencil = ({ fill }: { fill?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 56 56"
    >
      <path
        fill={fill}
        d="M13.457 44.758c6.492 6.492 14.93 8.437 19.078 8.836c1.219.14 1.899-.61 1.992-1.383c.094-.82-.422-1.711-1.593-1.875c-3.75-.516-11.508-2.203-17.133-7.898c-9.188-9.211-10.922-23.133-3.422-30.633c6.094-6.07 16.242-5.297 23.719-1.266l2.437-2.367c-9.094-5.461-21.328-5.906-28.5 1.289c-8.531 8.555-7.406 24.469 3.422 35.297m34.36-33.211l1.874-1.875c.89-.89.938-2.203.024-3.047l-.61-.562c-.796-.75-2.039-.727-2.906.093l-1.851 1.899Zm-22.758 22.71l21.046-21.023l-3.492-3.468l-21.023 21l-1.945 4.476c-.188.492.304.985.82.82Zm-3.07 3.493c7.663 7.664 19.991 10.688 26.882 3.82c5.625-5.648 4.898-15.68-1.125-24.304l-2.39 2.39c4.78 7.078 5.718 15.024 1.171 19.57c-5.53 5.532-14.672 2.907-20.953-3.023Z"
      />
    </svg>
  );
};
const Pen = ({ fill }: { fill?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
    >
      <path
        fill={fill}
        fillRule="evenodd"
        d="M14.757 2.621a4.682 4.682 0 0 1 6.622 6.622l-9.486 9.486c-.542.542-.86.86-1.216 1.137q-.628.492-1.35.835c-.406.193-.834.336-1.56.578l-3.332 1.11l-.802.268a1.81 1.81 0 0 1-2.29-2.29l1.378-4.133c.242-.727.385-1.155.578-1.562q.344-.72.835-1.35c.276-.354.595-.673 1.137-1.215zM4.4 20.821l2.841-.948c.791-.264 1.127-.377 1.44-.526q.572-.274 1.073-.663c.273-.214.525-.463 1.115-1.053l7.57-7.57a7.36 7.36 0 0 1-2.757-1.744A7.36 7.36 0 0 1 13.94 5.56l-7.57 7.57c-.59.589-.84.84-1.053 1.114q-.39.5-.663 1.073c-.149.313-.262.649-.526 1.44L3.18 19.6zM15.155 4.343c.035.175.092.413.189.69a5.86 5.86 0 0 0 1.4 2.222a5.86 5.86 0 0 0 2.221 1.4c.278.097.516.154.691.189l.662-.662a3.182 3.182 0 0 0-4.5-4.5z"
        clipRule="evenodd"
      />
    </svg>
  );
};

const Grid = ({ fill }: { fill?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
    >
      <path
        fill={fill}
        d="M10 4v4h4V4zm6 0v4h4V4zm0 6v4h4v-4zm0 6v4h4v-4zm-2 4v-4h-4v4zm-6 0v-4H4v4zm0-6v-4H4v4zm0-6V4H4v4zm2 6h4v-4h-4zM4 2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4c-1.08 0-2-.9-2-2V4a2 2 0 0 1 2-2"
      />
    </svg>
  );
};
const Component = ({ fill }: { fill?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
    >
      <path
        fill={fill}
        d="M18.62 3.448h-3.448a3.448 3.448 0 0 0-6.896 0H4.828a1.38 1.38 0 0 0-1.38 1.38v3.448a3.448 3.448 0 1 0 0 6.896v3.449A1.38 1.38 0 0 0 4.828 20h4.827v-1.38a2.069 2.069 0 1 1 4.138 0V20h4.828A1.38 1.38 0 0 0 20 18.62v-4.827h-1.38a2.069 2.069 0 1 1 0-4.138H20V4.828a1.38 1.38 0 0 0-1.38-1.38m-3.448 8.276a3.45 3.45 0 0 0 3.449 3.448v3.449h-3.449a3.448 3.448 0 1 0-6.896 0H4.828v-4.828h-1.38a2.069 2.069 0 1 1 0-4.138h1.38V4.828h4.827v-1.38a2.069 2.069 0 1 1 4.138 0v1.38h4.828v3.448a3.45 3.45 0 0 0-3.449 3.448"
      />
    </svg>
  );
};
const Layout = ({ fill }: { fill?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
    >
      <path
        fill={fill}
        d="M5 8h14V5H5zm9 11v-9H5v9zm2 0h3v-9h-3zM4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1"
      />
    </svg>
  );
};
const Ruler = ({ fill }: { fill?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
    >
      <g fill="none" fillRule="evenodd">
        <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
        <path
          fill={fill}
          d="M5 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h5a2 2 0 0 0 2-2v-7h7a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm2 2v1a1 1 0 0 0 2 0V5h2v1a1 1 0 1 0 2 0V5h2v1a1 1 0 0 0 2 0V5h2v5h-7.5a1.5 1.5 0 0 0-1.5 1.5V19H5v-2h1a1 1 0 1 0 0-2H5v-2h1a1 1 0 1 0 0-2H5V9h1a1 1 0 0 0 0-2H5V5z"
        />
      </g>
    </svg>
  );
};

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

const Pixel = ({ fill }: { fill?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
    >
      <path
        fill={fill}
        d="M12 13.5q-.633 0-1.066-.434Q10.5 12.633 10.5 12t.434-1.066T12 10.5t1.066.434q.434.433.434 1.066t-.434 1.066T12 13.5m-.5-6v-3q0-.213.144-.356T12.001 4t.356.144t.143.356v3q0 .213-.144.356T11.999 8t-.356-.144T11.5 7.5m0 12v-3q0-.213.144-.356t.357-.144t.356.144t.143.356v3q0 .213-.144.356t-.357.144t-.356-.144t-.143-.356m5-8h3q.213 0 .356.144t.144.357t-.144.356t-.356.143h-3q-.213 0-.356-.144T16 11.999t.144-.356t.356-.143m-12 0h3q.213 0 .356.144t.144.357t-.144.356t-.356.143h-3q-.213 0-.356-.144T4 11.999t.144-.356t.356-.143"
      />
    </svg>
  );
};

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
        id: ACTION_MODE.TOOLS,
        defaultId: ACTION_MODE.MOVE,
        children: [
          {
            id: ACTION_MODE.MOVE,
            name: "移动工具 ",
            icon: (fill: string) => <Move fill={fill} />,
          },
          {
            id: ACTION_MODE.SCALE,
            name: "缩放工具 ",
            icon: (fill: string) => <Scale fill={fill} />,
          },
        ],
      },

      {
        id: ACTION_MODE.REGION,
        defaultId: ACTION_MODE.SECTION,
        children: [
          {
            id: ACTION_MODE.FRAME,
            name: "框架 ",
            icon: (fill: string) => <Frame fill={fill} />,
          },
          {
            id: ACTION_MODE.SLICE,
            name: "切片 ",
            icon: (fill: string) => <Slice fill={fill} />,
          },
          {
            id: ACTION_MODE.SECTION,
            name: "合集 ",
            icon: (fill: string) => <Section fill={fill} />,
          },
        ],
      },
      {
        id: ACTION_MODE.SHAPE,
        defaultId: ACTION_MODE.RECT,
        children: [
          {
            id: ACTION_MODE.RECT,
            name: "矩形",
            icon: (fill: string) => <Rect fill={fill} />,
          },
          {
            id: ACTION_MODE.LINE,
            name: "线条",
            icon: (fill: string) => <Line fill={fill} />,
          },
          {
            id: ACTION_MODE.ARROW,
            name: "箭头",
            icon: (fill: string) => <Arrow fill={fill} />,
          },
          {
            id: ACTION_MODE.ELLIPSE,
            name: "椭圆",
            icon: (fill: string) => <Circle fill={fill} />,
          },
          {
            id: ACTION_MODE.POLYGON,
            name: "多边形 ",
            icon: (fill: string) => <Triangle fill={fill} />,
          },
          {
            id: ACTION_MODE.STAR,
            name: "星形",
            icon: (fill: string) => <Start fill={fill} />,
          },
          {
            id: ACTION_MODE.IMAGE,
            name: "图片 ",
            icon: (fill: string) => <Image fill={fill} />,
          },
        ],
      },
      {
        id: ACTION_MODE.PENS,
        defaultId: ACTION_MODE.PEN,
        children: [
          {
            id: ACTION_MODE.PEN,
            name: "钢笔 ",
            icon: (fill: string) => <Pen fill={fill} />,
          },
          {
            id: ACTION_MODE.PENCIL,
            name: "铅笔 ",
            icon: (fill: string) => <Pencil fill={fill} />,
          },
        ],
      },
      {
        id: ACTION_MODE.TEXTS,
        defaultId: ACTION_MODE.TEXT,
        children: [
          {
            id: ACTION_MODE.TEXT,
            name: "文本",
            icon: (fill: string) => <Text fill={fill} />,
          },
        ],
      },
      {
        id: ACTION_MODE.HANDS,
        defaultId: ACTION_MODE.HAND,
        children: [
          {
            id: ACTION_MODE.HAND,
            name: "抓手",
            icon: (fill: string) => <Hand fill={fill} />,
          },
        ],
      },
      {
        id: ACTION_MODE.COMPONENTS,
        defaultId: ACTION_MODE.COMPONENT,
        children: [
          {
            id: ACTION_MODE.COMPONENT,
            name: "组件",
            icon: (fill: string) => <Component fill={fill} />,
          },
        ],
      },
      {
        id: ACTION_MODE.VIEWS,
        defaultId: ACTION_MODE.RULER,
        children: [
          {
            id: ACTION_MODE.RULER,
            name: "标尺",
            icon: (fill: string) => <Ruler fill={fill} />,
          },
          {
            id: ACTION_MODE.GRID,
            name: "网格",
            icon: (fill: string) => <Grid fill={fill} />,
          },
          {
            id: ACTION_MODE.LAYOUT,
            name: "布局",
            icon: (fill: string) => <Layout fill={fill} />,
          },
          {
            id: ACTION_MODE.PIXEL,
            name: "像素",
            icon: (fill: string) => <Pixel fill={fill} />,
          },
        ],
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
              // <Tooltip  content={item.name}>
              <Popover
                key={item.id}
                placement="bottom"
                showArrow={true}
                radius="sm"
                classNames={{
                  content: "p-1",
                }}
              >
                <motion.div whileTap={{ y: 1 }}>
                  <PopoverTrigger
                    onClick={() => {
                      if (item.children.length === 1) {
                        dispatch(setActionMode(item.defaultId));
                      }
                    }}
                  >
                    <Button
                      color="primary"
                      variant={
                        item.children.some((child) => child.id === actionMode)
                          ? "solid"
                          : "light"
                      }
                      radius="sm"
                      size="sm"
                      isIconOnly
                      aria-label={item.id}
                      className="mr-1"
                    >
                      {item.children
                        .find((child) => child.id === actionMode)
                        ?.icon("#ffffff") ||
                        item.children
                          .find((child) => child.id === item.defaultId)
                          ?.icon(
                            actionMode === item.id ? "#ffffff" : "#1b1b1f"
                          )}
                    </Button>
                  </PopoverTrigger>
                </motion.div>

                {item.children.length > 1 && (
                  <PopoverContent>
                    <div className="flex">
                      {item.children.map((child) => (
                        <Tooltip
                          key={child.id}
                          content={child.name}
                          placement="bottom"
                        >
                          <motion.div
                            whileTap={{ y: 1 }}
                            className="flex items-center justify-center mr-1"
                          >
                            <Button
                              color="primary"
                              variant={
                                actionMode === child.id ? "solid" : "light"
                              }
                              radius="sm"
                              size="sm"
                              isIconOnly
                              aria-label={child.id}
                              onPress={() => {
                                dispatch(setActionMode(child.id));
                              }}
                            >
                              {child.icon(
                                actionMode === child.id ? "#ffffff" : "#1b1b1f"
                              )}
                            </Button>
                          </motion.div>
                        </Tooltip>
                      ))}
                    </div>
                  </PopoverContent>
                )}
              </Popover>

              // </Tooltip>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
