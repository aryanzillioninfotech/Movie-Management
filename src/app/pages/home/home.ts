import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Movie, MovieService } from '../../services/movie';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl:"./home.html"
})
export class HomeComponent implements OnInit {
  movies: Movie[] = [];

  constructor(private movieService: MovieService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.movieService.getMovies().subscribe(movies => {
      this.movies = movies;
      console.log('Movies loaded: ', this.movies);
      this.cdr.detectChanges();
    });
  }
}
