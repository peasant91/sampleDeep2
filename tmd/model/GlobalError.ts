export default class GlobalError extends Error {
  title: string;
  constructor(title = '', message: string) {
    super(message);
    this.title = title;
  }
}
