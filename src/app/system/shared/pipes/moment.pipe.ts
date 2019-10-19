import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'ohrMoment'
})
export class MomentPipe implements PipeTransform {
  transform(value: string, formatFrom: string, formatTo = 'DD/MM/YYYY'): string {
    return moment(value, formatFrom).format(formatTo);
  }

}
