import { checkProvider } from "./util";

export default function () {
  const check = checkProvider("INFO");
  return {
    check,
  };
}
