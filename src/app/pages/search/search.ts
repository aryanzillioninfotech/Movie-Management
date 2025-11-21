// src/app/pages/search.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { Movie, MovieService } from '../services/movie.service';
import { RouterLink } from '@angular/router';
import { Movie, MovieService } from '../../services/movie';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <h2>Search Movies</h2>
    <form (submit)="search(); $event.preventDefault()">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Enter movie name"
          [(ngModel)]="query"
          name="query"
          required
        />
        <button class="btn btn-primary" type="submit">Search</button>
      </div>
    </form>

    <div *ngIf="results.length === 0 && query">
      <p>No movies found for "{{ query }}".</p>
    </div>

    <div class="row" *ngIf="results.length > 0">
      <div *ngFor="let movie of results" class="col-md-4 mb-3">
        <div class="card h-100">
          <img [src]="movie.poster" class="card-img-top" alt="{{ movie.title }}" />
          <div class="card-body">
            <h5 class="card-title">{{ movie.title }} ({{ movie.year }})</h5>
            <p class="card-text">{{ movie.description | slice: 0: 100 }}...</p>
            <a [routerLink]="['/movie', movie.id]" class="btn btn-primary">Details</a>
          </div>
        </div>
      </div>
    </div>
  `
})
export class SearchComponent {
  query = '';
  results: Movie[] = [];

  constructor(private movieService: MovieService) {}

  search(): void {
    if (this.query.trim()) {
      this.movieService.searchMovies(this.query).subscribe(results => {
         console.log('Search results:', results);
        this.results = results;
      });
    } else {
      this.results = [];
    }
  }
}
