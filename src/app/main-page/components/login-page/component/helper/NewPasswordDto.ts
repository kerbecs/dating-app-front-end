export class NewPasswordDto {
   public tokenId! : string
   public newPassword! : string


  constructor(tokenId: string, newPassword: string) {
    this.tokenId = tokenId;
    this.newPassword = newPassword;
  }
}
