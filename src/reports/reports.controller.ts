import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../user/decorators/current-user.decorator';
import { User } from '../user/user.entity';
import { AuthGuard } from '../user/guards/auth.guard';
import { CreateReportDTO } from './dtos/create-reports.dto';
import { ReportsService } from './reports.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ReportDto } from './dtos/report-interceptor.dtos';
import { ApprovedReportDto } from './dtos/approved-reports.dto';
import { AdminGuard } from '../user/guards/admin.guard';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Controller('reports')
export class ReportsController {
    constructor(private reportService: ReportsService) { }

    @Get()
    getEstimate(@Query() query: GetEstimateDto) {
        return this.reportService.createEstimate(query);
    }

    @Post()
    @UseGuards(AuthGuard)
    @Serialize(ReportDto)
    createReports(@Body() body: CreateReportDTO, @CurrentUser() user: User) {
        return this.reportService.create(body, user);
    }

    @Patch('/:id')
    @UseGuards(AdminGuard)
    approveReport(@Param('id') id: string, @Body() body: ApprovedReportDto) {
        return this.reportService.approveReport(id, body.approved);
    }
}
