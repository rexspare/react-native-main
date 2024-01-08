const { compact } = require("lodash-es");

export const backAction = {
    left: true,
    icon: 'arrow-ios-back',
};

const editAction = {
    icon: 'edit',
    pack: 'pm',
    height: 18,
    width: 18,
};

const shareAction = {
    icon: 'share',
    pack: 'pm',
    height: 18,
    width: 18,
};

const filterAction = {
    icon: 'filter',
    pack: 'pm',
    status: 'basic',
    height: 18,
    width: 18,
};

const filterActionBlack = {
    icon: 'filter',
    pack: 'pm',
    height: 18,
    width: 18,
};

const boxesAction = {
    left: true,
    icon: 'boxes',
    pack: 'pm',
    status: 'basic',
    height: 18,
    width: 18,
};

const exportAction = {
    icon: "export", pack: "pm"
}

const plusAction = {
    icon: "plus",
    height: 18,
    width: 18,
    style: { marginTop: -3 }
}

const editIconAction = {
    icon: "edit_icon",
    pack: "pm",
    height: 18,
    width: 18,
    style: { marginTop: -3 }
}

const settingIconAction = {
    icon: "settings",
    pack: "pm",
    height: 18,
    width: 18,
    style: { marginTop: -3 }
}

const questionCircleAction = {
    icon: "questionCircle",
    pack: "pm",
    height: 18,
    width: 18,
}

export const menuAction = {
    icon: 'menu',
    left: true
};

export const bellAction = {
    icon: 'bell',
    pack: 'pm'
}
export const bellWhiteAction = {
    icon: 'bell-white',
    pack: 'pm',
    status: 'basic',
}

const actions = {
    back: backAction,
    edit: editAction,
    share: shareAction,
    filter: filterAction,
    filterBlack: filterActionBlack,
    boxes: boxesAction,
    export: exportAction,
    plus: plusAction,
    editIcon: editIconAction,
    setting: settingIconAction,
    menu: menuAction,
    bell: bellAction,
    bellWhite: bellWhiteAction,
    questionCircle: questionCircleAction,
};

export const getActions = (...args) => compact(args).map(([key, additional]) => ({ ...actions[key], ...additional }))

export const HEADER_ACTIONS = actions