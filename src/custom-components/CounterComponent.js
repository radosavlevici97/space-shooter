import TextComponent from "../core/components/TextComponent";

export default class CounterComponent extends TextComponent {
  constructor(args) {
    super(args);
    this._currentCount = 0;
  }

  get currentCount() {
    return this._currentCount;
  }

  increase() {
    this._currentCount++;
    this.updateValue(this._currentCount);
  }
}
