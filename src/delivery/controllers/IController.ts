export interface IController {
  handle: (request: Request) => Promise<void>
}
