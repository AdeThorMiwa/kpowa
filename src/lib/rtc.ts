import { SDP } from "../types/rtc";

class RTC {
  public async getNewSDP(): Promise<SDP> {
    return new Promise((res, rej) => {
      setTimeout(() => res(""), 4000);
    });
  }
}

export default new RTC();
