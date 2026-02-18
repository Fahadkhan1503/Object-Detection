export const colors = {
 
  
  
  
  
  
  primary: {
  light: "#e6fafa",   // 60% — soft teal wash for backgrounds
  normal: "#0d9488",  // 30% — rich teal for panels/nav
  dark: "#134e4a",    // 10% — deep teal for text/accents
},
secondary: {
  light: "#f0fdf9",
  normal: "#2dd4bf",  // mint accent — bounding boxes, highlights
  dark: "#0f766e",
},

  primaryo: {
    light: "#dbeafe",
    normal: "#3b82f6",
    dark: "#1e40af",
  },
  secondaryo: {
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


  backgroundwall: {
    light: "#e6efed",
    normal: "#cddfda",
    dark: "#83afa3",
  },


  background: {
    light: "#f9fafb",
    normal: "#ffffff",
    dark: "#f3f4f6",
  },
  card: {
  light:  "#89a7a5",   // softest — main card background
  normal: "#42716e",   // mid — card hover / elevated state
  dark:   "#134e4a",   // deepest — card border / accent strip
},
};

export const gradients = {
  primary: `linear-gradient(135deg, ${colors.primary.normal} 0%, ${colors.primary.dark} 100%)`,
  subtle: `linear-gradient(135deg, ${colors.background.dark} 0%, ${colors.primary.light} 100%)`,
  card: `linear-gradient(135deg, ${colors.card.light} 0%, ${colors.card.normal} 50%, ${colors.card.dark} 100%)`,
  backgroundwall: `linear-gradient(135deg, ${colors.backgroundwall.light} 0%, ${colors.backgroundwall.normal} 50%, ${colors.backgroundwall.dark} 100%)`,
};
