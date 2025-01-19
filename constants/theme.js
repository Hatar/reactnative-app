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

export const DATA_MEALS = [
    { id: '1', title: 'MEALS', price: '$12.99', image: ICONS.biryani },
    { id: '2', title: 'MEALS', price: '$9.99', image: ICONS.pizza },
    { id: '3', title: 'MEALS', price: '$11.49', image: ICONS.chinese },
    { id: '4', title: 'MEALS', price: '$2.99', image: ICONS.desserts },
    { id: '5', title: 'MEALS', price: '$7.49', image: ICONS.sandwich },
    { id: '6', title: 'MEALS', price: '$7.49', image: ICONS.sandwich },
    { id: '7', title: 'MEALS', price: '$7.49', image: ICONS.sandwich },
];

export const DATA_COMBOS = [
    { id: '1', title: 'COMBOS', price: '$12.99', image: ICONS.biryani },
    { id: '2', title: 'COMBOS', price: '$9.99', image: ICONS.pizza },
    { id: '3', title: 'COMBOS', price: '$11.49', image: ICONS.chinese },
    { id: '4', title: 'COMBOS', price: '$2.99', image: ICONS.desserts },
    { id: '5', title: 'COMBOS', price: '$7.49', image: ICONS.sandwich },
    { id: '6', title: 'COMBOS', price: '$7.49', image: ICONS.sandwich },
    { id: '7', title: 'COMBOS', price: '$7.49', image: ICONS.sandwich },
];

