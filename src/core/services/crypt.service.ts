import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class CryptService {
  private roundOfHashesToBeenApply = 12;
  crypt(valueToCrypt: string): Promise<string> {
    return bcrypt.hash(valueToCrypt, this.roundOfHashesToBeenApply);
  }

  isHashValid(valueToCompare, hashValue) {
    return bcrypt.compare(valueToCompare, hashValue);
  }
}
