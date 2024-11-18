export default interface Item<T> {
    _id: string;
    [key: string]: T[keyof T] | string;
  }