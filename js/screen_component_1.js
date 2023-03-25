import { Component } from "./сomponent.js";
import * as url from "/img/screen.jpg";

export class Screen extends Component {
  constructor() {
    super({
      tag: "img",
      className: "screen-container",
      src: url,
    });
  }
}
