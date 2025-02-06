"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoviesService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
const rxjs_1 = require("rxjs");
let MoviesService = class MoviesService {
    constructor(httpService, configService) {
        this.httpService = httpService;
        this.configService = configService;
        this.baseUrl = this.configService.get('TMDB_BASE_URL') || 'https://api.themoviedb.org/3';
        this.apiKey = this.configService.get('TMDB_API_KEY') || 'default_api_key';
    }
    async getNowPlaying(page = 1) {
        const url = `${this.baseUrl}/movie/now_playing?api_key=${this.apiKey}&page=${page}`;
        const response$ = this.httpService.get(url);
        const response = await (0, rxjs_1.lastValueFrom)(response$);
        return response.data;
    }
    async searchMovies(query, page = 1) {
        const url = `${this.baseUrl}/search/movie?api_key=${this.apiKey}&query=${encodeURIComponent(query)}&page=${page}`;
        const response$ = this.httpService.get(url);
        const response = await (0, rxjs_1.lastValueFrom)(response$);
        return response.data;
    }
    async getMovies(query, page = 1, sort) {
        let data;
        if (query) {
            data = await this.searchMovies(query, page);
        }
        else {
            data = await this.getNowPlaying(page);
        }
        if (sort && data.results && Array.isArray(data.results)) {
            data.results.sort((a, b) => {
                if (a[sort] < b[sort])
                    return -1;
                if (a[sort] > b[sort])
                    return 1;
                return 0;
            });
        }
        return data;
    }
};
exports.MoviesService = MoviesService;
exports.MoviesService = MoviesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService])
], MoviesService);
//# sourceMappingURL=movies.service.js.map