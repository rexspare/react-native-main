import React from 'react';
import { Animated, Image as RNImage } from 'react-native';
import { Layout, ViewPager } from '@ui-kitten/components';
import Box from './Box';
import Button from './Button';
import styled, { css } from 'styled-components/native';
import Logo from 'img/landing-logo.svg';

const Slider = styled(ViewPager)`
  flex: 1;
`;

const ImageSlider = styled(Layout)`
  flex: 2;
`;

const Image = styled(RNImage)`
  flex: 1;
  width: 100%;
  height: auto;
`;

const Dots = styled(Layout)`
  background-color: transparent;
  align-items: center;
  justify-content: center;
  margin-top: 10;
  width: 100%;
  flex-direction: row;
  min-height: 15px;
  flex: 1;
`;

const SliderButton = styled(Button)`
  margin-left: 20;
  margin-right: 20;
  margin-top: 30;
  min-height: 53;
  border-radius: 12;
`;

const textStyle = {
  fontSize: 20,
  fontWeight: '700',
};

const Dot = styled(Animated.View)`
  margin-horizontal: ${({ middle }) => (middle ? 7 : 0)};

  ${({ active }) =>
    !active
      ? css`
          border-radius: 7;
          width: 7;
          height: 7;
          background-color: #cfd8dc;
        `
      : css`
          border-radius: 11;
          width: 11;
          height: 11;
          background-color: #36796f;
        `}
`;

const Carousel = ({ slides, style }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [dotAnim] = React.useState(new Animated.Value(0));
  const prevSelected = React.useRef(0);

  React.useEffect(() => {
    Animated.timing(dotAnim, {
      toValue: selectedIndex,
      duration: 250,
    }).start();
    prevSelected.current = selectedIndex;
  }, [dotAnim, selectedIndex]);

  const dotAnimations = slides.map((s, index) => {
    let inputRange = [prevSelected.current, selectedIndex];
    if (inputRange[0] > inputRange[1]) {
      inputRange = inputRange.reverse();
    }
    if (index === prevSelected.current) {
      const size = dotAnim.interpolate({
        inputRange,
        outputRange: prevSelected.current > selectedIndex ? [7, 11] : [11, 7],
      });

      const color = dotAnim.interpolate({
        inputRange,
        outputRange:
          prevSelected.current > selectedIndex
            ? ['#CFD8DC', '#36796f']
            : ['#36796f', '#CFD8DC'],
      });
      return {
        width: size,
        height: size,
        borderRadius: size,
        backgroundColor: color,
      };
    } else if (index === selectedIndex) {
      const size = dotAnim.interpolate({
        inputRange,
        outputRange: prevSelected.current > selectedIndex ? [11, 7] : [7, 11],
      });
      const color = dotAnim.interpolate({
        inputRange,
        outputRange:
          prevSelected.current > selectedIndex
            ? ['#36796f', '#CFD8DC']
            : ['#CFD8DC', '#36796f'],
      });
      return {
        width: size,
        height: size,
        borderRadius: size,
        backgroundColor: color,
      };
    }
    return {};
  });

  const goToNextSlide = () => {
    setSelectedIndex(selectedIndex + 1);
  };

  return (
    <Layout style={style}>
      <Slider selectedIndex={selectedIndex} onSelect={setSelectedIndex}>
        {slides.map((slide, index) => (
          <React.Fragment key={index}>
            <ImageSlider>
              <Box as={Image} source={slide.image} />
            </ImageSlider>
            <Box
              style={{
                minHeight: 100,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Logo width={50} height={50} />
            </Box>
            <Slider
              as={Layout}
              style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '10%' }}>
              {slide.content}
              <Box>
                <Dots>
                  {slides.map((s, index) => (
                    <Dot
                      key={index}
                      active={index === selectedIndex}
                      middle={index > 0 && index < slides.length - 1}
                      style={dotAnimations[index]}
                    />
                  ))}
                </Dots>
                <SliderButton
                  onPress={slide.buttonPress ?? goToNextSlide}
                  textStyle={textStyle}>
                  {slide.buttonText}
                </SliderButton>
              </Box>
            </Slider>
          </React.Fragment>
        ))}
      </Slider>
    </Layout>
  );
};

export default Carousel;
