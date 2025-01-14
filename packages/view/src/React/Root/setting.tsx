import { Card, CardBody } from "@nextui-org/react";

export const Setting = ({ level }: { level: number }) => {
  return (
    <div className="absolute right-2 top-2" style={{ zIndex: level }}>
      <Card className="w-[300px]" shadow="sm" radius="sm">
        <CardBody>
          <p>配置区域</p>
        </CardBody>
      </Card>
    </div>
  );
};
