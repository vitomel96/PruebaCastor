import { Component } from '@angular/core';
import { Admin } from '../../../../domain/models/admin/admin.model';
import { AdminGateway } from '../../../../domain/models/admin/gateway/admin-gateway';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  admin: Admin | undefined;
  constructor( private _admin: AdminGateway){}

  ngOnInit(): void {
    this.admin = this._admin.currentAdmin  }
}
