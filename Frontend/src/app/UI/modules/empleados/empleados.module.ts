import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule} from '@angular/material/table';
import {MatDividerModule} from '@angular/material/divider';
import {MatInputModule} from '@angular/material/input';
import { EmpleadosComponent } from './empleados.component';
import { UpdateEmployeeComponent } from "./update-employee/update-employee.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NewEmployeeComponent } from './new-employee/new-employee.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ImageModalComponent } from './image-modal/image-modal.component';
import { ImageCropperComponent } from 'ngx-image-cropper';



@NgModule({
  declarations: [
    EmpleadosComponent, 
    UpdateEmployeeComponent,
    NewEmployeeComponent,
  ImageModalComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatDividerModule,
    FontAwesomeModule,
    FormsModule,
    ImageCropperComponent,
    RouterModule
],
exports: [
  EmpleadosComponent,
  UpdateEmployeeComponent,
  NewEmployeeComponent,
  ImageModalComponent

],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EmpleadosModule { }
