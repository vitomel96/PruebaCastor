import { Injectable } from "@angular/core";
import { EmployeesGateway } from "../../../domain/models/employees/gateway/employees-gateway";
import { Employee } from "../../../domain/models/employees/employees.model";
import { environment } from "../../../../environments/environment";
import { GenericService } from "../../helpers/generic.service";
import { Observable, tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmployeesService extends EmployeesGateway {
  private _url = environment.backendURL;
  currentEmployee: number ;
  employeeCollection: Employee[] = [];
  constructor(private genericService: GenericService) {
    super();
    this.currentEmployee = 0;
    this.employeeCollection = [
      {
        id: 1,
        cedula: 123456789,
        nombre: 'Jane Doe',
        foto: 'jane.jpg',
        fechaIngreso: new Date('2022-01-01'),
        cargoId: 1
      }
      // Otros empleados
    ]; }
  actCurrentEmployee (id: number) {
     this.currentEmployee = id;
  }
  addEmployee = (Employee: Employee) =>{
   return this.genericService.post<Employee>(this._url, 'api/employee', Employee)
  }
  deleteEmployee = (id: number ) =>{
    return this.genericService.delete<Employee>(this._url, `api/employee/${id}`)
  }
  updateEmployee(id: number, update: Employee): Observable<Boolean> {
    return this.genericService.put<Boolean>(this._url, `api/employee/${id}`,update)
  }
  getEmployeeCollection(): Observable<Employee[]> {
    return this.genericService.get<Employee[]>(this._url,'api/employee').pipe(
      tap((response: Employee[]) => {
        this.employeeCollection = response
      })
    )
}
    getEmployeeById(id: number): Observable<Employee> {
      return this.genericService.get<Employee>(this._url,`api/employee/${id} `)

}
}
