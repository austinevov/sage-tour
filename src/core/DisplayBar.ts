const FULLSCREEN_B64 = `data:image/png;base64,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`;
const PLUS_B64 = `data:image/png;base64,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`;
const MINUS_B64 = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAEgElEQVR4nO2cMYuXRxDGn/lzqIhFkJBC5D6ICEqaNH4MC7uQwiKfIoUkn0MrG0urRMQ6pAgWIiIhWMgV5ibF8R7r3DOz+wYyKfI81fvfd3Z39rezs/P3vDOHQ/r3dfivHfi/SKCbJNBNEugmCXSTBLpJAt0kgW6SQDdJoJsk0E0S6CYJdJMEukkC3SSBbpJAN0mgmyTQTRLoJgl0kwS6SQLdJIFukkA3SaCbJNBNEugmCXSTBLpJAt0kgW6SQDfpqHrpp37FzL52928A3DSzK6W9O8wM7p//FoGZffY+2m/Po201PhuL2c7Gq8ZdaDsF8N7MfgHwGIY31RyW/mqF4xqAHwHcA3ANwJG7HzbnVxcSndwDgI2zMkdlz/wYA2PnHJ8AnJjZr+7+rR3seeY/B30G+QcA9ysHVx2qlI23d0OqeavozMBnG1D0f2Nmd2D4jfmX5ei7AO6xiSrAzC6mkSgzo7ZjezaOu9MNGdtn4EdYbI3Rj7E9jHfD3R/COdMM9B0AX7CFsjxbPY+RsQGI0CrbOG614LGtOiHbPNkmRcUAiH2HDbrl7teZnxnoGwAujWDYJRePT4yE7DlCYLZZJEXFjWOXbZbGZm3ZKS58u2pmX7EXGeij+C6DWW0CW0QV0ezd1i+rZmbRGzW7E9hzdqJI+wFJJUdBM2dYHq1u6ywaq4ieRfHqxbhyYtimZZtQVS+snamuo5NyaYzumEer0qlyntXU4xjxHasCon12OsY5xza21mo9DHYWDCXobJdZ+0p+ns0Vn/dE2GrbXr8izNV+UcsRPU6U1aWrYlGXRS7zJfnycD5OFdVVpFenMvbLTl+mpYhmi6ny+AijGps5Fy/dWY07m6tKUZVtlkaWxsdFO3oZriyGwdieMwey51mdOuvPcmemlQsslrWsPX6uKh0giehZXh4XGD/PomWWjlZqXubXaorL1pqte49f5/1XI3ocIO5WVmmsagYky9F7x5zZjO3VZbcnbVSiEV3l3Vn7P1GWR7MIG/tlF1R1uuJcmR/Mppq3mi/7wnIC4JTlz2zAKifHtj35NMv940mYXcKVL1v/LM9XdiQATgGcsLVkl+HvW4eYKsbLqvpiUrWxMi0DMfZlz7FtOY9OqpHZRrINd/c/Aby94ADyHP0UwDv2YuVSGBfE7KovO9vn1VwdT11lVylbU7bhyUl/AsMHNn4G+iWARzg7CmUNGxWP2tieLTaWS+x5bIuLZKeMzctOZFWusTJ0LPuC3c8AfuI4Uf4o6wjAA3f/DsCXZnbhX/RG5yM0OhnJt7P0E+3j3Mxu7M8uVpayqkgtLuBPZvYRwDMA38PwOl17+efYzn5acAzgNoBjd7/Mjj6DW0Fijld5e1b5rI43uzSr8YkPf5nZH+7+AsArOxi9BM/H0t+965H+X0eTBLpJAt0kgW6SQDdJoJsk0E0S6CYJdJMEukkC3SSBbpJAN0mgmyTQTRLoJgl0kwS6SQLdJIFukkA3SaCbJNBNEugmCXSTBLpJAt0kgW6SQDdJoJsk0E0S6CYJdJP+Bqq1PvQ3JHT0AAAAAElFTkSuQmCC`;
const SHRINK_B64 = `data:image/png;base64,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`;
export default class DisplayBar {
  private _container: HTMLDivElement;
  private _nameSpan: HTMLSpanElement;
  private _zoomInButton: HTMLImageElement;
  private _zoomOutButton: HTMLImageElement;
  private _vrButton: HTMLImageElement;
  private _fullscreenButton: HTMLImageElement;
  private _buttonContainer: HTMLDivElement;

  private _name: string;
  private _isFullscreen: boolean;

  constructor(
    parent: HTMLDivElement,
    name: string,
    onZoom: (delta: number) => void,
    onFullscreen: (state: boolean) => void
  ) {
    this._isFullscreen = false;
    this._container = document.createElement('div');
    this._container.className = 'ev-display-bar';
    parent.appendChild(this._container);

    this._nameSpan = document.createElement('span');
    this._nameSpan.className = 'tour-name';
    this._nameSpan.innerText = name;
    this._name = name;
    this._container.appendChild(this._nameSpan);

    this._buttonContainer = document.createElement('div');
    this._buttonContainer.className = 'button-container';

    this._zoomInButton = document.createElement('img');
    this._zoomOutButton = document.createElement('img');
    this._vrButton = document.createElement('img');
    this._fullscreenButton = document.createElement('img');
    this._zoomInButton.src = PLUS_B64;
    this._zoomOutButton.src = MINUS_B64;
    this._vrButton.src = 'https://s3.amazonaws.com/assets.misc/vr.svg';
    this._fullscreenButton.src = FULLSCREEN_B64;
    this._buttonContainer.appendChild(this._zoomOutButton);
    this._buttonContainer.appendChild(this._zoomInButton);
    //this._buttonContainer.appendChild(this._vrButton);
    this._buttonContainer.appendChild(this._fullscreenButton);

    this._fullscreenButton.onclick = () => {
      this._isFullscreen = !this._isFullscreen;
      if (this._isFullscreen) {
        this._fullscreenButton.src = SHRINK_B64;
      } else {
        this._fullscreenButton.src = FULLSCREEN_B64;
      }

      onFullscreen(this._isFullscreen);
    };

    this._zoomInButton.onclick = () => {
      onZoom(-5);
    };

    this._zoomOutButton.onclick = () => {
      onZoom(5);
    };

    this._container.appendChild(this._buttonContainer);
  }
}
