import colors from "tailwindcss/colors.js";
export default function tailwindColor(name:string, range:number) {
    const tailwindColor: any = colors;

    return tailwindColor[name][range]
}
