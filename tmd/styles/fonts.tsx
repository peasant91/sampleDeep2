import type { Fonts } from "../types";

const fonts: Fonts = {
    thin: {
        fontFamily: "Inter-Thin",
        fontWeight: "100",
    },
    light: {
        fontFamily: "Inter-Light",
        fontWeight: "300",
    },
    regular: {
        fontFamily: "Inter-Regular",
        fontWeight: "400",
    },
    medium: {
        fontFamily: "Inter-Medium",
        fontWeight: "500",
    },
    semiBold: {
        fontFamily: "Inter-SemiBold",
        fontWeight: "600",
    },
    bold: {
        fontFamily: "Inter-Bold",
        fontWeight: "700",
    }
}

export default function configureFonts(): Fonts {
    return fonts;
}
