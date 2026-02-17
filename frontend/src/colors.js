export const colors = {
  primary: {
    light: "#dbeafe",
    normal: "#3b82f6",
    dark: "#1e40af",
  },
  secondary: {
    light: "#dbeafe",
    normal: "#0ea5e9",
    dark: "#0369a1",
  },
  success: {
    light: "#dcfce7",
    normal: "#22c55e",
    dark: "#15803d",
  },
  danger: {
    light: "#fee2e2",
    normal: "#ef4444",
    dark: "#b91c1c",
  },
  warning: {
    light: "#fef3c7",
    normal: "#f59e0b",
    dark: "#b45309",
  },
  gray: {
    light: "#f3f4f6",
    normal: "#6b7280",
    dark: "#1f2937",
  },
  background: {
    light: "#f9fafb",
    normal: "#ffffff",
    dark: "#f3f4f6",
  },
};

export const gradients = {
  primary: `linear-gradient(135deg, ${colors.primary.normal} 0%, ${colors.secondary.normal} 100%)`,
  subtle: `linear-gradient(135deg, ${colors.background.dark} 0%, ${colors.primary.light} 100%)`,
};
