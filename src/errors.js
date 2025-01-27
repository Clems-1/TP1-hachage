/**
 * @description Permet d'obtenir une erreur spécifique pour les erreurs http 404
 */
export class NotFoundError extends Error {
  constructor(message = "Resource not found") {
    super(message);
    this.name = "NotFoundError";
  }
}
