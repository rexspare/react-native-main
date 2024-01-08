import React from 'react';

const IconProvider = ({ default: Icon }) => ({
  toReactElement: props => (
    <Icon
      {...props}
      tintColor={props.tintColor || props.style?.tintColor || '#000'}
      backgroundColor={
        props.backgroundColor || props.style?.backgroundColor || '#fff'
      }
      width={props.width || props.style?.width}
    />
  ),
});

const PmIconsPack = {
  name: 'pm',
  icons: {
    actions: IconProvider(require('img/icons/actions.svg')),
    archive: IconProvider(require('img/icons/archive.svg')),
    topRight: IconProvider(require('img/icons/topRight.svg')),
    appointment: IconProvider(require('img/icons/appointment.svg')),
    addTasks: IconProvider(require('img/icons/addTasks.svg')),
    bath: IconProvider(require('img/icons/bath.svg')),
    bed: IconProvider(require('img/icons/bed.svg')),
    bell: IconProvider(require('img/icons/bell.svg')),
    ['bell-white']: IconProvider(require('img/icons/bell-white.svg')),
    boxes: IconProvider(require('img/icons/boxes.svg')),
    calendar: IconProvider(require('img/icons/calendar.svg')),
    ['calendar_primary']: IconProvider(
      require('img/icons/calendar_primary.svg'),
    ),
    calendar_b: IconProvider(require('img/icons/calendar_b.svg')),
    calendar_black: IconProvider(require('img/icons/calendar_black.svg')),
    checkIcon: IconProvider(require('img/icons/check.svg')),
    ['white-check']: IconProvider(require('img/icons/white-check.svg')),
    checkCircleIcon: IconProvider(require('img/icons/check_circle.svg')),
    helpCircleIcon: IconProvider(require('img/icons/help_circle.svg')),
    closeIconWhite: IconProvider(require('img/icons/close_icon.svg')),
    questionCircle: IconProvider(require('img/icons/question-circle.svg')),
    archived: IconProvider(require('img/icons/archived-icon.svg')),
    calendar_theme: IconProvider(require('img/icons/calendar_theme.svg')),
    star: IconProvider(require('img/icons/star.svg')),
    active_star: IconProvider(require('img/icons/active_star.svg')),

    date: IconProvider(require('img/icons/date_icon.svg')),
    comment: IconProvider(require('img/icons/comment.svg')),

    manualPayment: IconProvider(require('img/icons/manual_payment.svg')),
    manualExpense: IconProvider(require('img/icons/manual_expense.svg')),
    clock: IconProvider(require('img/icons/clock.svg')),
    alert: IconProvider(require('img/icons/alert.svg')),
    repeat: IconProvider(require('img/icons/repeats.svg')),
    ['default-service-type']: IconProvider(
      require('img/icons/default-service-type.svg'),
    ),
    document: IconProvider(require('img/icons/document.svg')),
    document_attachment: IconProvider(require('img/icons/document_attachment.svg')),
    dollar: IconProvider(require('img/icons/dollar.svg')),
    fileFromApp: IconProvider(require('img/icons/fileFromApp.svg')),
    fileFromDocuments: IconProvider(require('img/icons/fileFromDocuments.svg')),
    fileFromFiles: IconProvider(require('img/icons/fileFromFiles.svg')),
    documents: IconProvider(require('img/icons/documents.svg')),
    ['documents-active']: IconProvider(
      require('img/icons/documents-active.svg'),
    ),
    file: IconProvider(require('img/icons/file.svg')),

    expandInput: IconProvider(require('img/icons/expandInput.svg')),
    edit: IconProvider(require('img/icons/edit.svg')),
    edit_icon: IconProvider(require('img/icons/edit-icon.svg')),
    error: IconProvider(require('img/icons/error.svg')),
    camera: IconProvider(require('img/icons/camera.svg')),
    ["camera-green"]: IconProvider(require('img/icons/camera-green.svg')),
    export: IconProvider(require('img/icons/export.svg')),
    ['eye-slash']: IconProvider(require('img/icons/eye-slash.svg')),
    ['eye']: IconProvider(require('img/icons/eye.svg')),
    ['export-white']: IconProvider(require('img/icons/export-white.svg')),
    copy: IconProvider(require('img/icons/copy.svg')),

    master: IconProvider(require('img/icons/master.svg')),
    visa: IconProvider(require('img/icons/visa.svg')),
    pay_pal: IconProvider(require('img/icons/pay_pal.svg')),
    bank_account: IconProvider(require('img/icons/bank_account.svg')),

    filter: IconProvider(require('img/icons/filter.svg')),
    ['white-filter']: IconProvider(require('img/icons/white-filter.svg')),
    ['calendar_grey']: IconProvider(require('img/icons/calendar_grey.svg')),
    ['cash-flow']: IconProvider(require('img/icons/cash-flow.svg')),
    ['profit-loss']: IconProvider(require('img/icons/profit-loss.svg')),
    ['outstanding-debts']: IconProvider(
      require('img/icons/outstanding-debts.svg'),
    ),
    folder: IconProvider(require('img/icons/folder.svg')),
    graph: IconProvider(require('img/icons/graph.svg')),
    ['graph-grey']: IconProvider(require('img/icons/graph-grey.svg')),

    home: IconProvider(require('img/icons/home.svg')),
    ['bell-transaction']: IconProvider(
      require('img/icons/bell-transaction.svg'),
    ),
    ['home-transaction']: IconProvider(
      require('img/icons/home-transaction.svg'),
    ),
    ['home-active']: IconProvider(require('img/icons/home-active.svg')),
    locationArrow: IconProvider(require('img/icons/location-arrow.svg')),
    location: IconProvider(require('img/icons/location.svg')),
    maintenance: IconProvider(require('img/icons/maintenance.svg')),
    ['maintenance-active']: IconProvider(
      require('img/icons/maintenance-active.svg'),
    ),
    services: IconProvider(require('img/icons/services.svg')),
    ['services-active']: IconProvider(require('img/icons/services-active.svg')),
    ['maintenance-old']: IconProvider(require('img/icons/maintenance-old.svg')),
    ['notice']: IconProvider(require('img/icons/notice.svg')),
    profile: IconProvider(require('img/icons/profile.svg')),
    properties: IconProvider(require('img/icons/properties.svg')),
    ['properties-active']: IconProvider(
      require('img/icons/properties-active.svg'),
    ),
    resource: IconProvider(require('img/icons/resource.svg')),
    settings: IconProvider(require('img/icons/settings.svg')),
    tasks: IconProvider(require('img/icons/tasks.svg')),
    ['tasks-active']: IconProvider(require('img/icons/tasks-active.svg')),
    tenants: IconProvider(require('img/icons/tenants.svg')),
    ['tenants-active']: IconProvider(require('img/icons/tenants-active.svg')),
    unit: IconProvider(require('img/icons/unit.svg')),
    building: IconProvider(require('img/icons/building.svg')),
    ['plus-circle']: IconProvider(require('img/icons/plus-circle.svg')),
    ['plus-circle-outline']: IconProvider(
      require('img/icons/plus-circle-outline.svg'),
    ),
    ['home-outline']: IconProvider(require('img/icons/home-outline.svg')),
    ['info-circle-outline']: IconProvider(
      require('img/icons/info-circle-outline.svg'),
    ),
    ['red-circle-cross']: IconProvider(
      require('img/icons/red-circle-cross.svg'),
    ),
    restore: IconProvider(require('img/icons/restore.svg')),
    tick: IconProvider(require('img/icons/tick.svg')),
    ['grey-tick']: IconProvider(require('img/icons/grey-tick.svg')),
    ['green-tick']: IconProvider(require('img/icons/green-tick.svg')),
    ['green-circle-tick']: IconProvider(
      require('img/icons/green-circle-tick.svg'),
    ),

    ['bank-account']: IconProvider(require('img/icons/bank-account.svg')),
    ['rent-payment-details']: IconProvider(
      require('img/icons/rent-payment-details.svg'),
    ),
    ['outstanding-debt-details']: IconProvider(
      require('img/icons/outstanding-debt-details.svg'),
    ),
    phone: IconProvider(require('img/icons/phone.svg')),
    activity: IconProvider(require('img/icons/activity.svg')),
    meeting: IconProvider(require('img/icons/meeting.svg')),
    list: IconProvider(require('img/icons/list.svg')),
    dark_phone: IconProvider(require('img/icons/dark_phone.svg')),
    ['call']: IconProvider(require('img/icons/call.svg')),
    email: IconProvider(require('img/icons/email.svg')),
    reminder: IconProvider(require('img/icons/reminder.svg')),
    mail: IconProvider(require('img/icons/mail.svg')),
    // payment methods
    cash: IconProvider(
      require('img/icons/payment-methods/payment-method-cash.svg'),
    ),
    ['orange-cash']: IconProvider(
      require('img/icons/payment-methods/payment-method-orange-cash.svg'),
    ),
    check: IconProvider(
      require('img/icons/payment-methods/payment-method-check.svg'),
    ),
    ['orange-check']: IconProvider(
      require('img/icons/payment-methods/payment-method-orange-check.svg'),
    ),
    other: IconProvider(require('img/icons/payment-methods/other.svg')),
    ['orange-other']: IconProvider(
      require('img/icons/payment-methods/orange-other.svg'),
    ),
    paypal: IconProvider(require('img/icons/payment-methods/paypal.svg')),
    ['orange-paypal']: IconProvider(
      require('img/icons/payment-methods/orange-paypal.svg'),
    ),
    bankaccount: IconProvider(require('img/icons/payment-methods/bankaccount.svg')),
    ['orange-bankaccount']: IconProvider(
      require('img/icons/payment-methods/orange-bankaccount.svg'),
    ),
    ['credit-card']: IconProvider(
      require('img/icons/payment-methods/payment-method-credit-card.svg'),
    ),
    ['orange-credit-card']: IconProvider(
      require('img/icons/payment-methods/payment-method-orange-credit-card.svg'),
    ),
    ['transaction-details-cash']: IconProvider(
      require('img/icons/transaction-details/cash.svg'),
    ),
    ['transaction-details-check']: IconProvider(
      require('img/icons/transaction-details/check.svg'),
    ),
    ['transaction-details-credit-card']: IconProvider(
      require('img/icons/transaction-details/credit-card.svg'),
    ),
    ['transaction-details-other']: IconProvider(
      require('img/icons/transaction-details/other.svg'),
    ),
    ['transaction-details-paypal']: IconProvider(
      require('img/icons/transaction-details/paypal.svg'),
    ),
    ['remove-filter']: IconProvider(require('img/icons/remove-filter.svg')),
    ['delete']: IconProvider(require('img/icons/remove-filter.svg')),
    ['carbon-trash-can']: IconProvider(
      require('img/icons/carbon-trash-can.svg'),
    ),
    ['dropdown-filter']: IconProvider(require('img/icons/dropdown-filter.svg')),
    ['amount-paid']: IconProvider(require('img/icons/amount-paid.svg')),
    ['folder-transparent']: IconProvider(
      require('img/icons/folder-transparent.svg'),
    ),
    ['folder-open']: IconProvider(require('img/icons/folder-open.svg')),
    ['dots']: IconProvider(require('img/icons/dots.svg')),
    ['chevron-left']: IconProvider(require('img/icons/chevron-left.svg')),
    ['chevron-right']: IconProvider(require('img/icons/chevron-right.svg')),
    ['left-chevron']: IconProvider(require('img/icons/left-chevron.svg')),
    ['right-chevron']: IconProvider(require('img/icons/right-chevron.svg')),
    ['humburger-menu']: IconProvider(require('img/icons/humburger-menu.svg')),
    ['grey-dots']: IconProvider(require('img/icons/grey-dots.svg')),
    ['document_icon']: IconProvider(require('img/icons/document_icon.svg')),
    ['document_icon_1']: IconProvider(require('img/icons/document_icon_1.svg')),
    ['flag-black']: IconProvider(require('img/icons/flag-black.svg')),
    ['overdue-black']: IconProvider(require('img/icons/overdue-black.svg')),
    ['flag-white']: IconProvider(require('img/icons/flag-white.svg')),
    ['overdue-white']: IconProvider(require('img/icons/overdue-white.svg')),
    ['arrow-down']: IconProvider(require('img/icons/arrow-down.svg')),

    ['nav-home-active']: IconProvider(require('img/icons/svg/home-filled.svg')),
    ['nav-people']: IconProvider(require('img/icons/svg/people.svg')),
    ['nav-people-active']: IconProvider(
      require('img/icons/svg/people-filled.svg'),
    ),
    payments: IconProvider(require('img/icons/payments.svg')),
    ['payments-active']: IconProvider(require('img/icons/payments-active.svg')),
    ['nav-document']: IconProvider(require('img/icons/svg/document.svg')),
    ['nav-document-active']: IconProvider(
      require('img/icons/svg/document-filled.svg'),
    ),
    ['nav-list']: IconProvider(require('img/icons/svg/list.svg')),
    ['nav-list-active']: IconProvider(require('img/icons/svg/list-filled.svg')),
    ['nav-person']: IconProvider(require('img/icons/svg/person.svg')),
    ['nav-person-active']: IconProvider(
      require('img/icons/svg/person-filled.svg'),
    ),
    save: IconProvider(require('img/icons/save.svg')),
    ['edit-icon']: IconProvider(require('img/icons/edit-icon.svg')),
    move: IconProvider(require('img/icons/move.svg')),
    download: IconProvider(require('img/icons/download.svg')),
    send: IconProvider(require('img/icons/send.svg')),
    ['add_archive']: IconProvider(require('img/icons/add_archive.svg')),
    remove: IconProvider(require('img/icons/remove.svg')),
    // ['remove-circle']: IconProvider(require("img/icons/remove-circle.svg")),
    share: IconProvider(require('img/icons/share.svg')),
    close: IconProvider(require('img/icons/close.svg')),
    ['red-dustbin']: IconProvider(require('img/icons/red-dustbin.svg')),
    ['cross-filled']: IconProvider(require('img/icons/svg/cross-filled.svg')),
    ['red-cross-filled']: IconProvider(require('img/icons/red-cross-filled.svg')),
    ['lock']: IconProvider(require('img/icons/lock.svg')),
    ['header-logo']: IconProvider(require('img/icons/header-logo.svg')),
    ['white-header-logo']: IconProvider(
      require('img/icons/white-header-logo.svg'),
    ),
    ['marker']: IconProvider(require('img/icons/marker.svg')),

    ['task-list']: IconProvider(require('img/icons/icon-task-list.svg')),
    ['task-list-all']: IconProvider(
      require('img/icons/icon-task-list-all.svg'),
    ),
    ['task-list-assigned']: IconProvider(
      require('img/icons/icon-task-list-assigned.svg'),
    ),
    ['task-list-unassigned']: IconProvider(
      require('img/icons/icon-task-list-unassigned.svg'),
    ),
    ['wrench']: IconProvider(require('img/icons/svg/wrench.svg')),
    ['finance-manual-payment']: IconProvider(require('img/manual-payment.svg')),
    ['finance-manual-expenses']: IconProvider(
      require('img/manual-expenses.svg'),
    ),
    ['information']: IconProvider(require('img/icons/information.svg')),
    ['create-document']: IconProvider(require('img/icons/create-document.svg')),
    ['create-folder']: IconProvider(require('img/icons/create-folder.svg')),
    ['minus-circle-outline']: IconProvider(require('img/icons/minus-circle-outline.svg')),
    ['time']: IconProvider(require('img/icons/time.svg')),
    ['task']: IconProvider(require('img/icons/task.svg')),
  },
};

export default PmIconsPack;
