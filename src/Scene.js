import {
  AxesHelper,
  Color,
  CubeTextureLoader,
  PCFShadowMap,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export class SceneInit {
  constructor(id) {
    const canvas = document.getElementById(id);
    this._canvas = canvas;
    this._width = canvas?.clientWidth;
    this._height = canvas?.clientHeight;

    this._aspect =
      canvas?.clientWidth / canvas?.clientHeight;
    this._scene = new Scene();
    this._camera = new PerspectiveCamera(
      75,
      this._aspect,
      0.1,
      1000,
    );
    this._animationFns = new Map();
    this._resizeFns = new Map();

    this._renderer = new WebGLRenderer({ canvas });
    this._renderer.setSize(this._width, this._height);

    this._renderer.shadowMapEnabled = true;
    this._renderer.shadowMapSoft = true;
    this._renderer.shadowMapType = PCFShadowMap;

    this._controls = new OrbitControls(
      this._camera,
      this._renderer.domElement,
    );

    this._camera.position.z = 9.25;
    // this._scene.background = new Color(0xffffff);

    const loader = new CubeTextureLoader();
    const texture = loader.load([
      '/assets/Sorsele/posx.jpg',
      '/assets/Sorsele/negx.jpg',
      '/assets/Sorsele/posy.jpg',
      '/assets/Sorsele/negy.jpg',
      '/assets/Sorsele/posz.jpg',
      '/assets/Sorsele/negz.jpg',
    ]);
    this._scene.background = texture;

    window.addEventListener(
      'resize',
      () => this.onWindowResize(),
      false,
    );
  }

  animate() {
    this._animationFns.forEach((fn) => fn());
    requestAnimationFrame(() => this.animate());
    this.render();
    this._controls.update();
  }

  add(object) {
    this._scene.add(object);
  }

  onWindowResize() {
    this._aspect =
      this._canvas.clientWidth / this._canvas.clientHeight;
    this._camera.aspect = this._aspect;
    this._renderer.setSize(
      this._canvas.clientWidth,
      this._canvas.clientHeight,
    );
    this._resizeFns.forEach((fn) => fn());

    this._camera.updateProjectionMatrix();
    // this.render();
  }

  render() {
    this._renderer.render(this._scene, this._camera);
  }

  addAxesHelper() {
    const axesHelper = new AxesHelper(50);
    axesHelper.setColors('red', 'green', 'blue');
    this.add(axesHelper);
  }

  setAnimation(key, fn) {
    this._animationFns.set(key, fn);
  }

  setResizeFns(key, fn) {
    this._resizeFns.set(key, fn);
  }

  deleteAnimation(key) {
    this._animationFns.delete(key);
  }
}
