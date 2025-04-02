module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // adjust based on your project structure
  ],
  safelist: [
    "col-span-1",
    "col-span-2",
    "col-span-3",
    "col-span-4",
    "col-span-5",
    "col-span-6",
    "col-span-7",
    "col-span-8",
    "col-span-9",
    "col-span-10",
    "row-span-1",
    "row-span-2",
    "row-span-3",
    "row-span-4",
    "row-span-5",
    "row-span-6",
    "row-span-7",
    "row-span-8",
    "row-span-9",
    "row-span-10",
    {
      pattern: /(col|row)-span-(1|2|3|4|5|6|7|8|9|10)/,
    },
  ],

  theme: {
    extend: {},
  },
};
