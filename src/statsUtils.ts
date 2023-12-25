import { WineData } from './types';

export interface ClassStats {
  className: number;
  mean: number;
  median: number;
  mode: number;
}

// Function to calculate the mean of a numeric array
const calculateMean = (values: number[]): number => {
  const sum = values.reduce((acc, val) => acc + val, 0);
  return sum / values.length;
};

// Function to calculate the median of a numeric array
const calculateMedian = (values: number[]): number => {
  const sortedValues = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sortedValues.length / 2);
  return sortedValues.length % 2 === 0 ? (sortedValues[mid - 1] + sortedValues[mid]) / 2 : sortedValues[mid];
};

// Function to calculate the mode of a numeric array
const calculateMode = (values: number[]): number => {
  const frequencyMap = values.reduce((acc, val) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  let modeValue: number | null = null;
  let maxFrequency = 0;

  Object.entries(frequencyMap).forEach(([value, frequency]) => {
    const numericValue = parseFloat(value);
    if (frequency > maxFrequency) {
      modeValue = numericValue;
      maxFrequency = frequency;
    }
  });

  return modeValue !== null ? modeValue : 0;
};

// Function to calculate class-wise statistics for Flavanoids
export const calculateFlavanoidsStatsByClass = (data: WineData[]): ClassStats[] => {
  const groupedByClass: Record<number, number[]> = {};

  data.forEach((item) => {
    const alcoholClass = item.Alcohol;
    if (!groupedByClass[alcoholClass]) {
      groupedByClass[alcoholClass] = [];
    }
    groupedByClass[alcoholClass].push(item.Flavanoids);
  });

  const flavanoidsStats: ClassStats[] = [];

  for (const alcoholClass in groupedByClass) {
    const classData = groupedByClass[parseInt(alcoholClass)];

    const mean = calculateMean(classData);
    const median = calculateMedian(classData);
    const mode = calculateMode(classData);

    flavanoidsStats.push({
      className: parseInt(alcoholClass),
      mean,
      median,
      mode,
    });
  }

  return flavanoidsStats;
};

// Function to calculate Gamma for each point in the dataset
export const calculateGammaForDataset = (data: WineData[]): number[] => {
  return data.map((item) => (item.Ash * item.Hue) / item.Magnesium);
};

// Function to calculate class-wise statistics for Gamma

export const calculateGammaStatsByClass = (data: WineData[]): ClassStats[] => {
  const gammaValues = calculateGammaForDataset(data);

  const groupedByClass: Record<number, number[]> = {};

  data.forEach((item, index) => {
    const alcoholClass = item.Alcohol;
    if (!groupedByClass[alcoholClass]) {
      groupedByClass[alcoholClass] = [];
    }
    groupedByClass[alcoholClass].push(gammaValues[index]);
  });

  const gammaStats: ClassStats[] = [];

  for (const alcoholClass in groupedByClass) {
    const classData = groupedByClass[parseInt(alcoholClass)];

    const mean = calculateMean(classData);
    const median = calculateMedian(classData);
    const mode = calculateMode(classData);

    gammaStats.push({
      className: parseInt(alcoholClass),
      mean,
      median,
      mode,
    });
  }

  return gammaStats;
};
