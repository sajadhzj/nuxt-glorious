import colors from "tailwindcss/colors.js";
export default function gTailwindColor(name:string, range:number) {
    const gTailwindColor: any = colors;

    return gTailwindColor[name][range]
}
