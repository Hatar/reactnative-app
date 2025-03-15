import { PixelRatio } from "react-native";
import pizza from '../assets/pizza.png'
import logo from '../assets/logo.png'
import cart from '../assets/cart.png'
import deleteIcon from '../assets/dlt.png'
import EditIcon from '../assets/editer.png'
import AddIcon from '../assets/add.png'
import mealIcon from '../assets/meal.png'
import combosIcon from '../assets/combos.png'
import settingsIcon from '../assets/settings.png'
import SignOutIcon from '../assets/logout.png'
import NoFood from '../assets/noFoods.png'
import eye from '../assets/eye.png'
import eyeClose from '../assets/eyeclose.png'
import profileIcon from "../assets/profile.png"
import closeIcon from "../assets/close.png"

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
    pizza,
    logo,
    cart,
    deleteIcon,
    EditIcon,
    AddIcon,
    mealIcon,
    combosIcon,
    settingsIcon,
    SignOutIcon,
    NoFood,
    eye,
    eyeClose,
    profileIcon,
    closeIcon
}

