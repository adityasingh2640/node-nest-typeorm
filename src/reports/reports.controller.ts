import { Body, Controller, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../user/decorators/current-user.decorator';
import { User } from '../user/user.entity';
import { AuthGuard } from '../user/guards/auth.guard';
import { CreateReportDTO } from './dtos/create-reports.dto';
import { ReportsService } from './reports.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ReportDto } from './dtos/report-interceptor.dtos';
import { ApprovedReportDto } from './dtos/approved-reports.dto';

@Controller('reports')
export class ReportsController {
    constructor(private reportService: ReportsService) { }

    @Post()
    @UseGuards(AuthGuard)
    @Serialize(ReportDto)
    createReports(@Body() body: CreateReportDTO, @CurrentUser() user: User) {
        return this.reportService.create(body, user);
    }

    @Patch('/:id')
    approveReport(@Param('id') id: string, @Body() body: ApprovedReportDto) {
        return this.reportService.approveReport(id, body.approved);
    }
}
