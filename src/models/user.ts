import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';

export interface User {
    id: string;
    name: string;
}

@Entity({name: 'user'})
export class UserEntity implements User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column({
        select: false
    })
    login: string;

    @Column({
        select: false
    })
    hash: string;
    
}

export interface Creds {
    login: string;
    password: string;
}