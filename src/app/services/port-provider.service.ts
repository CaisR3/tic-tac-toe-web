import { Injectable } from "@angular/core";

@Injectable()
export class PortProviderService {
  public current: string;

  constructor() {
    if (location.port !== "4200") {
      //this.current = location.host;
      this.current = "http://13.73.145.0:8080"
    } else {
      if (location.pathname.includes("other")) {
        this.current = "http://localhost:10010";
      } else {
        this.current = "http://localhost:10007";
      }
    }
  }
}
