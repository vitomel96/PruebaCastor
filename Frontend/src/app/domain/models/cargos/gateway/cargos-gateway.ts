import { Observable } from "rxjs";
import { Cargo } from "../cargos.model";

export abstract class CargosGateway {
  abstract addCargo(cargo: Cargo): Observable<Cargo>;
  abstract deleteCargo(id: number): Observable<Boolean>;
  abstract updateCargo(id: number, update: any): Observable<Boolean>
  abstract getCargosCollection(): Observable<Cargo[]>;
  abstract getCargoById(id: number): Observable<Cargo>;
}
