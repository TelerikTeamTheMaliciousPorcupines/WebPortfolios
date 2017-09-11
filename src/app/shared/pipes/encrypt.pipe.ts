import { Portfolio } from '../../models/portfolio-model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'encrypt'
})
export class EncryptPipe implements PipeTransform {

    transform(text: string): string {

        return btoa(text);
    }

}
