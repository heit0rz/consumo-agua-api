import { Controller, Post, Body, Get, Query, Param } from '@nestjs/common';
import { ConsumoAguaService } from './consumo_agua.service';
import { ConsumoAgua } from './consumo_agua.model';

@Controller('consumo-agua')
export class ConsumoAguaController {
    constructor(private readonly consumoAguaService: ConsumoAguaService) { }

    @Post()
    createConsumo(
        @Body('userId') userId: string,
        @Body('quantidade') quantidade: number,
        @Body('dataLeitura') dataLeitura: Date,
    ): ConsumoAgua {
        return this.consumoAguaService.createConsumo(userId, quantidade, new Date(dataLeitura));
    }

    @Get(':userId')
    getConsumosByUserId(
        @Param('userId') userId: string,
        @Query('startDate') startDate: string,
        @Query('endDate') endDate: string,
    ): ConsumoAgua[] {
        return this.consumoAguaService.getConsumosByUserId(userId, new Date(startDate), new Date(endDate));
    }

    @Get('alert/:userId')
    checkAlert(@Param('userId') userId: string): boolean {
        return this.consumoAguaService.checkAlert(userId);
    }
}
