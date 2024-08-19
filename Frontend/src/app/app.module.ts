import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { DefaultModule } from "./UI/layouts/default/default.module";
import { EmployeesGateway } from "./domain/models/employees/gateway/employees-gateway";
import { EmployeesService } from "./infrastructure/services/employees/employees.service";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserModule } from "@angular/platform-browser";
import { AdminGateway } from "./domain/models/admin/gateway/admin-gateway";
import { AdminService } from "./infrastructure/services/admin/admin.service";
import { HttpClientModule } from "@angular/common/http";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CargosGateway } from "./domain/models/cargos/gateway/cargos-gateway";
import { CargosService } from "./infrastructure/services/cargos/cargo.service";

@NgModule({
  declarations: [AppComponent],
  imports: [
      BrowserModule,
      BrowserAnimationsModule,
      AppRoutingModule,
      DefaultModule,
      BrowserModule,
      FontAwesomeModule,
      HttpClientModule
  ],
  providers: [
    {provide: EmployeesGateway, useClass: EmployeesService},
    {provide: AdminGateway, useClass: AdminService},
    {provide: CargosGateway, useClass: CargosService},

  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class AppModule {}
