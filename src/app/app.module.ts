import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';

import { NgxPermissionsModule } from 'ngx-permissions';


// Rutas
import { APP_ROUTING }  from './app.routes';

// Servicios
import { AplicacionService } from './servicios/aplicacion.service';
import { UtilService } from './servicios/util.service';

// Componentes
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { CasosComponent } from './components/casos/casos.component';
import { ParametrizacionComponent } from './components/parametrizacion/parametrizacion.component';
import { EmpresaComponent } from './components/parametrizacion/empresa/empresa.component';
import { ReferenciasComponent } from './components/parametrizacion/referencias/referencias.component';
import { UsuariosComponent } from './components/parametrizacion/usuarios/usuarios.component';
import { CrearEmpresaComponent } from './components/parametrizacion/empresa/crear-empresa/crear-empresa.component';
import { EditarEmpresaComponent } from './components/parametrizacion/empresa/editar-empresa/editar-empresa.component';
import { CrearReferenciaComponent } from './components/parametrizacion/referencias/crear-referencia/crear-referencia.component';
import { EditarReferenciaComponent } from './components/parametrizacion/referencias/editar-referencia/editar-referencia.component';
import { CrearUsuarioComponent } from './components/parametrizacion/usuarios/crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './components/parametrizacion/usuarios/editar-usuario/editar-usuario.component';
import { CrearHijosComponent } from './components/parametrizacion/referencias/crear-referencia/crear-hijos/crear-hijos.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CasoSoftComponent } from './components/casos/caso-soft/caso-soft.component';
import { LoginComponent } from './components/autenticacion/login/login.component';
import { AsignarCasosComponent } from './components/casos/asignar-casos/asignar-casos.component';
import { CasosActivosComponent } from './components/casos/casos-activos/casos-activos.component';
import { EditarCasoComponent } from './components/casos/editar-caso/editar-caso.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CasosComponent,
    ParametrizacionComponent,
    EmpresaComponent,
    ReferenciasComponent,
    UsuariosComponent,
    CrearEmpresaComponent,
    EditarEmpresaComponent,
    CrearReferenciaComponent,
    EditarReferenciaComponent,
    CrearUsuarioComponent,
    EditarUsuarioComponent,
    CrearHijosComponent,
    CasoSoftComponent,
    LoginComponent,
    AsignarCasosComponent,
    CasosActivosComponent,
    EditarCasoComponent,
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatFormFieldModule,
    NgxPermissionsModule.forRoot(),
    MatProgressBarModule,
    MatCardModule,
    MatIconModule,
    MatGridListModule
  ],
  exports: [ NgxPaginationModule ],
  providers: [
    AplicacionService,
    UtilService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
