import { Twisty } from "../../src/twisty";
import { ProxyEvent, ProxyReceiver } from "../vr/proxy/websocket-proxy";

class TwistySolvesPuzzles {
  public proxyReceiver: ProxyReceiver;
  private twisty: Twisty;
  constructor() {
    this.twisty = new Twisty(document.querySelector("#target-twisty")!);
    this.proxyReceiver = new ProxyReceiver(this.onMove.bind(this));
  }

  private onMove(e: ProxyEvent): void {
    if (e.event === "move") {
      this.twisty.experimentalAddMove(e.data.latestMove);
    }
  }
}

(window as any).twistySolvesPuzzles = new TwistySolvesPuzzles();
