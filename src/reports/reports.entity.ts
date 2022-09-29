import { User } from '../user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Reports {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    price: number;
    @Column()
    make:string;
    @Column()
    model:string;
    @Column()
    year:number;
    @Column()
    longitude:string
    @Column()
    latitude:string
    @Column()
    mileage:number
    @Column({default:false})
    approved:boolean

    @ManyToOne(()=> User ,(user)=>user.reports)
    @JoinColumn({name:'user_id'}) // This is how we can change the column name in report table
    user:User;
}