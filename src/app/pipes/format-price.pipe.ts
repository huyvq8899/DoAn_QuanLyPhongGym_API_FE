import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'formatPrice'
})
export class FormatPricePipe implements PipeTransform {
    constructor(
    ) {
    }

    transform(value: number, args?: any): any {
        if (value == null || value === undefined) {
            return '';
        }

        if (!isFinite(value)) {
            return value.toString();
        }

        const a = value.toFixed(0).split('.');
        a[0] = a[0].replace(/\d(?=(\d{3})+$)/g, '$&.');
        return a.join(',');
    }
}
