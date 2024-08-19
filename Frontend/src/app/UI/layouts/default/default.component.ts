import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { faBars, faX } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss'
})
export class DefaultComponent {
  @ViewChild('routerOutlet', { static: true }) outlet: RouterOutlet | any;
  isSidebarOpen = innerWidth < 769 ?  false : true;
  faMenu= faBars
  faX= faX
  // Función para destruir el componente actual
  destroyCurrentComponent() {
    if (this.outlet && this.outlet.isActivated) {
      const component = this.outlet.component;
      this.outlet.detach();
      component.ngOnDestroy(); // Llamar manualmente al ngOnDestroy si es necesario
    }
  }
  toggleSidebar() {
    if(innerWidth < 769){
      this.isSidebarOpen = !this.isSidebarOpen;
    }
  }


}
