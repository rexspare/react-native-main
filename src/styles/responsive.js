import { Dimensions, Platform } from "react-native"

const { width, height } = Dimensions.get("window")
const guidelineBaseHeight = 667;

export const HEIGHT = height;
export const WIDTH = width;
export const IS_SMALLER = width <= 360;
export const IS_LARGER = width  >= 380;
export const HEIGHT_RATIO = height / guidelineBaseHeight;
export const IS_ANDROID = Platform.OS !== "ios"