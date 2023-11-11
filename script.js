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
  #avgSingle;
  #avgMultiple;
  #arrays;

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

  _initializeFirstArray() {
    const array = [];

    for (let i = 0; i < this.#arraySize; i++) {
      let value = this._generateRandomNormalDistributionInRange();
      array.push(value);
    }

    return array;
  }

  _arrayInitializer() {
    const arrays = [[...this._initializeFirstArray()]];

    for (let i = 1; i < this.#numberOfArrays; i++) {
      arrays.push([]);
      arrays[i] = [...arrays[0]];
    }
    return arrays;
  }

  _shuffleArray(arrays) {
    for (let arr of arrays) {
      const arrayShuffled = arr.sort(() => Math.random() - 0.5);
      arrays[arrays.indexOf(arr)] = [...arrayShuffled];
    }
    return arrays;
  }

  _sumSingleArray(arr) {
    return arr[0].slice(0, this.#arrPartSingle).reduce((a, b) => a + b, 0);
  }

  _sumMultipleArray(arr) {
    let sum = 0;
    for (let i = 1; i < arr.length; i++) {
      sum += arr[i].slice(0, this.#arrPartMultiple).reduce((a, b) => a + b, 0);
    }

    return sum;
  }

  _avgArrays(arr) {
    return arr.reduce((a, b) => a + b, 0) / this.#iterations;
  }

  _generateNumbers() {
    if (this.#arrPartSingle > this.#arraySize) {
      console.log("Wrong array part");
      return;
    }

    for (let i = 0; i < this.#iterations; i++) {
      this.#arrays = this._shuffleArray(this._arrayInitializer());

      this.#sumSingle.push(this._sumSingleArray(this.#arrays));

      this.#sumMultiple.push(this._sumMultipleArray(this.#arrays));
    }
    this.#avgSingle = this._avgArrays(this.#sumSingle);
    this.#avgMultiple = this._avgArrays(this.#sumMultiple);

    this._printResults();
  }

  // Wyświetlenie wyników w konsoli
  _printResults() {
    console.log(this.#arrays);
    console.log(`Average single: ${this.#avgSingle}`);
    console.log(`Average multiple: ${this.#avgMultiple}`);
    console.log(
      `Difference beetwen average: ${Math.abs(
        this.#avgMultiple - this.#avgSingle
      ).toFixed(5)}`
    );
    console.log(`Min number: ${this.#minValue}`);
    console.log(`Max number: ${this.#maxValue}`);
    console.log(`Number of iterations: ${this.#iterations}`);
    console.log(`Array size: ${this.#arraySize}`);
    console.log(
      `Number of arrays: ${this.#numberOfArrays} = (${
        this.#numberOfArrays - 1
      } Multiple + 1 Single)`
    );
    console.log(`Single array part: ${this.#arrPartSingle}`);
    console.log(`Multiple array part: ${this.#arrPartMultiple}`);
  }
}

const ex1 = new NormalDistributionAnalyzer(1, 10, 100000, 10, 5, 5);
ex1._generateNumbers();
