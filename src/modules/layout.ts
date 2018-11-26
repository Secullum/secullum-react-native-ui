import { Dimensions } from "react-native";

export const isTablet = () => 
    Dimensions.get("window").height > 800 && Dimensions.get("window").width > 500;
