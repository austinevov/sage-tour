export default class Label {
  private _container: HTMLDivElement;
  private _text: HTMLSpanElement;
  private _arrow: HTMLDivElement;

  constructor(parent: HTMLDivElement) {
    this._container = document.createElement('div');
    this._container.className = 'ev-bubble-label';
    parent.appendChild(this._container);

    this._text = document.createElement('span');
    this._arrow = document.createElement('div');

    this._container.appendChild(this._text);
    this._container.appendChild(this._arrow);
  }

  public toggleVisibility = (state: boolean) => {
    if (state) {
      this._container.style.visibility = 'visible';
    } else {
      this._container.style.visibility = 'hidden';
    }
  };

  public setText = (text: string) => {
    this._text.innerText = text;
  };

  public setPosition = (x: number, y: number) => {
    this._container.style.left = `${x}px`;
    this._container.style.top = `${y}px`;
  };
}
