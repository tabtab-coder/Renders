export const DraggableComponent = {
  dependencies: ['raycaster'],
  init: function () {
    this.camera = document.querySelector('a-camera').object3D;
    this.pressing = false;
    this.draggig = false;

    this.el.addEventListener('mousedown', (event) => {
      if (event.detail.mouseEvent.button === 0) {
        this.pressing = true;
      }
    });
    document.addEventListener('mousemove', (event) => {
      if (this.pressing) {
        this.dragging = true;
        this.el.emit('updatingFurnitureStart', this.el.getAttribute('id'));
      }
    });
    this.el.addEventListener('mouseup', (event) => {
      if (event.detail.mouseEvent.button === 0) {
        if (!this.dragging) {
          // pressed down and up without moving
          this.el.emit('targetFurniture', this.el.getAttribute('id'));
        } else {
          this.pressing = false;
          this.el.emit('updatingFurnitureEnd', this.el.getAttribute('id'));
        }
        this.dragging = false;
      }
    });
  },
  tick: function () {
    if (this.dragging) {
      let planes = document.querySelectorAll('.ground');
      for (let index = 0; index < planes.length; index++) {
        const plane = planes[index];
        const raycaster = this.camera.el.components.raycaster;
        const intersects = raycaster.getIntersection(plane);

        if (intersects) {
          let position = this.el.getAttribute('position');
          this.el.setAttribute('position', {
            x: intersects.point.x,
            y: position.y,
            z: intersects.point.z,
          });
          this.el.emit('draggedFurniture', {
            x: intersects.point.x,
            y: position.y,
            z: intersects.point.z,
          });
        }
      }
    }
  },
};
