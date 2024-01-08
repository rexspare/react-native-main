import React from 'react';
import {
  NativeDateService,
  styled,
  CalendarViewModes,
  Button,
  DateService,
} from '@ui-kitten/components';
import { CalendarDataService } from '@ui-kitten/components/ui/calendar/service/calendarData.service';
import { CalendarComponent } from '@ui-kitten/components/ui/calendar/calendar.component';
import { CalendarHeader } from '@ui-kitten/components/ui/calendar/components/calendarHeader.component';
import Box from './Box';
import Text from './Text';
import useTheme from 'hooks/useTheme';
import { typography } from 'styles/typography';
import { colors } from 'styles/theme';
import moment from 'moment';
import Icon from 'components/Icon';
import { TouchableOpacity } from 'react-native';
class CustomCalendarHeader extends CalendarHeader {
  render() {
    const {
      style,
      titleStyle,
      onTitlePress,
      title,
      lateralNavigationAllowed,
      extraActions,
      ...restProps
    } = this.props;

    const headerButtonStyle = { flexDirection: 'row-reverse' };

    return (
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        style={style}
        {...restProps}>
        {extraActions && (
          <Box style={{ opacity: 0 }} pointerEvents="none">
            {extraActions}
          </Box>
        )}

        {lateralNavigationAllowed && (
          <Box as={TouchableOpacity} onPress={this.props.onNavigationLeftPress}>
            {Icon('left-chevron', "pm")({ width: 20, height: 20 })}
          </Box>
        )}

        <Button
          style={headerButtonStyle}
          appearance="ghost"
          textStyle={[titleStyle, { ...typography['heading-medium'], color: colors['gray scale/40'] }]}
          // @ts-ignore
          // icon={this.renderTitleIcon}
          onPress={onTitlePress}>
          {title}
        </Button>

        {lateralNavigationAllowed && (
          <Box as={TouchableOpacity} onPress={this.props.onNavigationRightPress}>
            {Icon('right-chevron', "pm")({ width: 20, height: 20 })}
          </Box>
        )}

        {extraActions && <Box>{extraActions}</Box>}
      </Box>
    );
  }
}

const DEFAULT_DATE_OPTIONS = {
  bounding: false,
  holiday: false,
  range: false,
};

class CustomCalendarDataService extends CalendarDataService {
  constructor(dateService) {
    super(dateService);
    this.sup = super(dateService);
    this.createDayPickerWeekData = (date, dateRange) => {
      const weeks = this.createWeekDates(date, DEFAULT_DATE_OPTIONS, dateRange);

      // return weeks;
      return this.withWeekBoundingMonths(weeks, date);
    };
  }

  withWeekBoundingMonths(weeks, activeMonth) {
    let withBoundingMonths = weeks;

    if (this.isShouldAddPrevBoundingMonthWeek(withBoundingMonths)) {
      withBoundingMonths = this.addPrevBoundingMonth(
        withBoundingMonths,
        activeMonth,
      );
    }

    if (this.isShouldAddNextBoundingMonthWeek(withBoundingMonths)) {
      withBoundingMonths = this.addNextBoundingMonth(
        withBoundingMonths,
        activeMonth,
      );
    }

    return withBoundingMonths;
  }

  isShouldAddPrevBoundingMonthWeek(weeks) {
    return (
      weeks[0].length < DateService.DAYS_IN_WEEK &&
      this.dateService.getDate(weeks[0][0].date) === 1
    );
  }

  isShouldAddNextBoundingMonthWeek(weeks) {
    const lastWeek = weeks[weeks.length - 1];
    const daysInMonth = this.dateService.getNumberOfDaysInMonth(
      weeks[0][0].date,
    );
    return (
      weeks[weeks.length - 1].length < DateService.DAYS_IN_WEEK &&
      this.dateService.getDate(lastWeek[lastWeek.length - 1].date) ===
      daysInMonth
    );
  }

  createWeekDates(activeWeek, options, dateRange) {
    let days = this.createDateRangeForWeek(activeWeek, options);

    if (dateRange) {
      days = this.withRangedDates(days, dateRange);
    }

    return [days];
  }

  createDateRangeForWeek(weekDate, options) {
    const weekStartDiff = this.getWeekStartDiff(weekDate);
    const week = [];
    const start = weekDate.getDate() - weekStartDiff;
    for (let i = 0; i < DateService.DAYS_IN_WEEK; i++) {
      const year = this.dateService.getYear(weekDate);
      const month = this.dateService.getMonth(weekDate);
      const date = this.dateService.createDate(year, month, start + i);
      if (this.dateService.getMonth(date) === month) {
        week.push({ date, ...options });
      }
    }
    return week;
  }
}

class CustomDateService extends NativeDateService {
  getDayOfWeekNames(...args) {
    const days = super.getDayOfWeekNames(...args);
    return ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map(d => d[0]);
  }

