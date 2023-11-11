"use strict";

// Funkcja do generowania liczby z rozkładu normalnego i transformacji do zakresu od 1 do 10
class NormalDistributionAnalyzer {
  
  // Parametry rozkładu normalnego
  sumSingle = [];
  sumMultiple = [];
  minValue;
  maxValue;
  mean = (this.minValue + this.maxValue) / 2; // Średnia wartość
  stdDev = (this.minValue + this.maxValue) / 4; // Odchylenie standardowe

  constructor(minValue, maxValue) {
    this.minValue = minValue;
    this.maxValue = maxValue;
  }
  

  _generateRandomNormalDistributionInRange(
    mean,
    stdDev,
    minValue,
    maxValue
  ) {
    let value;
    do {
      let u = 0,
        v = 0;
      while (u === 0) u = Math.random();
      while (v === 0) v = Math.random();
  
      // Transformacja Boxa-Mullera
      const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  
      // Przeskalowanie i przeniesienie wartości do zakresu od 1 do 10
      value = mean + z * stdDev;
      value = transformToRange(value, minValue, maxValue);
    } while (value < minValue || value > maxValue); // Sprawdzenie zakresu
  
    return Math.trunc(value);
  }
  
  // Funkcja do przekształcania liczby na zakres od 1 do 10
  _transformToRange(value, minValue, maxValue) {
    return Math.min(Math.max(value, minValue), maxValue);
  }
  
  
  // Generowanie 100 liczb z rozkładu normalnego i transformacja do zakresu od 1 do 10
  /*
  for (let i = 0; i < 1_000_000; i++) {
    const arrays = [[], [], [], [], [], []];
    for (const arr of arrays) {
      for (let i = 0; i < 100; i++) {
        let value = generateRandomNormalDistributionInRange(mean, stdDev, 1, 10);
        arr.push(value);
      }
    }
    const sum0 = arrays[0].slice(0, 50).reduce((a, b) => a + b, 0);
    sumSingle.push(sum0);
  
    const sum1_5 =
      arrays[1].slice(0, 10).reduce((a, b) => a + b, 0) +
      arrays[2].slice(0, 10).reduce((a, b) => a + b, 0) +
      arrays[3].slice(0, 10).reduce((a, b) => a + b, 0) +
      arrays[4].slice(0, 10).reduce((a, b) => a + b, 0) +
      arrays[5].slice(0, 10).reduce((a, b) => a + b, 0);
    sumMultiple.push(sum1_5);
  }
  */
  // Wyświetlenie wyników w konsoli
  
  const sumSingleAverage =
    sumSingle.reduce((a, b) => a + b, 0) / sumSingle.length;
  const sumMultipleAverage =
    sumMultiple.reduce((a, b) => a + b, 0) / sumMultiple.length;
  
  console.log("Srednia suma 50 liczb z 1. zbioru: " + sumSingleAverage);
  console.log(
    "Srednia suma 10 liczb z 5. zbiorow tablicy: " + sumMultipleAverage
  );
  
  console.log(
    `Roznica pomiedzy srednimi: ${Math.abs(
      sumSingleAverage - sumMultipleAverage,
      6
    ).toFixed(5)} przy ${sumSingle.length}. prob.`
  );
}
