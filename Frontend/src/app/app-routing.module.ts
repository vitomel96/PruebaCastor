import { RouterModule, Routes } from "@angular/router";
import { DefaultComponent } from "./UI/layouts/default/default.component";
import { NgModule } from "@angular/core";
import { HomeComponent } from "./UI/modules/home/home.component";
import { EmpleadosComponent } from "./UI/modules/empleados/empleados.component";
import { NewEmployeeComponent } from "./UI/modules/empleados/new-employee/new-employee.component";
import { UpdateEmployeeComponent } from "./UI/modules/empleados/update-employee/update-employee.component";


const routes: Routes = [
  {
    path: "",
    component: DefaultComponent,
    children: [
      {
        path: "",
        component: HomeComponent
      },
      {
        path: "empleados",
        component: EmpleadosComponent,
      },
      {
        path: "empleados/nuevo-empleado",
        component: NewEmployeeComponent,
      },
      {
        path: "empleados/actualizar-empleado",
        component: UpdateEmployeeComponent,
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
