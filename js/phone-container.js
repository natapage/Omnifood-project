import { Component } from "./сomponent.js";

export class PhoneContainer extends Component {
  constructor() {
    super({ tag: "div", className: "phone-container" });
    // new Component({
    //   tag: "img",
    //   className: "phone-frame",
    //   src: "/img/screen-smartphone-svgrepo-com.svg",
    // }).render(this);
  }
}
