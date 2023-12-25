import React, { useState, useEffect, useMemo } from 'react';
import { WineData } from './types';
import wineData from './wineData.json'; // Importing the JSON data directly
import { calculateFlavanoidsStatsByClass, calculateGammaStatsByClass, ClassStats } from './statsUtils';
import StatisticsTable from './StatisticsTable';

const App = () => {
  const [flavanoidsStats, setFlavanoidsStats] = useState<ClassStats[]>([]);
  const [gammaStats, setGammaStats] = useState<ClassStats[]>([]);

  const normalizeWineData = (data: any[]): WineData[] => {
    return data.map(item => ({
      Alcohol: parseFloat(item.Alcohol),
      'Malic Acid': parseFloat(item['Malic Acid']),
      Ash: parseFloat(item.Ash),
      'Alcalinity of ash': parseFloat(item['Alcalinity of ash']),
      Magnesium: parseFloat(item.Magnesium),
      'Total phenols': parseFloat(item['Total phenols']),
      Flavanoids: parseFloat(item.Flavanoids),
      'Nonflavanoid phenols': parseFloat(item['Nonflavanoid phenols']),
      Proanthocyanins: typeof item.Proanthocyanins === 'string' ? parseFloat(item.Proanthocyanins) : item.Proanthocyanins,
      'Color intensity': parseFloat(item['Color intensity']),
      Hue: parseFloat(item.Hue),
      'OD280/OD315 of diluted wines': typeof item['OD280/OD315 of diluted wines'] === 'string' ? parseFloat(item['OD280/OD315 of diluted wines']) : item['OD280/OD315 of diluted wines'],
      Unknown: parseFloat(item.Unknown),
    }));
  };
  

  useEffect(() => {
    const normalizedData = normalizeWineData(wineData);
    setFlavanoidsStats(calculateFlavanoidsStatsByClass(normalizedData));
    setGammaStats(calculateGammaStatsByClass(normalizedData));
  }, []);
  return (
    <div>
      <h1>Wine Statistics</h1>
      <StatisticsTable flavanoidsStats={flavanoidsStats} gammaStats={gammaStats} />
    </div>
  );
};

export default App;
