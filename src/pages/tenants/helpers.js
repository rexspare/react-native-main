
import { tabs} from "./schema";

export const getTenantTabIndexByValue = ( value ) => tabs.findIndex(tab=>tab.value === value)