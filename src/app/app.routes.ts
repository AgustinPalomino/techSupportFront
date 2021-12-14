
import { RouterModule, Routes} from '@angular/router';
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
import { CasoSoftComponent } from './components/casos/caso-soft/caso-soft.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from 'src/app/components/autenticacion/login/login.component';
import { AsignarCasosComponent } from 'src/app/components/casos/asignar-casos/asignar-casos.component';
import { CasosActivosComponent } from 'src/app/components/casos/casos-activos/casos-activos.component';
import { EditarCasoComponent } from 'src/app/components/casos/editar-caso/editar-caso.component';

const APP_ROUTES: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [ AuthGuard ] },
    { path: 'casos', component: CasosComponent, canActivate: [ AuthGuard ] },
    { path: 'parametrizacion', component: ParametrizacionComponent, canActivate: [ AuthGuard ] },
    { path: 'empresa', component: EmpresaComponent, canActivate: [ AuthGuard ] },
    { path: 'referencias', component: ReferenciasComponent, canActivate: [ AuthGuard ] },
    { path: 'usuarios', component: UsuariosComponent, canActivate: [ AuthGuard ] },
    { path: 'crear-empresa', component: CrearEmpresaComponent, canActivate: [ AuthGuard ] },
    { path: 'editar-empresa/:Id', component: EditarEmpresaComponent, canActivate: [ AuthGuard ] },
    { path: 'crear-referencia/:codRef', component: CrearReferenciaComponent, canActivate: [ AuthGuard ] },
    { path: 'editar-referencia', component: EditarReferenciaComponent, canActivate: [ AuthGuard ] },
    { path: 'crear-usuario', component: CrearUsuarioComponent, canActivate: [ AuthGuard ] },
    { path: 'editar-usuario/:Id', component: EditarUsuarioComponent, canActivate: [ AuthGuard ] },
    { path: 'crear-hijos/:codRef', component: CrearHijosComponent, canActivate: [ AuthGuard ] },
    { path: 'caso-soft', component: CasoSoftComponent, canActivate: [ AuthGuard ] },
    { path: 'login', component: LoginComponent },
    { path: 'asignar-casos', component: AsignarCasosComponent, canActivate: [ AuthGuard ] },
    { path: 'casos-activos', component: CasosActivosComponent, canActivate: [ AuthGuard ] },
    { path: 'editar-caso/:Id', component: EditarCasoComponent, canActivate: [ AuthGuard ] },
    { path: '', pathMatch: 'full', redirectTo: 'login'},
    { path: '**', pathMatch: 'full', redirectTo: 'home'}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash:true});

