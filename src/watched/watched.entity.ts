import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, Unique } from 'typeorm';
import { User } from '../users/user.entity';
import { Movie } from '../movies/movie.entity';

@Entity()
@Unique(['user', 'movie'])
export class Watched {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User, (u) => u.watched, { eager: true, onDelete: 'CASCADE' })
  user!: User;

  @ManyToOne(() => Movie, { eager: true, onDelete: 'CASCADE' })
  movie!: Movie;

  @CreateDateColumn()
  watchedAt!: Date;
}