import { format } from 'helpers/date';
import { usaDateFormat } from 'constants/dateFormat';
import { renderSectionHeader as _renderSectionHeader } from 'pages/tasks/TaskList';

export const sectionExtractor = ({ date, df = usaDateFormat }) => dateToLabel(date, df)
export const dateToLabel = (date, df = usaDateFormat) => format(date, df, null, { toDate: true });

export const renderSectionHeader = ({ section }, ...props) => _renderSectionHeader({ section }, {
    style: props
})

export const _getSections = (data, key, df = usaDateFormat) => {
    const dates = {}
    data?.map(({ node: { [key]: date, } }) => {
        const formattedDate = dateToLabel(date, df);
        if (formattedDate && !dates[formattedDate]) {
            dates[formattedDate] = new Date(date)
        }
    })
    return Object.keys(dates).sort((a, b) => new Date(b) - new Date(a))
};