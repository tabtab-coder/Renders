export class FurnitureType {
  id: number;
  model: string; // asset id
  modelPath: string; // asset path
  snapshotPath: string;
  defaultScale: number;

  constructor(id: number, model: string, modelPath: string) {
    this.id = id;
    this.model = model;
    this.modelPath = modelPath;
  }
}
