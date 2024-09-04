import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/pag-inicio/pag-inicio.module').then( m => m.PagInicioPageModule)
  },
  {
    path: 'pag-alumnos',
    loadChildren: () => import('./pages/pag-alumnos/pag-alumnos.module').then( m => m.PagAlumnosPageModule)
  },
  {
    path: 'pag-cursos',
    loadChildren: () => import('./pages/pag-cursos/pag-cursos.module').then( m => m.PagCursosPageModule)
  },
  {
    path: 'pag-modalidades',
    loadChildren: () => import('./pages/pag-modalidades/pag-modalidades.module').then( m => m.PagModalidadesPageModule)
  },
  {
    path: 'pag-recursos',
    loadChildren: () => import('./pages/pag-recursos/pag-recursos.module').then( m => m.PagRecursosPageModule)
  },
  {
    path: 'pag-bloques',
    loadChildren: () => import('./pages/pag-bloques/pag-bloques.module').then( m => m.PagBloquesPageModule)
  },
  {
    path: 'pag-actividad',
    loadChildren: () => import('./pages/pag-actividad/pag-actividad.module').then( m => m.PagActividadPageModule)
  },
  {
    path: 'pag-video',
    loadChildren: () => import('./pages/pag-video/pag-video.module').then( m => m.PagVideoPageModule)
  },
  {
    path: 'pag-geogebra',
    loadChildren: () => import('./pages/pag-geogebra/pag-geogebra.module').then( m => m.PagGeogebraPageModule)
  }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, onSameUrlNavigation: 'reload' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
