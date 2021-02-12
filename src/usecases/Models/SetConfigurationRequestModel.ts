// eslint-disable-next-line @typescript-eslint/no-empty-interface
export class SetConfigurationRequestModel {
  private requestModel: object

  public getRequestModel (): object {
    return this.requestModel
  }

  public setRequestModel (requestModel: object): void {
    this.requestModel = requestModel
  }
}
