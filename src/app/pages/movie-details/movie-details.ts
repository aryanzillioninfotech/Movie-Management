import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie, MovieService } from '../../services/movie';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-details.html'
})
export class MovieDetailsComponent implements OnInit {

  movie!: Movie;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    const movieId = this.route.snapshot.paramMap.get('id');
    console.log('Movie ID:', movieId);

    if (movieId) {
      this.movieService.getMovieById(movieId).subscribe({
        next: (data) => {
          console.log('Movie details received:', data);
          this.movie = data;
        },
        error: (err) => {
          console.error('Error fetching details:', err);
        }
      });
    }
  }
}
