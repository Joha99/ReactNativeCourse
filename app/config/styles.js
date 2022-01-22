import { Platform } from "react-native";
import colors from "./colors";

// TEXT
export default {
  text: {
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    color: colors.dark,
  },
  colors,
};
