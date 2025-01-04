import { useState } from "react";
import {  IModel } from "../block";

export const useGetSelectedModel = (groupId?: string) => {
  const [model, setModel] = useState<IModel[]>([]);
  if (groupId) {
  }
};
