import { Component } from '@angular/core';
import { EmployeesGateway } from '../../../domain/models/employees/gateway/employees-gateway';
import { Employee } from '../../../domain/models/employees/employees.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor( private _employeeGateway: EmployeesGateway){}
  employees: number = 0;
  async ngOnInit() {
    await this._employeeGateway.getEmployeeCollection().subscribe((response: Employee[])=>{
      this.employees = response.length;
    })

  }
}
