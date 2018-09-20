import { env } from './../env/environment';
import { Fetch } from '../helpers/fetch';
import { IUser } from './../interfaces';

export class UserDetailsService {
  constructor() {}

  public getUserDetails(id: string) {
    return Fetch.request(env.securedRoutes + '/user/' + id, 'json', {
      method: 'GET'
    });
  }

  public updateUserDetails(id: number, userData: any): Promise<IUser> {
    return Fetch.request(env.securedRoutes + '/user/' + id, 'json', {
      method: 'PATCH',
      body: JSON.stringify(userData)
    });
  }
}