import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Rutas
import { APP_ROUTING }  from './app.routes';

// Servicios
import { AplicacionService } from './servicios/aplicacion.service';
import { UtilService } from './servicios/util.service';

// Componentes
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { SoporteComponent } from './components/soporte/soporte.component';
import { CasosComponent } from './components/casos/casos.component';
import { ParametrizacionComponent } from './components/parametrizacion/parametrizacion.component';
import { EmpresaComponent } from './components/parametrizacion/empresa/empresa.component';
import { ReferenciasComponent } from './components/parametrizacion/referencias/referencias.component';
import { UsuariosComponent } from './components/parametrizacion/usuarios/usuarios.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    SoporteComponent,
    CasosComponent,
    ParametrizacionComponent,
    EmpresaComponent,
    ReferenciasComponent,
    UsuariosComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING
  ],
  providers: [
    AplicacionService,
    UtilService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
