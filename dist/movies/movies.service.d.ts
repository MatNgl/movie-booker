import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
export declare class MoviesService {
    private readonly httpService;
    private readonly configService;
    private readonly baseUrl;
    private readonly apiKey;
    constructor(httpService: HttpService, configService: ConfigService);
    getNowPlaying(page?: number): Promise<any>;
    searchMovies(query: string, page?: number): Promise<any>;
    getMovies(query?: string, page?: number, sort?: string): Promise<any>;
}
