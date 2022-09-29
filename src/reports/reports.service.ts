import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';
import { CreateReportDTO } from './dtos/create-reports.dto';
import { Reports } from './reports.entity';

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
}
