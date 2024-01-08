import React from 'react';
import Svg, { Polygon, LinearGradient, Stop } from 'react-native-svg';
import Box from './Box';
import Text from './Text';
import { t } from 'helpers/react';
import { typography } from 'styles/typography';
import { colors } from 'styles/theme';
import { formatAmount } from 'utils/exchanges';

const RankBadge = ({
  rank,
  label,
  tintColor,
  size,
  isRankNum = true,
  tintColor2,
  ...props
}) => {
  const points =
    size === 'large'
      ? '8.5,0 11.266,5.439 17,6.259 13.016,10.748 13.88,16.375 8.5,13.204 3.12,16.375 3.984,10.748 0,6.259 5.734,5.439'
      : size === 'middle'
      ? '6.5,0 8.416,4.053 13,4.808 10.023,7.877 10.928,12.343 6.5,9.953 2.072,12.343 2.977,7.877 0,4.808 4.584,4.053'
      : '6 0 7.8 4.5 12 4.5 8.5 7.5 9.5 12 6 9 2.5 12 3.5 7.5 0 4.5 4.2 4.5';
  const color1 = tintColor ?? colors['additional/success'];
  const color2 = tintColor2 ?? colors['gray scale/0'];

  return (
    <Box {...props}>
      {t(
        label,
        <Text style={{ ...typography['body/large – regular'] }} mr={2}>
          {label}
        </Text>,
      )}
      <Box flexDirection="row" alignItems="center">
        {isRankNum && (
          <Text
            mr={1}
            style={{
              ...typography[
                size === 'large'
                  ? 'body/large – regular'
                  : 'body/small – regular'
              ],
              color: tintColor ?? colors['additional/success'],
            }}>
            {!!rank
              ? formatAmount(Math.round(+rank * 10) / 10, 1, false)
              : '0.0'}
          </Text>
        )}
        {Array(5)
          .fill()
          .map((e, i) => {
            let starGradient;

            if (rank >= i + 1) {
              starGradient = 100;
            } else if (rank < i + 1 && rank > i) {
              const gradient = (rank - i) * 100;
              if (gradient > 70) {
                starGradient = gradient - 5;
              } else if (gradient >= 50) {
                starGradient = gradient + 10;
              } else if (gradient >= 30) {
                starGradient = gradient + 25;
              } else if (gradient > 0) {
                starGradient = gradient + 30;
              }
            } else {
              starGradient = 0;
            }

            return (
              <Svg
                width={size === 'large' ? 20 : size === 'middle' ? 16 : 14}
                height={size === 'large' ? 17 : size === 'middle' ? 13 : 12}>
                <LinearGradient
                  id="grad"
                  x1="0"
                  y1="100%"
                  x2={starGradient + '%'}
                  y2="100%">
                  <Stop offset={starGradient + '%'} stopColor={color1} />
                  <Stop offset={'100%'} stopColor={color2} />
                </LinearGradient>
                <Polygon
                  width={20}
                  points={points}
                  fill="url(#grad)"
                  stroke={color1}
                />
              </Svg>
            );
          })}
      </Box>
    </Box>
  );
};

export default RankBadge;
