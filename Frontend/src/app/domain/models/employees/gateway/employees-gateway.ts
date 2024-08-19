import { Observable } from "rxjs";
import { Employee } from "../employees.model";

export abstract class EmployeesGateway {
  abstract currentEmployee: number;
  abstract employeeCollection: Employee[];
  abstract actCurrentEmployee(id: number): void;
  abstract addEmployee(employee: Employee): Observable<Employee>;
  abstract deleteEmployee(id: number): Observable<Employee>;
  abstract updateEmployee(id: number, employee: Employee): Observable<Boolean>
  abstract getEmployeeCollection(): Observable<Employee[]>;
  abstract getEmployeeById(id: number): Observable<Employee>;
}
