
import { RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CasosComponent } from './components/casos/casos.component';
import { SoporteComponent }  from './components/soporte/soporte.component';
import { ParametrizacionComponent } from './components/parametrizacion/parametrizacion.component';
import { EmpresaComponent } from './components/parametrizacion/empresa/empresa.component';
import { ReferenciasComponent } from './components/parametrizacion/referencias/referencias.component';
import { UsuariosComponent } from './components/parametrizacion/usuarios/usuarios.component';

const APP_ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'casos', component: CasosComponent },
    { path: 'soporte', component: SoporteComponent },
    { path: 'parametrizacion', component: ParametrizacionComponent },
    { path: 'empresa', component: EmpresaComponent },
    { path: 'referencias', component: ReferenciasComponent },
    { path: 'usuarios', component: UsuariosComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash:true});

