import * as THREE from 'three';
import Label from './Label';

export default class LabelContainer {
  private _container: HTMLDivElement;
  private _label: Label;
  private _hoveredId: number;

  constructor(parent: HTMLDivElement) {
    this._container = document.createElement('div');
    this._container.className = 'ev-label-container';
    parent.appendChild(this._container);
    this._label = new Label(this._container);
    this._hoveredId = undefined;

    document.addEventListener('start_label_hover', this.onLabelHover);
    document.addEventListener('end_label_hover', this.endLabelHover);
  }

  public onLabelHover = (evt: CustomEvent) => {
    const id: number = evt.detail.id;
    const camera: THREE.PerspectiveCamera = evt.detail.camera;
    const mesh: THREE.Mesh = evt.detail.mesh;
    const label: string = evt.detail.label;

    const widthHalf = this._container.clientWidth / 2;
    const heightHalf = this._container.clientHeight / 2;
    let position: THREE.Vector3 = new THREE.Vector3();
    mesh.getWorldPosition(position);

    position = position.project(camera);
    position.x = position.x * widthHalf + widthHalf;
    position.y = -(position.y * heightHalf) + heightHalf;

    const { x, y } = position;
    this._label.setPosition(x + 50, y - 20);
    this._label.setText(label);
    this._hoveredId = id;
    this._label.toggleVisibility(true);
  };

  public endLabelHover = (evt: CustomEvent) => {
    const { id } = evt.detail;
    console.log(this._hoveredId);
    if (Number(id) === Number(this._hoveredId)) {
      this._label.toggleVisibility(false);
      this._hoveredId = undefined;
    }
  };

  public animate = (): void => {
    requestAnimationFrame(this.animate);
  };
}