  format(...args) {
    const formatted = super.format(...args);
    return formatted?.toUpperCase();
  }
}

class CustomCalendarComponent extends CalendarComponent {
  constructor(props) {
    super(props);
    this.dataService = new CustomCalendarDataService(this.dateService);
    this.renderHeaderElement = style => {
      const titleSelector = this.props.title || this.createViewModeHeaderTitle;

      return (
        <CustomCalendarHeader
          style={style.headerContainer}
          title={titleSelector(this.state.visibleDate, this.state.viewMode)}
          titleStyle={style.title}
          iconStyle={style.icon}
          extraActions={this.props.extraActions}
          lateralNavigationAllowed={
            this.props.showWeek ? this.isHeaderNavigationAllowed() : this.isHeaderNavigationAllowed()
          }
          onTitlePress={
            this.props.showWeek ? null : this.onPickerNavigationPress
          }
          onNavigationLeftPress={this.onHeaderNavigationLeftPress}
          onNavigationRightPress={this.onHeaderNavigationRightPress}
        />
      );
    };
  }

  onViewChanged() {
    const dates = this.createDates(this.state.visibleDate);
    const flat = dates.reduce((f, curr) => f.concat(curr), []);
    this.props.onViewChanged?.(flat.map(({ date }) => date));
  }

  componentDidMount() {
    super.componentDidMount && super.componentDidMount();
    this.onViewChanged();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    super.componentDidUpdate &&
      super.componentDidUpdate(prevProps, prevState, snapshot);
    if (prevProps.occupied !== this.state.prevOccupied) {
      this.setState({ prevOccupied: prevProps.occupied });
    }

    if (
      this.dateService.compareDatesSafe(
        prevState.visibleDate,
        this.state.visibleDate,
      ) !== 0 ||
      prevProps.showWeek !== this.props.showWeek
    ) {
      this.onViewChanged();
    }
  }

  shouldUpdateDate(props, nextProps) {
    const should = super.shouldUpdateDate(props, nextProps);
    if (should) {
      return should;
    }
    const isPrevOccupied =
      this.state.prevOccupied &&
      (this.state.prevOccupied.findIndex(
        d => dateService.compareDatesSafe(d, props.date.date) === 0,
      ) ?? -1) !== -1;
    const isOccupied =
      this.props.occupied &&
      (this.props.occupied.findIndex(
        d => dateService.compareDatesSafe(d, nextProps.date.date) === 0,
      ) ?? -1) !== -1;
    return isPrevOccupied !== isOccupied;
  }

  createDates(date) {
    if (this.props.showWeek) {
      return this.dataService.createDayPickerWeekData(date);
    }
    return this.dataService.createDayPickerData(date);
  }
}

const dateService = new CustomDateService();

CustomCalendarComponent.defaultProps = {
  dateService,
  boundingMonth: true,
  startView: CalendarViewModes.DATE,
};
CustomCalendarComponent.styledComponentName = 'Calendar';
const CustomCalendar = styled(CustomCalendarComponent);

const Calendar = ({ occupied, ...props }) => {
  const ref = React.useRef();
  const theme = useTheme();

  React.useEffect(() => {
    if (props.showWeek) {
      ref.current?.scrollToToday?.();
    }
  }, [props.showWeek]);

  const occupiedSafe = React.useMemo(() => {
    return (
      occupied?.map(d => {
        const nd = new Date(d);
        nd.setHours(0);
        nd.setMinutes(0);
        nd.setSeconds(0);
        nd.setMilliseconds(0);
        return nd;
      }) ?? []
    );
  }, [occupied]);

  const renderDay = React.useCallback(
    ({ date }, style) => {
      const isOccupied =
        (occupiedSafe.findIndex(
          d => dateService.compareDatesSafe(d, date) === 0,
        ) ?? -1) !== -1;
      const day = moment(date).day();

      return (
        <Box
          style={[style.container, { width: 40, left: -5 }]}
          flex={1}
          alignItems="center"
          justifyContent="center">
          <Text style={[{ ...style.text }, { ...typography["body/small – regular"] }, (day > 4 && !style?.container?.backgroundColor) && { color: colors["gray scale/30"] }]}>{dateService.format(date, 'D')}</Text>
          {isOccupied ? (
            <Box
              style={{ borderRadius: 100 }}
              backgroundColor={style?.container?.backgroundColor ? "white" : theme['color-primary-500']}
              width={4}
              height={4}
              position="absolute"
              bottom={4}
            />
          ) : null}
        </Box>
      );
    },
    [occupiedSafe, theme],
  );

  return (
    <CustomCalendar
      {...props}
      renderDay={props.renderDay || renderDay}
      occupied={occupiedSafe}
      ref={ref}
    />
  );
};

export default Calendar;
