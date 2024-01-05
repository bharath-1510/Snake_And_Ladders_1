export class Player {
  id!: number;
  position!: number;
  color!: string;
  positions: string[] = [];
  constructor(id: number, position: number, color: string) {
    this.id = id;
    this.position = position;
    this.color = color;
  }
}
