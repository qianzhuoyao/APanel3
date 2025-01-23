import { ListboxItem } from "@nextui-org/react";
import { Listbox } from "@nextui-org/react";
import { ReactNode, useEffect } from "react";
import { useState } from "react";

export const ListboxWrapper = ({ children }: { children: ReactNode }) => (
  <div className="w-full max-w-[260px] border-small p-1 rounded-small border-default-1">
    {children}
  </div>
);

export const ContextMenu = ({
  options,
}: {
  options: {
    item: () => ReactNode;
  }[];
}) => {
  const [menuPosition, setMenuPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  // 显示上下文菜单
  const handleContextMenu = (event: MouseEvent) => {
    event.preventDefault();
    setMenuPosition({ x: event.pageX, y: event.pageY });
  };

  // 隐藏上下文菜单
  const handleClick = () => {
    setMenuPosition(null);
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);
    document.addEventListener("contextmenu", handleContextMenu);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  return (
    <>
      {menuPosition && (
        <div
          className="absolute"
          style={{ top: menuPosition.y, left: menuPosition.x }}
        >
          <ListboxWrapper>
            <Listbox
              aria-label="Actions"
              onAction={(key) => alert(key)}
              className="p-0"
            >
              {options.map((option, index) => (
                <ListboxItem key={index} className="context-menu-item">
                  {option.item()}
                </ListboxItem>
              ))}
            </Listbox>
          </ListboxWrapper>
        </div>
      )}
    </>
  );
};
