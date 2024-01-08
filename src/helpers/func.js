import { compact } from "lodash-es";

export const chain = (functions) => (...args) => compact(functions).map(fn => fn(...args))