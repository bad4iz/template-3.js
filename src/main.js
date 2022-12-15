import './style.css';
import { SceneInit } from './Scene.js';
import {
  BoxGeometry,
  DirectionalLight,
  Mesh,
  MeshBasicMaterial,
  MeshPhongMaterial,
  PlaneGeometry,
  TextureLoader,
} from 'three';

const scene = new SceneInit('canvas');
scene.animate();
// scene.addAxesHelper();

{
  const color = 0xffffff;
  const intensity = 1;
  const light = new DirectionalLight(color, intensity);
  light.position.set(-1, 2, 4);
  scene.add(light);
}

const material = new MeshPhongMaterial({ color: 0x44aa88 });
const geometry = new BoxGeometry(1, 1, 1);
const cube = new Mesh(geometry, material);

scene.add(cube);
scene.setAnimation('cube', () => {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
});
