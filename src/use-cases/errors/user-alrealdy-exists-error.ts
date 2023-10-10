export class UserAlrealdyExists extends Error {
  constructor() {
    super('E-mail alrealdy exists')
  }
}
