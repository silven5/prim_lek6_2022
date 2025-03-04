import { Injectable } from '@angular/core';
import { IEngine } from './iengine';
//Декоратор для позначення класу для ін'єкції залежностей
@Injectable()
//Газовий двигун
export class Engine_electro implements IEngine {
  private name: string;
  private currentPower: number;
  private maxPower: number;
  constructor() {
    this.name = 'Електродвигун';
    this.currentPower = 0;
    this.maxPower = 60;
  }
  get Power() {
    return this.currentPower;
  }
  set Power(val) {
    if (val >= 0 && val < this.maxPower) {
      this.currentPower = val;
    } else {
      throw new Error(
        `Incorrect power value: ${val}. Should be between 0 and ${this.maxPower}`
      );
    }
  }
  set Name(val) {
    this.name = val;
  }
  get Name() {
    return this.name;
  }
  get Name_pal() {
    return 'електроенергія';
  }
}
