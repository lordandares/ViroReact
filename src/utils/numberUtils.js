const SI_SYMBOL = ['', 'k', 'M', 'G', 'T', 'P', 'E'];

export const formatAbbreviatedNumber = number => {
  if (!number) {
    return 0;
  }

  const tier = (Math.log10(number) / 3) | 0;
  if (tier === 0) {
    return number;
  }

  const suffix = SI_SYMBOL[tier];
  const scale = Math.pow(10, tier * 3);
  const scaled = number / scale;

  return scaled.toFixed(1) + suffix;
};
