export const TrackPlayerPosition = {
  init() {
    this.isMoving = false;
    this.isPanning = false;
    this.movementMap = new Map<string, boolean>();
    const movementCode = [
      'KeyW',
      'KeyA',
      'KeyS',
      'KeyD',
      'ArrowUp',
      'ArrowLeft',
      'ArrowDown',
      'ArrowRight',
    ];

    document.addEventListener('keydown', (e) => {
      if (movementCode.includes(e.code)) {
        this.movementMap.set(e.code, true);
      }
    });
    document.addEventListener('keyup', (e) => {
      if (movementCode.includes(e.code)) {
        this.movementMap.delete(e.code);
      }
    });

    document.addEventListener('mousedown', (e) => {
      this.isPanning = true;
    });
    document.addEventListener('mouseup', (e) => {
      this.isPanning = false;
    });
  },
  tick: function () {
    if (this.movementMap.size > 0 || this.isPanning) {
      const position = this.el.getAttribute('position');
      const rotation = this.el.getAttribute('rotation');
      this.el.emit('updatePlayerPosition', { position, rotation });
    }
  },
};
