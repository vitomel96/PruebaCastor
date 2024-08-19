import { Injectable } from "@angular/core";
import { EmployeesGateway } from "../../../domain/models/employees/gateway/employees-gateway";
import { Employee } from "../../../domain/models/employees/employees.model";
import { environment } from "../../../../environments/environment";
import { GenericService } from "../../helpers/generic.service";
import { Observable, tap } from "rxjs";
import { Cargo } from "../../../domain/models/cargos/cargos.model";
import { CargosGateway } from "../../../domain/models/cargos/gateway/cargos-gateway";

@Injectable({
  providedIn: 'root'
})
export class CargosService extends CargosGateway {
  private _url = environment.backendURL;
  constructor(private genericService: GenericService) {
    super();
  }

  addCargo = (Cargo: Cargo) =>{
   return this.genericService.post<Cargo>(this._url, 'api/cargo', Cargo)
  }
  deleteCargo = (id: number ) =>{
    return this.genericService.delete<Boolean>(this._url, `api/cargo/${id}`)
  }
  updateCargo(id: number, update: any): Observable<Boolean> {
    return this.genericService.put<Boolean>(this._url, `api/cargo/${id}`,update)
  }
  getCargosCollection(): Observable<Cargo[]> {
    return this.genericService.get<Cargo[]>(this._url,'api/cargo')
}
    getCargoById(id: number): Observable<Cargo> {
      return this.genericService.get<Cargo>(this._url,`api/cargo/id/${id} `)

}
}
