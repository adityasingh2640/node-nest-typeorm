import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';
import { CreateReportDTO } from './dtos/create-reports.dto';
import { Reports } from './reports.entity';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Reports) private repo: Repository<Reports>) { }

    create(body: CreateReportDTO, user: User) {
        const report = this.repo.create(body);
        report.user = user;
        return this.repo.save(report);
    }

    async approveReport(id: string, approved: boolean) {
        const report = await this.repo.findOneBy({ id: parseInt(id) });
        if (!report) {
            throw new NotFoundException(`Report not found for id :${id}`);
        }
        report.approved = approved
        return this.repo.save(report);
    }

    async createEstimate(estimateDto: GetEstimateDto) {
        const { make, model, year, longitude, latitude, mileage } = estimateDto;

        // Via  build query builder
        return this.repo.createQueryBuilder()
        .select('AVG(price)','price')
        .where('make =:make', { make })
        .andWhere('model =:model', { model })
        .andWhere('longitude - :longitude BETWEEN -5 AND 5', { longitude })
        .andWhere('latitude - :latitude BETWEEN -5 AND 5', { latitude })
        .andWhere('year - :year BETWEEN -3 AND 3', { year })
        .andWhere('approved IS TRUE')
        .orderBy('ABS(mileage- :mileage)', 'DESC')
        .setParameters({ mileage })
        .limit(3)
        .getRawOne();

        // Via javascript logic
        // const report = await this.repo.find({ where: { make, model } });
        // const filteredReport = report.filter(elem => (elem.approved === true && (elem.year - year >= - 3 && elem.year - year <= 3)
        //     && (elem.longitude - longitude >= - 5 && elem.longitude - longitude <= 5)
        //     && (elem.latitude - latitude >= - 5 && elem.latitude - latitude <= + 5))).sort((a, b) => b.mileage - a.mileage).slice(-3);
        // let estimatedPrice = 0;
        // if (filteredReport.length) {
        //     for (let elem of filteredReport) {
        //         estimatedPrice += elem.price;
        //     }
        //     return {price:estimatedPrice / filteredReport.length};
        // }
        // return {price:estimatedPrice};
    }
}
