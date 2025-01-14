"use client";
import { Button, Card, CardBody } from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";
import { memo, useState } from "react";
import { useWindowEvent } from "../Hook/useWindowEvent";

const MenuIcon = memo(() => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
    >
      <path
        fill="#000"
        d="M4 18q-.425 0-.712-.288T3 17t.288-.712T4 16h16q.425 0 .713.288T21 17t-.288.713T20 18zm0-5q-.425 0-.712-.288T3 12t.288-.712T4 11h16q.425 0 .713.288T21 12t-.288.713T20 13zm0-5q-.425 0-.712-.288T3 7t.288-.712T4 6h16q.425 0 .713.288T21 7t-.288.713T20 8z"
      />
    </svg>
  );
});

export const NodeMapTree = ({ level }: { level: number }) => {
  const [isVisible, setIsVisible] = useState(false);

  /**
   * 点击窗口优先关闭
   */
  useWindowEvent(
    "click",
    () => {
      setIsVisible(false);
    },
    false
  );

  return (
    <div className="absolute left-2 top-2" style={{ zIndex: level }}>
      <motion.div whileTap={{ y: 1 }}>
        <Card shadow="sm" radius="sm" className="w-fit">
          <CardBody className="p-0 w-fit">
            <Button
              color="primary"
              variant="light"
              radius="sm"
              size="sm"
              isIconOnly
              aria-label="openMapTree"
              className="border"
              onPress={() => setIsVisible(!isVisible)}
            >
              <MenuIcon />
            </Button>
          </CardBody>
        </Card>
      </motion.div>
      {/*  动画 */}
      <AnimatePresence initial={false}>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            key="mapTreeBox"
          >
            <Card className="w-[260px] mt-2 text-base" shadow="sm" radius="sm">
              <CardBody className="p-2">
                <p>节点映射树区块</p>
              </CardBody>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
