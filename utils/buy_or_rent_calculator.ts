// rent_vs_buy_calculator.ts

// Fill array with initial value
type NumericArray = number[];

function fillArray(length: number, value: number = 0): NumericArray {
  return new Array(length).fill(value);
}

function monthlyRate(annualRate: number): number {
  return Math.pow(1 + annualRate, 1 / 12) - 1;
}

function calculateLoanSeries(loanAmount: number, annualInterest: number, years: number) {
  const months = 12 * years;
  const r = monthlyRate(annualInterest);

  const annuity = annualInterest === 0
      ? loanAmount / months
      : (loanAmount * r) / (1 - Math.pow(1 + r, -months));

  const series = fillArray(months + 1);
  series[0] = loanAmount;

  for (let i = 1; i <= months; i++) {
    series[i] = series[i - 1] * (1 + r) - annuity;
  }

  return { annuity, series };
}

function calculateAnnualIncrease(initialValue: number, growthRate: number, years: number): NumericArray {
  const result = fillArray(12 * years + 1);
  result[0] = initialValue;

  for (let i = 1; i < result.length; i++) {
    const yearlyGrowth = (i % 12 === 0) ? growthRate : 0;
    result[i] = result[i - 1] * (1 + yearlyGrowth);
  }

  return result;
}

export type BuyVsRentInput = {
  initialCapital: number;
  realEstatePrice: number;
  purchasingCost: number;
  increaseValuePerYear: number;
  fullDurationYears: number;
  financingInterest1: number;
  financingInterest2: number;
  firstDurationYears: number;
  monthlyRent: number;
  increaseRentPerYear: number;
  yearlyMaintenance: number;
  investmentYield: number;
};

export function compareBuyVsRent(input: BuyVsRentInput) {
  const {
    initialCapital,
    realEstatePrice,
    purchasingCost,
    increaseValuePerYear,
    fullDurationYears,
    financingInterest1,
    financingInterest2,
    firstDurationYears,
    monthlyRent,
    increaseRentPerYear,
    yearlyMaintenance,
    investmentYield
  } = input;

  const effectiveCapital = Math.min(initialCapital, realEstatePrice * (1 + purchasingCost));
  const propertyValueSeries = calculateAnnualIncrease(realEstatePrice, increaseValuePerYear, fullDurationYears);

  const loanAmount = Math.max(realEstatePrice * (1 + purchasingCost) - effectiveCapital, 0);

  const firstLoan = calculateLoanSeries(loanAmount, financingInterest1, firstDurationYears);
  const monthsFirstPhase = 12 * firstDurationYears;
  const monthsSecondPhase = 12 * (fullDurationYears - firstDurationYears);

  const secondLoan = calculateLoanSeries(
      firstLoan.series[monthsFirstPhase],
      financingInterest2,
      fullDurationYears - firstDurationYears
  );

  const fullAnnuities = [
    ...fillArray(monthsFirstPhase, firstLoan.annuity),
    ...fillArray(monthsSecondPhase, secondLoan.annuity)
  ];

  const fullLoanSeries = [
    ...firstLoan.series.slice(0, monthsFirstPhase + 1),
    ...secondLoan.series.slice(1)
  ];

  const homeOwnerEquity = propertyValueSeries.map((value, idx) => value - fullLoanSeries[idx]);

  const rentSeries = calculateAnnualIncrease(monthlyRent, increaseRentPerYear, fullDurationYears);
  const maintenanceSeries = calculateAnnualIncrease(realEstatePrice * yearlyMaintenance / 12, 0.02, fullDurationYears);

  const buyerTotalCost = fullAnnuities.map((cost, idx) => cost + maintenanceSeries[idx]);
  const monthlySavings = buyerTotalCost.map((buyerCost, idx) => buyerCost - rentSeries[idx]);

  const investmentSeries = fillArray(monthlySavings.length + 1);
  const effectiveYield = monthlyRate(investmentYield * (1 - 0.26375));
  investmentSeries[0] = effectiveCapital;

  for (let i = 0; i < monthlySavings.length; i++) {
    investmentSeries[i + 1] = (investmentSeries[i] + monthlySavings[i]) * (1 + effectiveYield);
  }

  const initialOutflow = realEstatePrice * purchasingCost;
  const totalBuyerCost = buyerTotalCost.reduce((sum, cost) => sum + cost, 0) + initialOutflow;

  return {
    realEstateCredit: {
      annuities: fullAnnuities,
      series: fullLoanSeries
    },
    rents: rentSeries,
    maintenance: maintenanceSeries,
    savings: monthlySavings,
    homeOwnerEquity,
    renterEquity: investmentSeries,
    buyerMonthlyCost: buyerTotalCost,
    renterMonthlyCost: rentSeries,
    initialOutflow,
    totalBuyerCost
  };
}
