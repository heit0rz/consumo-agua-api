import { Injectable } from '@nestjs/common';
import { ConsumoAgua } from './consumo_agua.model';

@Injectable()
export class ConsumoAguaService {
    private consumos: ConsumoAgua[] = [];

    createConsumo(userId: string, quantidade: number, dataLeitura: Date): ConsumoAgua {
        const consumo: ConsumoAgua = {
            id: Math.random().toString(),
            userId,
            quantidade,
            dataLeitura,
        };
        this.consumos.push(consumo);
        return consumo;
    }

    getConsumosByUserId(userId: string, startDate: Date, endDate: Date): ConsumoAgua[] {
        return this.consumos.filter(
            consumo => consumo.userId === userId && consumo.dataLeitura >= startDate && consumo.dataLeitura <= endDate
        );
    }

    checkAlert(userId: string): boolean {
        const consumos = this.consumos.filter(consumo => consumo.userId === userId);
        if (consumos.length < 2) {
            return false;
        }
        const ultimoMes = consumos[consumos.length - 1];
        const penultimoMes = consumos[consumos.length - 2];
        return ultimoMes.quantidade > penultimoMes.quantidade;
    }
}
