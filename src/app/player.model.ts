export class Player {
  id!: number;
  position!: number;
  color!: string;
  positions: number[] = [];
  constructor(id: number, position: number, color: string) {
    this.id = id;
    this.position = position;
    this.color = color;
  }
}
