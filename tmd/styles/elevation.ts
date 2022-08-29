import { colors } from "./colors";

export default function elevation({
                                    elevation, color,
                                  }: { elevation: number, color?: string }) {

  const SHADOW_OPACITY = 0.24;

  const usedColor = color ?? colors.neutral.neutral_100;
  let height, radius;
  switch (elevation) {
    case 1:
      height = 0.5;
      radius = 0.75;
      break;
    case 2:
      height = 0.75;
      radius = 1.5;
      break;
    default:
      height = elevation - 1;
      radius = elevation;
  }

  return {
    shadowColor: usedColor,
    shadowOffset: {
      width: 0,
      height,
    },
    shadowOpacity: SHADOW_OPACITY,
    shadowRadius: radius,
    elevation: elevation,
  };
}
