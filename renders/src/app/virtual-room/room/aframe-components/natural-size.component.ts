import * as THREE from 'three';

// https://stackoverflow.com/questions/51380941/aframe-size-of-model
export const NaturalSizeComponent = {
  schema: {
    width: {
      type: 'number',
      default: undefined, // meters
    },
    height: {
      type: 'number',
      default: undefined, // meters
    },
    depth: {
      type: 'number',
      default: undefined, // meters
    },
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
    let position = el.getAttribute('position');
    const size = new THREE.Vector3();
    box.getSize(size);
    if (!size.x && !size.y && !size.z) {
      return;
    }
    let scale = this.el.getAttribute('scale');

    // if (data.width) {
    //   scale = data.width / size.x;
    // } else if (data.height) {
    //   scale = data.height(size.y);
    // } else if (data.depth) {
    //   scale = data.depth / size.y;
    // }
    // el.setAttribute('scale', `${scale} ${scale} ${scale}`);
    const scaledMinY = box.min.y;
    const worldMinY = scaledMinY + position.y;
    position.y += 0.01 - worldMinY;
    this.el.setAttribute('position', position);
  },
  remove() {
    this.el.removeEventListener('model-loaded', this.rescale);
  },
};
