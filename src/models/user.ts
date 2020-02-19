import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export interface User {
    id: number;
    name: string;
}

@Entity({name: 'user'})
export class UserEntity implements User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}
