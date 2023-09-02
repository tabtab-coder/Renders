import * as THREE from 'three';

export const UnitSizeComponent = {
  schema: {
    scale: { type: 'number', default: 1 },
  },
  init() {
    this.el.addEventListener('model-loaded', this.rescale.bind(this));
  },
  update() {
    this.rescale();
  },
  rescale() {
    const el = this.el;
    const model = el.object3D;
    const box = new THREE.Box3().setFromObject(model);
    const size = new THREE.Vector3();
    box.getSize(size);
    if (!size.x && !size.y && !size.z) {
      return;
    }
    let scale = 1;
    scale = 1 / size.x;

    el.setAttribute('scale', `${scale} ${scale} ${scale}`);
    const center = box.max.sub(box.min);
  },
  remove() {
    this.el.removeEventListener('model-loaded', this.rescale);
  },
};
