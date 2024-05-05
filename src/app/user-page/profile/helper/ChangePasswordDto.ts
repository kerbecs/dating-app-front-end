export class ChangePasswordDto {
   public userId! : number
   public newPassword! : string


  constructor(userId: number, newPassword: string) {
    this.userId = userId;
    this.newPassword = newPassword;
  }
}
