import { Router } from 'express';
import { createMovieService } from '../service/create-movie.service';
import { FilterMovieService } from '../service/filter-movie.service';
import { newMovieService } from '../service/news-movie.service';

export const router = Router();

router.post('/',createMovieService);
router.post('/filter',FilterMovieService);
router.get('/news', newMovieService);