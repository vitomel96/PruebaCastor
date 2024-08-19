import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from '../../modules/home/home.module';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { DefaultComponent } from './default.component';
import { EmpleadosModule } from '../../modules/empleados/empleados.module';
import { HeaderComponent } from "../../shared/components/header/header.component";
import { FooterComponent } from "../../shared/components/footer/footer.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [DefaultComponent],
  imports: [
    CommonModule,
    HomeModule,
    EmpleadosModule,
    RouterModule,
    CommonModule,
    SharedModule,
    FontAwesomeModule,
],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DefaultModule { }
