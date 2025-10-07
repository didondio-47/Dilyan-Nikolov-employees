import { Routes } from '@angular/router';

export const routes: Routes = [{
    path: '',
    loadComponent: () => import('./app/components/start-wars/star-wars-table.component').then((m) => m.StarWarsTable),
}];
