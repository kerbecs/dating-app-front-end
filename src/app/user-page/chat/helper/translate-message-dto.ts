export class TranslateMessageDto{
  public message : string;
  public language : string;


  constructor(message: string, language: string) {
    this.message = message;
    this.language = language;
  }

}
