import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Movie } from '../movies/movie.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true, length: 80 })
  name!: string;

  @OneToMany(() => Movie, (m) => m.category)
  movies!: Movie[];
}