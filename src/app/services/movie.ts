import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Movie {
  id: string;     
  title: string;
  year: string;
  description: string;
  poster: string;
}

@Injectable({ providedIn: 'root' })
export class MovieService {
  private apiKey = '5f1b44e8';
  private baseUrl = 'https://www.omdbapi.com/';

  constructor(private http: HttpClient) {}

  searchMovies(query: string): Observable<Movie[]> {
    const url = `${this.baseUrl}?apikey=${this.apiKey}&s=${encodeURIComponent(query)}`;
    return this.http.get<any>(url).pipe(
      map(response => {
        if (response.Response === 'True') {
          return response.Search.map((item: any) => this.mapToMovie(item));
        } else {
          return [];
        }
      })
    );
  }


  getMovieById(id: string): Observable<Movie> {
    const url = `${this.baseUrl}?apikey=${this.apiKey}&i=${id}&plot=full`;
    return this.http.get<any>(url).pipe(
      map(item => this.mapToMovieDetails(item))
    );
  }

  getMovies(): Observable<Movie[]> {
    return this.searchMovies('Avengers');
  }

  private mapToMovie(item: any): Movie {
    return {
      id: item.imdbID,
      title: item.Title,
      year: item.Year,
      description: '',
      poster: item.Poster !== 'N/A' ? item.Poster : 'https://via.placeholder.com/500x750?text=No+Image'
    };
  }

  private mapToMovieDetails(item: any): Movie {
    return {
      id: item.imdbID,
      title: item.Title,
      year: item.Year,
      description: item.Plot,
      poster: item.Poster !== 'N/A' ? item.Poster : 'https://via.placeholder.com/500x750?text=No+Image'
    };
  }
}
