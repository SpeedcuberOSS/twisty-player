// Always keep the following line if you are using any twisty players on your page.
import "cubing/twisty";
import { Move } from "cubing/alg";
import { TwistyPlayer, type PuzzleID } from "cubing/twisty";

type Algorithm = string;
type CSSColor = string;

interface TwistyPlayerProps {
  algorithm?: Algorithm;
  puzzle?: PuzzleID;
  visualization?: "3D" | "2D";
  hintFacelets?: "floating";
  backView?: "top-right" | "side-by-side";
  backgroundColor?: CSSColor;
}

class App {
  player: TwistyPlayer = document.querySelector("#main-player")!;
  
  constructor() {
    this.player = this._createTwistyPlayer({});
  }

  _createTwistyPlayer(props: TwistyPlayerProps) {
    const player = new TwistyPlayer({
      puzzle: props.puzzle ?? "3x3x3",
      visualization: props.visualization || "3D",
      hintFacelets: props.hintFacelets || "none",
      backView: props.backView || "none",
      background: "none",
      controlPanel: "none",
    });
    player.id = "twisty-player";
    player.style.cssText = `width: 100vw; height: 100vh;`;
    player.alg = props.algorithm || "";
    return player;
  }
  
  setTwistyPlayer(props: TwistyPlayerProps = {}) {
    this.player = this._createTwistyPlayer(props);
    document.getElementById("twisty-player").replaceWith(this.player);
    document.body.style.backgroundColor = props.backgroundColor ?? "white";
  }
  
  addMove(move: string) {
    this.player.experimentalAddAlgLeaf(new Move(move));
  }
  
  setAlgorithm(alg: string) {
    this.player.alg = alg;
  }
  
  version() {
    return {
      cubing: "0.46.2",
      "twisty-player": "0.1.0",
    };
  }
}

// Make the app object available in the console for debugging.
// Try running: app.setTwistyPlayer()
globalThis.app = new App();
