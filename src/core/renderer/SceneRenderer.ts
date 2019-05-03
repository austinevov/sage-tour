import * as THREE from 'three';

import PanoramaManager from '../scene/PanoramaManager';
import Panorama from '../scene/Panorama';
import Scene from '../scene/index';
import PanoramaRenderer from './PanoramaRenderer';
import TransitionRenderer from './TransitionRenderer';
import Camera from '../camera/Camera';
import { TransitionEvent } from '../types/index';
import { TRANSITION } from '../../constants/events';
import LabelContainer from '../labels/LabelContainer';
import LabelRenderer from '../labels/LabelRenderer';

export default class SceneRenderer {
  private _renderer: THREE.WebGLRenderer;
  private _panoramaRenderer: PanoramaRenderer;
  private _transitionRenderer: TransitionRenderer;
  private _canvas: HTMLCanvasElement;
  private _labelRenderer: LabelRenderer;
  private _mesh: THREE.Mesh;

  constructor(canvas: HTMLCanvasElement, labelContainer: LabelContainer) {
    this._canvas = canvas;
    this._labelRenderer = new LabelRenderer(labelContainer);

    this._renderer = new THREE.WebGLRenderer({
      canvas: this._canvas,
      antialias: true
    });
    this._renderer.autoClear = true;
    this._renderer.autoClearColor = false;
    this._renderer.autoClearDepth = true;
    this._renderer.autoClearStencil = true;
    this._panoramaRenderer = new PanoramaRenderer(this.context(), this._canvas);
    this._transitionRenderer = new TransitionRenderer(
      this.context(),
      this._canvas
    );

    document.addEventListener(TRANSITION, (event: TransitionEvent) => {
      const { start, finish, camera } = event.detail;

      this.transitionTo(finish, start, camera);
    });
  }

  public resize = (width: number, height: number) => {
    this._renderer.setSize(width * 2, height * 2);

    this._renderer.domElement.style.width = `${width}px`;
    this._renderer.domElement.style.height = `${height}px`;
    this._renderer.domElement.width = width * 2;
    this._renderer.domElement.height = height * 2;
  };

  public getAnisotropy = (): number => {
    return this._renderer.getMaxAnisotropy();
  };

  public context = (): WebGLRenderingContext => {
    return this._renderer.getContext();
  };

  public update = (dt: number) => {
    if (this._transitionRenderer.isTransitioning()) {
      this._transitionRenderer.update(dt);
    }
  };

  public render = (scene: Scene): void => {
    if (this._transitionRenderer.isTransitioning()) {
      this._labelRenderer.hideAll();
      this._transitionRenderer.render(scene.camera());
      scene.hideHDTexture();
    } else {
      const isHDLoaded = scene
        .panoramaManager()
        .activePanorama()
        .isHDLoaded();
      if (!isHDLoaded) {
        this._panoramaRenderer.render(
          scene.camera(),
          scene.panoramaManager().activePanorama()
        );
        scene.hideHDTexture();
      } else if (!scene.isShowingHD()) {
        scene.showHDTexture(
          scene
            .panoramaManager()
            .activePanorama()
            .getHDTexture()
        );
      }

      this._renderer.render(scene.scene(), scene.camera().camera());
      this._labelRenderer.render(scene);
    }
  };

  public transitionTo = (
    destination: Panorama,
    source: Panorama,
    camera: Camera
  ): void => {
    this._transitionRenderer.makeTransition(
      source,
      destination,
      camera.theta(),
      camera.phi()
    );
  };
}
