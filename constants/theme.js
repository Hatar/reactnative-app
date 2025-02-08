import { PixelRatio } from "react-native";
import biryani from '../assets/biryani.png'
import chinese from '../assets/chinese.png'
import desserts from '../assets/desserts.png'
import pizza from '../assets/pizza.png'
import sandwich from '../assets/sandwich.png'
import logo from '../assets/logo.png'
import cart from '../assets/cart.png'
import deleteIcon from '../assets/delete.png'

import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

const fontSize = PixelRatio.getFontScale()


export const SIZES = {
    small: 9 *  fontSize,
    medium: 14 * fontSize,
    large: 18 * fontSize,
    xLarge: 24 * fontSize,
    // app dimensions
    width,
    height,
    padding: 10,
    padding2: 12,
    radius: 30,
}

export const COLORS = {
    bg: "#111827",
    cardBg: "#1F2937",
    second: "#4F46E5",
    white: "#FFF",
    black: "#000",
    gray: "#ddd",
    errors:'#F00'
}

export const FONTS = {
    bold:'interBold',
    semiBold:'interSemiBold',
    medium:'InterMedium',
    regular:'InterRegular',
    light:'InterLight'
}


export const ICONS = {
    biryani,
    chinese,
    desserts,
    pizza,
    sandwich,
    logo,
    cart,
    deleteIcon
}

