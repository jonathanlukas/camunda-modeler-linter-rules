import { checkProvider } from "./util";

export default function () {
  const check = checkProvider("WARNING");
  return {
    check,
  };
}
