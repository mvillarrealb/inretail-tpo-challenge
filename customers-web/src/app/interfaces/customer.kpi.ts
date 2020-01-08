/**
 * DTO for customer kpi response
 */
export class CustomerKpi {
    ageAverage: number;
    ageStandardDeviation: number;
    constructor(partial: Partial<CustomerKpi>) {
        Object.assign(this, partial);
    }
}
