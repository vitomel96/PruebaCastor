import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { EmployeesGateway } from '../../../../domain/models/employees/gateway/employees-gateway';
import Swal from 'sweetalert2';
import { catchError, throwError } from 'rxjs';
import { Employee } from '../../../../domain/models/employees/employees.model';
import { Cargo } from '../../../../domain/models/cargos/cargos.model';
import { Router } from '@angular/router';
import { CargosGateway } from '../../../../domain/models/cargos/gateway/cargos-gateway';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrl: './update-employee.component.scss'
})
export class UpdateEmployeeComponent {
  @Input() currentEmployee: number = 0;
  nombre: string = '';
  cedula: number = 0;
  id: number = 0;
  foto!: string | undefined;
  fechaIngreso!: any ;
  cargoId!: number;
  cargosCollection: any;
  openModal: boolean = false;
  currentImage: any;
  selectedCargo: any;
  return = faArrowLeft;
  files: any;
  constructor(
    private router: Router,
    private _employeesGateway: EmployeesGateway,
    private _cargosGateway: CargosGateway,
  ) {}
  categoryCollection: any;

returnF = ()=>{
  this.router.navigate(['/empleados']);
}

onRemove(event:any) {
  this.files.splice(this.files.indexOf(event), 1);
}
  async ngOnInit(){

    this.currentEmployee = this._employeesGateway.currentEmployee

    if(this.currentEmployee === 0){
      this.router.navigate(['/empleados']);
    }else{
      await this._employeesGateway.getEmployeeById(this.currentEmployee).subscribe(
        (responseEmployee: Employee) =>{
          this.id = responseEmployee.id || 0;
          this.nombre = responseEmployee.nombre;
          this.cedula = responseEmployee.cedula;
          this.fechaIngreso = responseEmployee.fechaIngreso;
          if(responseEmployee.foto){
            this.foto = responseEmployee.foto;
          }
          this.cargoId = responseEmployee.cargoId;
        }
      )

      await this._cargosGateway.getCargosCollection().subscribe(
        (response: any) => {
          this.cargosCollection = response;
        }
      )
    }


  }
  onCroppedImageChanged(croppedImage: any){
      this.foto = croppedImage
  }
  showModal(){
    this.openModal = true;
  }
  remove(number: number){
    this.foto = undefined;
  }
  closeModal(){
    this.openModal = false;
  }

  onNameChange(target: any) {
    this.nombre = target.value;
  }
  onCedulaChange(target: EventTarget | null): void {
    const inputElement = target as HTMLInputElement;

    if (inputElement) {
      let value = inputElement.value;

      if (/^\d*$/.test(value)) {
        if (value.length > 10) {
          value = value.slice(0, 10);
        }
        this.cedula = +value;
        inputElement.value = value;
      } else {
        inputElement.value = value.slice(0, -1);
      }
    }
  }
  async onCargoChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.selectedCargo = selectedValue;
  }
  handleImageCropped(croppedImage: string) {

      this.foto = croppedImage;
    }

    update() {

      let employee: Employee = {
        id: this.currentEmployee,
        nombre: this.nombre,
        cedula: this.cedula,
        cargoId: this.selectedCargo !== undefined ? this.selectedCargo : this.cargoId,
        fechaIngreso: this.fechaIngreso,
        foto: this.foto !== undefined ? this.foto : undefined
      };

      // Utiliza el método put del servicio para actualizar el empleado
      this._employeesGateway.updateEmployee(this.currentEmployee, employee).pipe(
        catchError((error) => {
          Swal.fire({
            icon: 'error',
            text: 'No se ha podido actualizar el empleado',
            color: '#fff',
            background: 'rgba(8,73,129,0.85)',
            confirmButtonColor: '#0d6efd'
          });
          return throwError(error);
        })
      ).subscribe(() => {
        Swal.fire({
          icon: 'success',
          text: 'El empleado se ha actualizado con éxito!',
          color: '#fff',
          background: 'rgba(8,73,129,0.85)',
          iconColor: '#fff',
          confirmButtonColor: '#0d6efd'
        });
        this.router.navigate(['/empleados']);
      });
    }


}
