import { IEngine } from './IOC/iengine';
import { EngineInjector } from './Model/engineinjector';
import { Engine } from './Class/engine';
import { Car } from './Class/car';
import { Component } from '@angular/core';
import { Car_DI_constructor } from './Class/car_di_constructor';
import { Car_set } from './Class/car_set';
import { Car_Engine } from './Model/car_engine';
import { Car_IOC } from './IOC/car_ioc';

import { Engine_gas } from './IOC/engine_gas';
import { EngineFactory } from './IOC/enginefactory';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  //Масив автівок для прикладу 4
 cars: Car_Engine[];
 //Оголошуємо новий інжектор
injector = new EngineInjector();
  constructor() { }
  //Залежності Приклад1
  ras(name: string,power:number)
  {
    let car: Car;
    car = new Car(name,power);
  
    return car.model + " Двигун потужністю " + car.engine.power;

  }
  //Через конструктор Приклад2
  ras_constructor(name: string,power:number)
  {
    let car_di: Car_DI_constructor;
   let eng = new Engine();
    eng.power = power;
    car_di = new Car_DI_constructor(name,eng)
  
    return car_di.model + " Двигун потужністю " + car_di.engine.power;

  }
  //Через сеттер Приклад3
  ras_set(name: string,power:number)
  {
    let   car_s: Car_set;
    let eng = new Engine();
    eng.power = power;
   car_s = new Car_set(name);
    car_s.Engine = eng;
  
    return car_s.model + " Двигун потужністю " + car_s.Engine.power;

  }
  //Інтерфейс. Приклад4
  ras_interface()
  {
    this.cars = new Array();
    let n: number = 3;
    let models: string[] = ['Tesla1', 'Tesla2', 'Tesla3'];
    let powers: number[] = [3, 5, 10];
   
    
    for (let i = 0; i < n; i++)
    {
      let car = new Car_Engine(models[i]);
      let eng = new Engine();
      eng.power = powers[i];
      this.cars.push(car);
      //Робимо ін'єкцію залежностей
      this.injector.inject(this.cars[i], eng);
      
      }
  }
  //Зміна потужностей всіх двигунів
  update_engine_power(power:number)
  {
    let eng = new Engine();
    eng.power = power;
    this.injector.updateEngine(eng);
  }
//Приклад з контейнером
  ras_ioc(name:string,engine:string,power:number)
  {
  
    let car_ioc = new Car_IOC(name);
    let eng: IEngine;
    eng = new Engine_gas();
 
    eng.Name = engine;
    eng.Power = power;
    let inj = new EngineFactory();
    inj.inject(car_ioc, eng);
   
    return car_ioc.Model+"  Двигун    "+car_ioc.Engine.Name+"  Потужність =   "+car_ioc.Engine.Power;

  }
}
