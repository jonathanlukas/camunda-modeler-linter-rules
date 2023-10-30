import { checkProvider } from "./util";

export default function () {
  const check = checkProvider("REVIEW");
  return {
    check,
  };
}
