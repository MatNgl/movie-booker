import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class MoviesService {
  private readonly baseUrl: string;
  private readonly apiKey: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.baseUrl = this.configService.get<string>('TMDB_BASE_URL') || 'https://api.themoviedb.org/3';
    this.apiKey = this.configService.get<string>('TMDB_API_KEY') || 'd89894ee284d5d1c7e55d895e7139cc6';
  }

  // Récupère les films en salle actuellement (now playing)
  async getNowPlaying(page: number = 1): Promise<any> {
    const url = `${this.baseUrl}/movie/now_playing?api_key=${this.apiKey}&page=${page}`;
    const response$ = this.httpService.get(url);
    const response = await lastValueFrom(response$);
    return response.data;
  }

  // Recherche des films par titre
  async searchMovies(query: string, page: number = 1): Promise<any> {
    const url = `${this.baseUrl}/search/movie?api_key=${this.apiKey}&query=${encodeURIComponent(query)}&page=${page}`;
    const response$ = this.httpService.get(url);
    const response = await lastValueFrom(response$);
    return response.data;
  }

  // Méthode unifiée pour obtenir des films, avec option de recherche et de tri
  async getMovies(query?: string, page: number = 1, sort?: string): Promise<any> {
    let data: any;
    if (query) {
      data = await this.searchMovies(query, page);
    } else {
      data = await this.getNowPlaying(page);
    }
    // Si un champ de tri est fourni, trier localement le tableau results
    if (sort && data.results && Array.isArray(data.results)) {
      data.results.sort((a, b) => {
        // On suppose que le champ de tri est une chaîne ; sinon, adapter la comparaison
        if (a[sort] < b[sort]) return -1;
        if (a[sort] > b[sort]) return 1;
        return 0;
      });
    }
    return data;
  }
}
