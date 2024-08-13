export const colors = {
  orange: "var(--color-orange)",
  yellow: "var(--color-yellow)",
  black: "var(--color-black)",
  grey: "var(--color-grey)",
  white: "var(--color-white)",
};

export const getTextColorClass = (color) => {
  switch (color) {
    case colors.white:
      return "color-white";
    case colors.grey:
      return "color-grey";
    case colors.black:
      return "color-black";
    case colors.orange:
      return "color-orange";
    case colors.yellow:
      return "color-yellow";
  }
};
