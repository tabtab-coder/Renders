export const SpinnableComponent = {
  dependencies: ['raycaster'],
  init: function () {
    this.camera = document.querySelector('a-camera').object3D;
    this.dragging = false;
    this.rotation = false;
    this.startCoords = 0;
    this.clientMousePosition = 0;
    this.originalRotation = 0;
    this.rotation = false;

    const handleMouseMove = (event) => {
      this.clientMousePosition = event.screenX;
    };

    this.el.addEventListener('mousedown', (event) => {
      const mouseEvent = event.detail.mouseEvent;
      this.el.emit('updatingFurnitureStart', this.el.getAttribute('id'));
      if (mouseEvent.button === 2) {
        // right click
        this.startCoords = mouseEvent.screenX;
        this.originalRotation = this.el.getAttribute('rotation').y;
        this.rotation = true;
        document.addEventListener('mousemove', handleMouseMove);
      }
    });

    this.el.addEventListener('mouseup', (event) => {
      const mouseEvent = event.detail.mouseEvent;
      this.el.emit('updatingFurnitureEnd', this.el.getAttribute('id'));
      if (mouseEvent.button === 2) {
        // right click
        this.rotation = false;
        document.removeEventListener('mousemove', handleMouseMove);
      }
    });
  },
  tick: function () {
    if (this.rotation) {
      const deltaX = this.clientMousePosition - this.startCoords;
      const rotationY = this.originalRotation + deltaX;

      this.el.setAttribute('rotation', { x: 0, y: rotationY, z: 0 });

      this.el.emit('rotatedFurniture', {
        x: 0,
        y: rotationY,
        z: 0,
      });
    }
  },
};
