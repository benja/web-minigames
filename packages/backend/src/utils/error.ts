export class WmgError extends Error {
  private readonly type: string;

  constructor(message: string) {
    super(message);
    this.type = this.constructor.name;
  }
}
