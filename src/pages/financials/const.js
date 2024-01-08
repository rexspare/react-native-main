import { format } from 'helpers/date';
import { colors } from 'styles/theme';

export const CASH_FLOW = 'CASH_FLOW';
export const PROFIT_AND_LOSS = 'PROFIT_AND_LOSS';
export const OUTSTANDING_DEBTS = 'OUTSTANDING_DEBTS';

export const FINANCIALS_CATEGORIES = [
  {
    name: 'CASH FLOW',
    type: CASH_FLOW,
  },
  {
    name: 'PROFIT & LOSS',
    type: PROFIT_AND_LOSS,
  },
  {
    name: 'OUTSTANDING DEBTS',
    type: OUTSTANDING_DEBTS,
  },
];

export const EXPENSES = 'EXPENSES';
export const REVENUE = 'REVENUE';
export const PROFIT = 'PROFIT';
export const CASH_IN = 'CASH_IN';
export const CASH_OUT = 'CASH_OUT';

export const labels = {
  // Cash Flow
  CASH_IN: 'Cash in',
  CASH_OUT: 'Cash out',
  NET_CASH_FLOW: 'Net cash flow',

  // Profit and Loss
  EXPENSES: 'EXPENSES',
  REVENUE: 'REVENUE',
  PROFIT: 'PROFIT',
};

export const GRAPH_VIEW = 'GRAPH_VIEW';
export const LIST_VIEW = 'LIST_VIEW';

const LAST_MONTH = '0-30';
const PREV_MONTH = '31-60';
const PREV_THIRD_MONTH = '61-90';
const THIRD_MONTH_PLUS = 'OVER 90';

export const gqlDateFmt = 'yyyy-MM-dd';
const getDateFilterValue = monthsPrior => {
  const date = new Date();
  if (monthsPrior) date.setMonth(new Date().getMonth() - monthsPrior);
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return format(date, gqlDateFmt);
};

const currentDate = getDateFilterValue();
const prevMonth = getDateFilterValue(1);
const twoPrevMonth = getDateFilterValue(2);
const threePrevMonth = getDateFilterValue(3);
const fourthPrevMonth = getDateFilterValue(4);

export const TABS_TO_FILTER = {
  CASH_IN: { isIncoming: true },
  CASH_OUT: { isOutgoing: true },
  [REVENUE]: { isIncoming: true },
  [EXPENSES]: { isOutgoing: true, isIncoming: false },
  [LAST_MONTH]: { dateMin: prevMonth, dateMax: currentDate },
  [PREV_MONTH]: { dateMin: twoPrevMonth, dateMax: prevMonth },
  [PREV_THIRD_MONTH]: { dateMin: threePrevMonth, dateMax: twoPrevMonth },
  [THIRD_MONTH_PLUS]: { dateMax: fourthPrevMonth, dateMin: null },
};

const TOTAL_INCOME = 'totalIncome';
const TOTAL_EXPENSE = 'totalExpense';
export const TOTAL = 'total';

export const TABS_TO_GRAPH_DISPLAY = {
  [CASH_IN]: 'totalIncome',
  [CASH_OUT]: 'totalExpense',
  [REVENUE]: 'totalIncome',
  [EXPENSES]: 'totalExpense',
};
export const PAYMENT_METHOD_ICONS = {
  cash: 'cash',
  check: 'check',
  credit: 'credit-card',
  card: 'credit-card',
  paypal: 'paypal',
  bankaccount: 'bankaccount',
};
export const feedTypes = {
  CASH_FLOW: {
    tabs: [
      {
        text: labels.CASH_IN,
        value: 'CASH_IN',
        totalKey: TOTAL_INCOME,
        color: colors['primary/50'],
      },
      {
        text: labels.CASH_OUT,
        value: 'CASH_OUT',
        totalKey: TOTAL_EXPENSE,
        color: colors['primary/brand'],
      },
      {
        text: labels.NET_CASH_FLOW,
        value: 'CASH_FLOW',
        totalKey: TOTAL,
        displayAll: true,
        graphOnly: true,
        color: colors['additional/success'],
      },
    ],
    header: 'Cash Flow',
    variables: { isPaid: true },
  },
  PROFIT_AND_LOSS: {
    header: 'Profit & Loss',
    tabs: [
      {
        text: labels.REVENUE,
        value: REVENUE,
        totalKey: TOTAL_INCOME,
        color: colors['primary/50'],
      },
      {
        text: labels.EXPENSES,
        value: EXPENSES,
        totalKey: TOTAL_EXPENSE,
        color: colors['primary/brand'],
      },
      {
        text: labels.PROFIT,
        value: PROFIT,
        totalKey: TOTAL,
        displayAll: true,
        graphOnly: true,
        color: colors['additional/success'],
      },
    ],
  },
  OUTSTANDING_DEBTS: {
    cardLabel: 'Outstanding Debt',
    tabs: [
      { text: LAST_MONTH, value: LAST_MONTH, totalKey: TOTAL },
      { text: PREV_MONTH, value: PREV_MONTH, totalKey: TOTAL },
      { text: PREV_THIRD_MONTH, value: PREV_THIRD_MONTH, totalKey: TOTAL },
      { text: THIRD_MONTH_PLUS, value: THIRD_MONTH_PLUS, totalKey: TOTAL },
    ],
    variables: { isOverdue: true },
    header: 'Outstanding Debt',
  },
};

export const FINANCIAL_REPORT_TYPES = {
  FEED: 'feed',
  TRANSACTION: 'transaction',
  OVERDUE: 'overdue-payment',
};
