export class UserStatusDto{
  private userId : number;
  private isOnline : boolean;


  constructor(userId: number, isOnline: boolean) {
    this.userId = userId;
    this.isOnline = isOnline;
  }
}
