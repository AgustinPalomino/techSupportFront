
import { RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CasosComponent } from './components/casos/casos.component';
import { SoporteComponent }  from './components/soporte/soporte.component';
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

const APP_ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'casos', component: CasosComponent },
    { path: 'soporte', component: SoporteComponent },
    { path: 'parametrizacion', component: ParametrizacionComponent },
    { path: 'empresa', component: EmpresaComponent },
    { path: 'referencias', component: ReferenciasComponent },
    { path: 'usuarios', component: UsuariosComponent },
    { path: 'crear-empresa', component: CrearEmpresaComponent },
    { path: 'editar-empresa', component: EditarEmpresaComponent },
    { path: 'crear-referencia', component: CrearReferenciaComponent },
    { path: 'editar-referencia', component: EditarReferenciaComponent },
    { path: 'crear-usuario', component: CrearUsuarioComponent },
    { path: 'editar-usuario/:Id', component: EditarUsuarioComponent },
    { path: 'crear-hijos/:codRef', component: CrearHijosComponent },
    { path: 'caso-soft', component: CasoSoftComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash:true});

