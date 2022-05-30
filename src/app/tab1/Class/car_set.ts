import { Engine } from "./engine";
export class Car_set
{
    model: string;
    private engine: Engine;
       constructor(model) {
        this.model = model;
        this.engine = null;
    }
    get Engine()
    {
        return this.engine;
    }
     set Engine(val) {
       if (val instanceof Engine) {
           this.engine = val;
       } else {
           throw new Error(`${val} should be instance of Engine`);
       }
   }
}