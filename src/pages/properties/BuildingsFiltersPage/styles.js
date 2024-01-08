import { IS_SMALLER } from "styles/responsive"

export const styles = {

    container: {
        borderWidth: 0
    },

    multiSelectContainer: {
        minHeight: 72,
        maxHeight: 90,
        justifyContent: "space-between",
        paddingBottom: 18,
        marginTop: 3
    },

    multiSelectItemStyle: {
        maxHeight: 7,
        minWidth: IS_SMALLER ? 72: 108,
    },
    
    dropdown: {
        dropdownContainer: {
            width: "100%",
        }
    },
    switchField: { 
        container: { 
            alignItems: "flex-start", paddingRight: "18px", marginLeft:0, marginTop: 0
        }, 
        switchContainer: { marginTop: 1 } 
    }
}

export const BEDROOM_OPTIONS = [
    {key: 1, title:'1 bedrooms'},
    {key: 2, title:'2 bedrooms'},
    {key: 3, title:'3 bedrooms'},
    {key: 4, title:'4 bedrooms'},
    {key: 5, title:'5+ bedrooms'},
]