import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { MovieDetailsComponent } from './pages/movie-details/movie-details';
import { SearchComponent } from './pages/search/search';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'movie/:id', component: MovieDetailsComponent },
  { path: '**', redirectTo: '' }
];
