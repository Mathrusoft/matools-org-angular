import { Component } from '@angular/core';
import { v1 as uuidv1 } from 'uuid';
import { v4 as uuidv4 } from 'uuid';
import { v5 as uuidv5 } from 'uuid';
import { v6 as uuidv6 } from 'uuid';
import { v7 as uuidv7 } from 'uuid';
import { Const, UUIDModel } from './model.uuid';
import { CommonModule } from '@angular/common';
import { GenerateUuidComponent } from './generate-uuid/generate-uuid.component';

@Component({
  selector: 'app-uuid',
  standalone: true,
  imports: [CommonModule, GenerateUuidComponent],
  templateUrl: './uuid.component.html',
  styleUrl: './uuid.component.css'
})
export class UuidComponent {
  uuid5 = uuidv5('https://www.w3.org/', uuidv5.URL);

  v1uuid: UUIDModel = {title:'UUID Version 1', 'topUUID': uuidv1(), uuidInput: {type:'V1', nameSpace:'https://www.w3.org/'}, 'bulk': {'count':0, 'list':[]}}
  v4uuid: UUIDModel = {title:'UUID Version 4', 'topUUID': uuidv4(), uuidInput: {type:'V4', nameSpace:'https://www.w3.org/'}, 'bulk': {'count':0, 'list':[]}}
  v5uuid: UUIDModel = {title:'UUID Version 5', 'topUUID': this.uuid5, uuidInput: {type:'V5', nameSpace:'https://www.w3.org/'}, 'bulk': {'count':0, 'list':[]}}
  v6uuid: UUIDModel = {title:'UUID Version 6', 'topUUID': uuidv6(), uuidInput: {type:'V6', nameSpace:'https://www.w3.org/'}, 'bulk': {'count':0, 'list':[]}}
  v7uuid: UUIDModel = {title:'UUID Version 7', 'topUUID': uuidv7(),  uuidInput: {type:'V7', nameSpace:'https://www.w3.org/'}, 'bulk': {'count':0, 'list':[]}}

}
