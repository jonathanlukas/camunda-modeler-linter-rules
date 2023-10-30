import { checkProvider } from "./util";

export default function () {
  const check = checkProvider("TASK");
  return {
    check,
  };
}
