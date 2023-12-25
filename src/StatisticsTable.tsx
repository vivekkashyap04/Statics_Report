import React from 'react';
import { ClassStats } from './statsUtils';

interface StatisticsTableProps {
  flavanoidsStats: ClassStats[];
  gammaStats: ClassStats[];
}

const StatisticsTable: React.FC<StatisticsTableProps> = ({ flavanoidsStats, gammaStats }) => {
    return (
      <div>
        <h2>Flavanoids Table</h2>
      <table>
        <thead>
          <tr>
            <th>Measure</th>
            {flavanoidsStats.map((stats) => (
              <th key={`class-${stats.className}`}>Class {stats.className}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Flavanoids Mean</td>
            {flavanoidsStats.map((stats) => (
              <td key={`flavanoids-mean-${stats.className}`}>{stats.mean.toFixed(3)}</td>
            ))}
          </tr>
          <tr>
            <td>Flavanoids Median</td>
            {flavanoidsStats.map((stats) => (
              <td key={`flavanoids-mean-${stats.className}`}>{stats.median.toFixed(3)}</td>
            ))}
          </tr>
          <tr>
            <td>Flavanoids Mode</td>
            {flavanoidsStats.map((stats) => (
              <td key={`flavanoids-mean-${stats.className}`}>{stats.mode.toFixed(3)}</td>
            ))}
          </tr>
          </tbody>
          </table>
          <h2>Gamma Table</h2>
          <table>
            <thead>
          <tr>
            <th>Measure</th>
            {gammaStats.map((stats) => (
              <th key={`class-${stats.className}`}>Class {stats.className}</th>
            ))}
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>Gamma Mean</td>
            {gammaStats.map((stats) => (
              <td key={`gamma-mean-${stats.className}`}>{stats.mean.toFixed(3)}</td>
            ))}
          </tr>
          <tr>
            <td>Gamma Median</td>
            {gammaStats.map((stats) => (
              <td key={`gamma-mean-${stats.className}`}>{stats.median.toFixed(3)}</td>
            ))}
          </tr>
          <tr>
            <td>Gamma Mode</td>
            {gammaStats.map((stats) => (
              <td key={`gamma-mean-${stats.className}`}>{stats.mode.toFixed(3)}</td>
            ))}
          </tr>
        </tbody>
      </table>
      </div>
    );
  };

export default StatisticsTable;
