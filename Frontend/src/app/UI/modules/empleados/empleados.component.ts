import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {
  faMagnifyingGlass,
  faPencil,
  faX,
} from '@fortawesome/free-solid-svg-icons';
import { Employee } from '../../../domain/models/employees/employees.model';
import { EmployeesGateway } from '../../../domain/models/employees/gateway/employees-gateway';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.scss',
})
export class EmpleadosComponent {
  defaultLanguage = 'es-419';
  browserLanguage = navigator.language || this.defaultLanguage;
  faX = faX;
  faPencil = faPencil;
  faMagni = faMagnifyingGlass;
  employeesList: Employee[] | undefined;
  dataSource: any;
  currentEmployee: number = 0;
  displayedColumns: string[] = [
    'id',
    'nombre',
    'cedula',
    'cargo',
    'fecha',
    'edit',
    'eliminate',
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  constructor(
    private _employeesGateway: EmployeesGateway,
    private route: Router
  ) {}

  onPageChange(event: any) {
    this.dataSource.paginator = this.paginator;
    this.paginator.pageSize = event.pageSize;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async ngOnInit() {
    await this._employeesGateway
      .getEmployeeCollection()
      .subscribe((response: any) => {
        this.employeesList = response;
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
      });
  }
  async delete(id: number) {
    const indexToDelete = this.dataSource.data.findIndex(
      (employee: any) => employee.id === id
    );

    if (indexToDelete === -1) {
      return;
    }

    this._employeesGateway.deleteEmployee(id).subscribe(async () => {
      this.dataSource.data.splice(indexToDelete, 1);
      this.dataSource._updateChangeSubscription();

      await this._employeesGateway
        .getEmployeeCollection()
        .subscribe((response: any) => {
          this.dataSource = new MatTableDataSource(response);
          this.dataSource.paginator = this.paginator;
        });
    });
  }
  async update(id: number) {
    this._employeesGateway.actCurrentEmployee(id);
    this.route.navigate(['empleados/actualizar-empleado']);
  }
}
