module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    fontFamily: {
      body: ["Trispace", "sans-serif"],
    },
    extend: {
      boxShadow: {
        "flat-xs": "0 0 0 1px rgba(0, 0, 0, 0.05)",
        "flat-sm": "0 1px 0 0 rgba(0, 0, 0, 0.05)",
        flat: "0 1px 0 0 rgba(0, 0, 0, 0.1), 0 1px 0 0 rgba(0, 0, 0, 0.06)",
        "flat-md":
          "0 4px 0 -1px rgba(0, 0, 0, 0.1), 0 2px 0 -1px rgba(0, 0, 0, 0.06)",
        "flat-lg":
          "0 10px 0 -3px rgba(0, 0, 0, 0.1), 0 4px 0 -2px rgba(0, 0, 0, 0.05)",
        "flat-xl":
          "0 20px 0 -5px rgba(0, 0, 0, 0.1), 0 10px 0 -5px rgba(0, 0, 0, 0.04)",
        "flat-2xl": "0 25px 0 -12px rgba(0, 0, 0, 0.25)",
        "flat-inner": "inset 0 2px 0 0 rgba(0, 0, 0, 0.06)",
      },
    },
  },
  variants: {
    color: ({ after }) => after(["hover"]),
  },
  plugins: [],
};
