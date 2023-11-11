"use strict";

// Funkcja do generowania liczby z rozkładu normalnego i transformacji do zakresu od 1 do 10
class NormalDistributionAnalyzer {
  // Parametry rozkładu normalnego
  #minValue;
  #maxValue;
  #sumSingle;
  #sumMultiple;
  #iterations;
  #arraySize;
  #mean; // Średnia wartość
  #stdDev; // Odchylenie standardowe
  #numberOfArrays;
  #arrPartSingle;
  #arrPartMultiple;

  constructor(
    minValue,
    maxValue,
    iterations,
    arraySize,
    numberOfArrays,
    arrPartSingle
  ) {
    this.#minValue = minValue;
    this.#maxValue = maxValue;
    this.#iterations = iterations;
    this.#arraySize = arraySize;
    this.#numberOfArrays = numberOfArrays;
    this.#arrPartSingle = arrPartSingle;
    this.#arrPartMultiple = arrPartSingle / numberOfArrays;
    this.#mean = (this.#minValue + this.#maxValue) / 2; // Średnia wartość
    this.#stdDev = (this.#minValue + this.#maxValue) / 4; // Odchylenie standardowe
    this.#sumSingle = [];
    this.#sumMultiple = [];
  }

  _generateRandomNormalDistributionInRange() {
    let value;
    do {
      let u = 0,
        v = 0;
      while (u === 0) u = Math.random();
      while (v === 0) v = Math.random();

      // Transformacja Boxa-Mullera
      const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

      // Przeskalowanie i przeniesienie wartości do zakresu od 1 do 10
      value = this.#mean + z * this.#stdDev;
      value = this._transformToRange(value);
    } while (value < this.#minValue || value > this.#maxValue); // Sprawdzenie zakresu
    const finalValue = Math.trunc(value);

    return finalValue;
  }

  // Funkcja do przekształcania liczby na zakres od 1 do 10
  _transformToRange(value) {
    return Math.min(Math.max(value, this.#minValue), this.#maxValue);
  }

  // Generowanie 100 liczb z rozkładu normalnego i transformacja do zakresu od 1 do 10

  _generateNumbers() {
    for (let i = 0; i < this.#iterations; i++) {
      const arrays = [];

      for (let i = 0; i < this.#numberOfArrays; i++) {
        arrays.push([]);
      }

      for (let i = 0; i < this.#arraySize; i++) {
        let value = this._generateRandomNormalDistributionInRange();
        arrays[0].push(value);
      }

      for (let i = 1; i < this.#numberOfArrays; i++) {
        arrays[i] = [...arrays[0]];
      }

      for (let arr of arrays) {
        const arrayShuffled = arr.sort(() => Math.random() - 0.5);
        arrays[arrays.indexOf(arr)] = [...arrayShuffled];
      }
      console.log(arrays);

      const sum0 = arrays[0]
        .slice(0, this.#arrPartSingle)
        .reduce((a, b) => a + b, 0);

      this.#sumSingle.push(sum0);

      let sum1_5 = 0;

      for (let i = 1; i < arrays.length; i++) {
        sum1_5 += arrays[i]
          .slice(0, this.#arrPartMultiple)
          .reduce((a, b) => a + b, 0);
      }
      this.#sumMultiple.push(sum1_5);
    }
  }
}

const ex1 = new NormalDistributionAnalyzer(1, 10, 5, 5, 7, 50);
ex1._generateNumbers();

// Wyświetlenie wyników w konsoli
/*
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
      */
