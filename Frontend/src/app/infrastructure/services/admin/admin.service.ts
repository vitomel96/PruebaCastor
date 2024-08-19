import { Injectable } from "@angular/core";
import { AdminGateway } from "../../../domain/models/admin/gateway/admin-gateway";
import { environment } from "../../../../environments/environment";
import { Admin } from "../../../domain/models/admin/admin.model";

@Injectable({
  providedIn: 'root'
})
export class AdminService extends AdminGateway {

   currentAdmin: Admin | undefined;
  private _url = environment.backendURL;
  constructor(){
    super();
    const imagen = 'assets/FOTO.png';
    this.currentAdmin = {
      id: 1,
      nombre: 'Victor Lara',
      foto: imagen,
      rol: 'Admin'
    };
  }
}
