import { Observable } from "rxjs";
import { Admin } from "../admin.model";

export abstract class AdminGateway {
  abstract currentAdmin: Admin | undefined;
}
