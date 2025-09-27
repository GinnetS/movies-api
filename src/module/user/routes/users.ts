import { Router } from 'express';
import { createUserService } from '../service/create-user.service';
import { SeenMovieService } from '../service/seen-movie.service';
import { listMoviesSeenService } from '../service/list-movies-seen.service';

export const router = Router();

router.post('/', createUserService);
router.post('/watch', SeenMovieService);
router.get('/watched', listMoviesSeenService);