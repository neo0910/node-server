import axios, {Axios} from 'axios';
import {Request, Response, Router} from 'express';

class MovieController {
  private readonly router: Router;
  private readonly httpService: Axios;

  constructor() {
    this.router = Router();
    this.httpService = axios.create({baseURL: 'http://api.tvmaze.com/'});

    this.router.route('/movies').get(this.getMovies);
    this.router.route('/movies/genres').get(this.getGenres);
  }

  private getGenres = async (req: Request, res: Response) => {
    const {data} = await this.httpService.get('/search/shows', {params: {q: req.query.search}});
    const genres = data
      .map((d) => d.show.genres)
      .reduce((acc, cur) => {
        cur.forEach((g) => (acc[g] = g));
        return acc;
      }, {});

    return res.json(Object.keys(genres));
  };

  private getMovies = async (req: Request, res: Response) => {
    const {data} = await this.httpService.get('/search/shows', {params: {q: req.query.search}});
    const movies = data.filter((m) => m.show.genres.includes(req.query.genre));

    return res.json(movies);
  };

  get routes() {
    return this.router;
  }
}

const movieController = new MovieController();

export {movieController};
