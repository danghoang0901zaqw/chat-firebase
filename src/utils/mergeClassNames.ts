import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export type ClassNames = string | [] | {};
export const mergeClassNames = (...classes: ClassValue[]) => twMerge(clsx(...classes));

export default mergeClassNames;
