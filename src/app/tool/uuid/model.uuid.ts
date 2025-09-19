export class UUIDModel {
    'title': string;
    'topUUID': string;
    uuidInput: UUIDInput | undefined;
    'bulk': {
      'count': 0,
      'list': []
    };
};

export class UUIDInput {
  'type': 'V1' | 'V4' | 'V5' | 'V6' | 'V7';
  'nameSpace': string
}

export class Const {
  static 'v1': 'V1';
  static 'v4': 'V4';
  static 'v5': 'V5';
  static 'v6': 'V6';
  static 'v7': 'V7';
}