import { Routes } from '@angular/router';

export const routes: Routes = [{
    path: '',
    loadComponent: () => import('./app/components/csv-parser/csv-parser.component').then((m) => m.CSVParserComponent),
}];
