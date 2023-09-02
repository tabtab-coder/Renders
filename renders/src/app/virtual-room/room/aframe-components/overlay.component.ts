export const OverlayComponent = {
  schema: {
    order: { type: 'number', default: 100 },
  },
  dependencies: ['material'],
  init: function () {
    this.el.sceneEl.renderer.sortObjects = true;
    this.el.object3D.renderOrder = this.data.order;
    this.el.components.material.material.depthTest = false;
  },
};
