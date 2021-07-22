import { Pipe, PipeTransform } from "@angular/core";

// Methods passed to the map pipe cannot (and should not) use the `this` keyword from components. Otherwise, it would not be a pure pipe.
@Pipe({ name: "map" })
export class MapPipe implements PipeTransform {
  public transform<T, R>(
    thisArg: T,
    project: (t: T, ...others: any[]) => R,
    ...args: any[]
  ): R {
    return project(thisArg, ...args);
  }
}
