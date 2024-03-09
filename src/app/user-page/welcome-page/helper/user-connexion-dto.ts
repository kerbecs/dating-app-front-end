export class UserConnexionDto{
  private userId : number
  private userConnexionId : number

  constructor(userId: number, userConnexionId: number) {
    this.userId = userId;
    this.userConnexionId = userConnexionId;
  }
  
}
