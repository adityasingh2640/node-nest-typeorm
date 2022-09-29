import { Exclude } from 'class-transformer';
import { Reports } from '../reports/reports.entity';
import { Entity, Column, PrimaryGeneratedColumn, AfterInsert, AfterUpdate, AfterRemove, OneToMany } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    //@Exclude()
    password: string;

    @Column({default:true})
    admin:boolean

    @OneToMany(()=> Reports ,(report)=>report.user)
    reports:Reports[];

    @AfterInsert()
    logInsert() {
        console.log('Inserted user with id', this.id);
    }
    @AfterUpdate()
    logUpdate() {
        console.log('Updated user with id', this.id);
    }
    @AfterRemove()
    LogRemove() {
        console.log('Remove user');
    }
    
}