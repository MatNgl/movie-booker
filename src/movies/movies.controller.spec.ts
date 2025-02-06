import { Controller, Get, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';

@ApiTags('movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  @ApiOperation({
    summary: 'Récupérer des films',
    description: 'Récupère les films en salle actuellement ou recherche un film selon le paramètre "search". Supporte la pagination et le tri via le paramètre "sort".',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page de résultats (pour la pagination)',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Termes de recherche pour filtrer les films',
  })
  @ApiQuery({
    name: 'sort',
    required: false,
    type: String,
    description: 'Champ par lequel trier les résultats (ex: "title", "release_date")',
  })
  async getMovies(
    @Query('page') page: number = 1,
    @Query('search') search?: string,
    @Query('sort') sort?: string,
  ) {
    return this.moviesService.getMovies(search, page, sort);
  }
}
