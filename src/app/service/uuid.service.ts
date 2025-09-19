import { Injectable } from '@angular/core';
import { v1 as uuidv1, v1 } from 'uuid';
import { v4 as uuidv4 } from 'uuid';
import { v5 as uuidv5 } from 'uuid';
import { v6 as uuidv6 } from 'uuid';
import { v7 as uuidv7 } from 'uuid';
import { UUIDInput } from '../tool/uuid/model.uuid';
import { Const } from '../tool/uuid/model.uuid';

@Injectable({
  providedIn: 'root'
})
export class UuidService {

  constructor() { }

  getUUID(uUIDInput: UUIDInput) {
    switch (uUIDInput.type) {
      case 'V1':
        return uuidv1()
      case 'V4':
        return uuidv4()
      // case 'V5':
      //   var uuid5 = uuidv5(uUIDInput.nameSpace, uuidv5.URL);
      //   return uuid5
      case 'V6':
        return uuidv6();
      case 'V7':
        return uuidv7()
      default:
        return uuidv4()
    }
  }

  getBulkUUID(count: number, uUIDInput: UUIDInput): string[] {
    const randomNumbers: string[] = [];
    switch (uUIDInput.type) {
      case 'V1':
        for (let i = 0; i < count; i++) {
          randomNumbers.push(uuidv1());
        }
        break
      case 'V4':
        for (let i = 0; i < count; i++) {
          randomNumbers.push(uuidv4());
        }
        break
      case 'V6':
        for (let i = 0; i < count; i++) {
          randomNumbers.push(uuidv6());
        }
        break
      case 'V7':
        for (let i = 0; i < count; i++) {
          randomNumbers.push(uuidv7());
        }
        break
      default:
        for (let i = 0; i < count; i++) {
          randomNumbers.push(uuidv4());
        }
    }

    return randomNumbers;
  }

}
