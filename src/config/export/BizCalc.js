export const PrevBizCompCalc = (air, load, power) => {
  const Total_Air = air * load;
  const Total_Kwh = power * Total_Air;

  const Emissions = (Total_Kwh / 1000) * 0.46625;
  return { Total_Air, Total_Kwh, Emissions };
};

export const NextBizCompCalc = (air, load, power) => {
  const Total_Air = air * load;
  const Total_Kwh = power * Total_Air;

  const Emissions = (Total_Kwh / 1000) * 0.45941;
  return { Total_Air, Total_Kwh, Emissions };
};
