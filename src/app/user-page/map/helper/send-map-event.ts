export class SendMapEvent{
  private readonly x: number
  private readonly y: number
  private userToken!: string
  private readonly description: string
  private readonly visibilityId: string
  private readonly eventType: string;


  constructor(x: number, y: number, description: string, visibilityId: string, eventType: string) {
    this.x = x;
    this.y = y;
    this.description = description;
    this.visibilityId = visibilityId;
    this.eventType = eventType;
  }
  getX(){return this.x}
  getY(){return this.y};
  getDescription() { return this.description}
  setToken(token : string){this.userToken = token}

}
