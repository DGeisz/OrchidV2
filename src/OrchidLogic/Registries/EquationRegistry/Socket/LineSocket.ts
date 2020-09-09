import { Socket } from "./Socket";
import { SocketInstance, SocketType } from "../EquationTypes";

export class LineSocket extends Socket {
   constructor() {
       super();
   }

   toFlatRep(): SocketInstance {
       return {
           id: this.id,
           type: SocketType.line
       }
   }
}