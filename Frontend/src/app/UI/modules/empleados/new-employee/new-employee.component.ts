import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { EmployeesGateway } from '../../../../domain/models/employees/gateway/employees-gateway';
import { DomSanitizer } from '@angular/platform-browser';
import { CargosGateway } from '../../../../domain/models/cargos/gateway/cargos-gateway';
import { Employee } from '../../../../domain/models/employees/employees.model';
import { catchError } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrl: './new-employee.component.scss'
})
export class NewEmployeeComponent {
  nombre: string = '';
  cedula: number = 0;
  foto!: string | undefined;
  fechaIngreso!: Date;
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
    private sanitizer: DomSanitizer,
  ) {}
  categoryCollection: any;

returnF = ()=>{
  this.router.navigate(['/empleados']);
}

onRemove(event:any) {
  this.files.splice(this.files.indexOf(event), 1);
}
  async ngOnInit(){
    await this._cargosGateway.getCargosCollection().subscribe(
      (response: any) => {
        this.cargosCollection = response;
      }
    )

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

  create(){
    let employee: Employee ={
      nombre: this.nombre,
      cedula: this.cedula,
      cargoId: this.selectedCargo,
      foto: this.foto !== undefined ? this.foto : undefined
    }

    this._employeesGateway.addEmployee(employee).pipe(
      catchError((error) => {
        return Swal.fire({
          icon: 'error',
          text: 'No se ha podido añadir el empleado',
          color: '#fff',
          background: 'rgba(8,73,129,0.85)',
          confirmButtonColor: '#0d6efd'
        })
      })
    ).subscribe((response: any) =>{
      Swal.fire({
        icon: 'success',
        text: 'El empleado se ha añadido con éxito!',
        color: '#fff',
        background: 'rgba(8,73,129,0.85)',
        iconColor: '#fff',
        confirmButtonColor: '#0d6efd'
      })
      return  this.router.navigate(['/empleados']);
    });
  }
  canCreateEmployee(): boolean {
    return this.nombre !== '' && this.cedula !== 0;
  }

}
