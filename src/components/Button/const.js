import Icon from "components/Icon";
import { styles } from "./style";



export const deleteBtnProps = {
    icon: style => Icon("delete", "pm")({
        width: 23,
        height: 23
    }), shadow: false, style: styles.actionButton
};
export const dropdownBtnProps = { icon: Icon("dropdown-filter", "pm"), shadow: false, style: styles.actionButton };