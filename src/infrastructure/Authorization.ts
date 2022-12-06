import { isEmpty } from 'lodash';

export class Authorization {
  static getTokenFromHeaders(request: any): string | null {
    if (Reflect.has(request.headers, 'authorization')) {
      return request.get('Authorization').split('Bearer ').pop();
    }
    return null;
  }
}