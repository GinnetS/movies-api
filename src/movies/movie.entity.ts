import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';
import { Category } from '../categories/category.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index()
  @Column({ length: 200 })
  title!: string;

  @Column({ type: 'date' })
  releaseDate!: string;

  @ManyToOne(() => Category, (c) => c.movies, { eager: true, onDelete: 'RESTRICT' })
  category!: Category;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}