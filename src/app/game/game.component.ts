import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Snake } from '../snake.model';
import { Ladder } from '../ladder.model';
import { Player } from '../player.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit, AfterViewInit {
  num!: number[];
  snake!: Snake[];
  ladder!: Ladder[];
  diceValue: number = 0;
  id: number = 0;
  disableButton!: boolean;
  res: string = 'statistics';
  color: string[] = ['yellow', 'lightcoral', 'chocolate', 'indigo'];
  player: Player[] = [];
  playerCount!: number;
  hideDice: string[] = ['one1', 'two1', 'three1', 'four1', 'five1', 'six1'];
  curveArr: string[] = ['curve0', 'curve1', 'curve2'];
  lineArr: string[] = ['line0', 'line1', 'line2'];
  constructor(private route: ActivatedRoute, private router: Router) {
    let k = 10;
    let j = 1;
    this.num = [];
    for (let i = 0; i < 100; i++) {
      if (i <= 9) {
        this.num[i] = i + 1;
      } else {
        if (i % 10 == 0) {
          k = j % 2 == 1 ? 10 * (j + 1) : 10 * j + 1;
          j++;
        }
        if (j % 2 == 1) {
          this.num[i] = k++;
        } else {
          this.num[i] = k--;
        }
      }
    }
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.playerCount = params['game'];
    });
    for (let index = 0; index < this.playerCount; index++)
      this.player[index] = new Player(index + 1, 0, this.color[index]);
    this.snake = [];
    this.ladder = [];
  }
  ngAfterViewInit(): void {
    for (let index = 0; index < this.hideDice.length; index++) {
      const element = this.hideDice[index];
      const ele = document.getElementById(element) as HTMLElement;
      ele.style.display = 'none';
    }
    this.addSnakesAndLadders();
  }
  addSnakesAndLadders() {
    this.addSnake(
      0,
      [2, 3, 4, 17, 18, 19, 20, 21, 22, 23, 24],
      [71, 73, 74, 88, 89, 90, 91, 92, 93, 94],
      0,
      0,
      0,
      0,
      30,
      -10,
      13,
      20,
      'navy'
    );
    this.addSnake(
      1,
      [5, 16, 25, 26, 27],
      [76, 77, 84, 85, 95, 96, 97],
      200,
      0,
      -100,
      -100,
      40,
      -10,
      15,
      20,
      'brown'
    );
    this.addSnake(
      2,
      [41, 42, 59, 60],
      [78, 79, 80, 81, 82, 83],
      -100,
      100,
      -100,
      -100,
      35,
      12,
      13,
      25,
      'red'
    );
    this.addLadder(0, [6, 7, 8, 9, 10], [72, 75], 20, -5, 5, 25);
    this.addLadder(1, [11, 12, 13, 14, 15], [86, 87], 10, 0, 25, 25);
    this.addLadder(2, [36, 37, 38, 39, 40], [65, 64], 10, 0, 15, 30);
  }
  addLadder(
    i: number,
    startArr: number[],
    endArr: number[],
    sLeft: number,
    sTop: number,
    eLeft: number,
    eTop: number
  ) {

    let start = this.getRandomInt(startArr);
    let playerPositions:number[]=this.getAllPlayersPositions();
    while (true) {
      if(this.checkPositions(start,playerPositions))
        break;
      start = this.getRandomInt(startArr);
    }
    let end = this.getRandomInt(endArr);
    this.ladder[i] = new Ladder(start, end);
    let elStart2 = document.getElementById(start + '');
    let elEnd2 = document.getElementById(end + '');
    let elStartLeft2 = 0;
    let elStartTop2 = 0;
    let elEndLeft2 = 0;
    let elEndTop2 = 0;
    if (elStart2 != null) {
      elStartLeft2 = this.getOffset(elStart2).left + sLeft;
      elStartTop2 = this.getOffset(elStart2).top + sTop;
    }
    if (elEnd2 != null) {
      elEndLeft2 = this.getOffset(elEnd2).left + eLeft;
      elEndTop2 = this.getOffset(elEnd2).top + eTop;
    }
    let line2 = document.getElementById('line' + i);

    line2?.setAttribute(
      'd',
      'M' +
        elStartLeft2 +
        ',' +
        elStartTop2 +
        ',' +
        elEndLeft2 +
        ',' +
        elEndTop2
    );
  }
  checkPositions(start: number, playerPositions: number[]):boolean {
    for(let i=0;i<this.playerCount;i++)
      if(start===playerPositions[i])
        return false;
    return true;
  }
  getAllPlayersPositions(): number[] {
    let playerPositions:number[]=[];
    for(let i=0;i<this.playerCount;i++)
      playerPositions.push(this.player[i].position);
    return playerPositions;
  }

  addSnake(
    i: number,
    startArr: number[],
    endArr: number[],
    hx1: number,
    hy1: number,
    hx2: number,
    hy2: number,
    sLeft: number,
    sTop: number,
    eLeft: number,
    eTop: number,
    color: string
  ) {
    let start = this.getRandomInt(startArr);
    let end = this.getRandomInt(endArr);
    this.snake[i] = new Snake(start, end);
    let elStart = document.getElementById(start + '');
    let elEnd = document.getElementById(end + '');
    let elStartLeft = 0;
    let elStartTop = 0;
    let elEndLeft = 0;
    let elEndTop = 0;
    if (elStart != null) {
      elStartLeft = this.getOffset(elStart).left + sLeft;
      elStartTop = this.getOffset(elStart).top + sTop;
    }
    if (elEnd != null) {
      elEndLeft = this.getOffset(elEnd).left + eLeft;
      elEndTop = this.getOffset(elEnd).top + eTop;
    }
    let newHx = 600 + hx1;
    let newHx1 = 500 + hx2;
    let newHy = 200 + hy1;
    let newHy1 = 700 + hy2;
    let line = document.getElementById('curve' + i);
    line?.setAttribute(
      'd',
      'M ' +
        elStartLeft +
        ' ' +
        elStartTop +
        ' C ' +
        newHx +
        ' ' +
        newHy +
        ' ' +
        newHx1 +
        ' ' +
        newHy1 +
        ' ' +
        elEndLeft +
        ' ' +
        elEndTop
    );
    line?.setAttribute('stroke', color);
  }
  async dice() {
    this.disableButton = true;

    this.diceValue = this.getRandomIntInclusive(1, 6);
    const ele = document.getElementById(
      this.hideDice[this.diceValue - 1]
    ) as HTMLElement;
    ele.style.display = 'block';
    const playerDiv1 = document.getElementById(
      'div' + this.player[this.id].position
    ) as HTMLElement;
    if (this.player[this.id].position != 0) {
      this.changeColor(playerDiv1, 'white', this.id);
    }
    await sleep(1000);
    ele.style.display = 'none';

    this.disableButton = false;
    this.player[this.id].position =
      this.player[this.id].position + this.diceValue;
    if (this.ladder[2].start == this.player[this.id].position) {
      this.player[this.id].positions.push(
        this.player[this.id].position + ' ===> '
      );

      this.player[this.id].position = this.ladder[2].end;
    } else if (this.ladder[0].start == this.player[this.id].position) {
      this.player[this.id].positions.push(
        this.player[this.id].position + ' ===> '
      );

      this.player[this.id].position = this.ladder[0].end;
    } else if (this.ladder[1].start == this.player[this.id].position) {
      this.player[this.id].positions.push(
        this.player[this.id].position + ' ===> '
      );

      this.player[this.id].position = this.ladder[1].end;
    } else if (this.snake[0].end == this.player[this.id].position) {
      this.player[this.id].positions.push(
        this.player[this.id].position + ' ==> '
      );

      this.player[this.id].position = this.snake[0].start;
    } else if (this.snake[1].end == this.player[this.id].position) {
      this.player[this.id].positions.push(
        this.player[this.id].position + ' ==> '
      );

      this.player[this.id].position = this.snake[1].start;
    } else if (this.snake[2].end == this.player[this.id].position) {
      this.player[this.id].positions.push(
        this.player[this.id].position + ' ==> '
      );

      this.player[this.id].position = this.snake[2].start;
    } else if (this.player[this.id].position > 100) {
      this.player[this.id].positions.push(
        this.player[this.id].position + ' == '
      );

      this.player[this.id].position -= this.diceValue;
    } else if (this.player[this.id].position === 100) {
      this.res = 'Player ' + (this.id + 1) + ' is Winner';
      this.player[this.id].positions.push(100 + ' == ');
      const popupElement: any = document.getElementById('popup-1');
      popupElement.classList.toggle('active');
      await sleep(10000);
      this.router.navigate(['/']);
    }
    const playerDiv = document.getElementById(
      'div' + this.player[this.id].position
    ) as HTMLElement;
    this.player[this.id].positions.push(this.player[this.id].position + ' => ');
    this.changeColor(playerDiv, this.player[this.id].color, this.id);

    this.id++;
    if (this.id === Number(this.playerCount)) this.id = 0;
    this.addLadders();
  }
  addLadders() {
    this.addLadder(0, [6, 9], [72, 75], 20, -5, 5, 25);
    this.addLadder(1, [11, 12], [86, 87], 10, 0, 25, 25);
    this.addLadder(2, [38, 39], [65, 64], 10, 0, 15, 30);
  }
  changeColor(playerDiv: HTMLElement, color: string, id: number) {
    if (this.playerCount == 1) {
      playerDiv.style.background = color;
    }
    if (this.playerCount == 2) {
      if (id == 0) playerDiv.style.borderTop = '10px solid ' + color;
      else playerDiv.style.borderBottom = '10px solid ' + color;
    }
    if (this.playerCount == 3) {
      if (id == 0) playerDiv.style.borderTop = '10px solid ' + color;

      if (id == 1) playerDiv.style.borderBottom = '10px solid ' + color;
      if (id == 2) playerDiv.style.borderLeft = '10px solid ' + color;
    }
    if (this.playerCount == 4) {
      if (id == 0) playerDiv.style.borderTop = '10px solid ' + color;

      if (id == 1) playerDiv.style.borderBottom = '10px solid ' + color;
      if (id == 2) playerDiv.style.borderLeft = '10px solid ' + color;
      if (id == 3) playerDiv.style.borderRight = '10px solid ' + color;
    }
  }
  onClose() {
    const popupElement: any = document.getElementById('popup-1');
    popupElement.classList.remove('active');
  }
  stat() {
    const popupElement: any = document.getElementById('popup-1');
    popupElement.classList.toggle('active');
  }
  getRandomIntInclusive(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  getOffset(el: HTMLElement) {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY,
    };
  }
  getRandomInt(arr: number[]): number {
    return arr[Math.floor(Math.random() * arr.length)];
  }
}
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
