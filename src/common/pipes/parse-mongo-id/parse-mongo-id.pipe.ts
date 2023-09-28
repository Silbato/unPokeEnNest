import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';
import { throwError } from 'rxjs';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {


  transform(value: string, metadata: ArgumentMetadata) {
    //console.log({value,metadata});
    if(!isValidObjectId(value)){
      throw new BadRequestException(`El id no es un Id valido. ${value}`)
    }
    return value;
  }
}
