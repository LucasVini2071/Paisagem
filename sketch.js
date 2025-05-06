vlet gralhas = []; // Armazena todas as gralhas azuis criadas
let arvores = [];
let peixes = []; // Novo array para armazenar os peixes
let cidadeX;
let rioY;
let rioLargura = 80; // Largura do rio

function setup() {
  createCanvas(800, 400);
  cidadeX = width / 2;
  rioY = height * 0.7; // Posição vertical do rio

  // Cria alguns peixes no rio inicialmente
  peixes.push(new Peixe(random(50, cidadeX - 50), rioY + random(10, rioLargura - 10), random(1, 2)));
  peixes.push(new Peixe(random(50, cidadeX - 50), rioY + random(10, rioLargura - 10), random(-2, -1)));
  peixes.push(new Peixe(random(cidadeX + 50, width - 50), rioY + random(10, rioLargura - 10), random(1.5, 2.5)));
  peixes.push(new Peixe(random(cidadeX + 50, width - 50), rioY + random(10, rioLargura - 10), random(-2.5, -1.5)));
}

function draw() {
  background(135, 206, 235); // céu

  // campo
  noStroke();
  fill(144, 238, 144);
  rect(0, height / 2, width, height / 2);

  // rio
  fill(70, 130, 180); // Azul acinzentado para o rio
  rect(0, rioY, width, rioLargura);

  // sol
  fill(255, 223, 0);
  ellipse(50, 50, 50); // Desenha o sol

  // cidade (prédios)
  for (let i = 0; i < 5; i++) {
    let x = cidadeX + i * 40;
    let y = height / 2 - 100;
    let largura = 30;
    let altura = 100;

    // Prédio
    fill(100);
    rect(x, y, largura, altura);

    // Janelas (3 linhas, 2 colunas por prédio)
    let janelaLargura = 6;
    let janelaAltura = 10;
    let espacamentoX = 8;
    let espacamentoY = 20;

    for (let linha = 0; linha < 3; linha++) {
      for (let coluna = 0; coluna < 2; coluna++) {
        let janelaX = x + 5 + coluna * espacamentoX;
        let janelaY = y + 10 + linha * espacamentoY;
        fill(255, 255, 150); // Amarelo claro (luz)
        rect(janelaX, janelaY, janelaLargura, janelaAltura);
      }
    }
  }

  // campos (árvores)
  for (let arvore of arvores) {
    arvore.mostrar();
  }

  // Desenha os peixes
  for (let peixe of peixes) {
    peixe.mover();
    peixe.mostrar();
  }

  // Gralhas Azuis voando
  for (let i = gralhas.length - 1; i >= 0; i--) {
    gralhas[i].mover();
    gralhas[i].mostrar();

    // Remove se sair da tela
    if (gralhas[i].x > width + 50) {
      gralhas.splice(i, 1);
    }
  }
}

function mousePressed() {
  if (mouseY > height / 2 && mouseY < rioY && mouseX < cidadeX) {
    arvores.push(new Arvore(mouseX, mouseY));
    gralhas.push(new GralhaAzul(0, random(50, 150))); // Cria uma gralha voando
  }
}

class Arvore {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.altura = 0;
  }

  mostrar() {
    this.altura = min(this.altura + 1, 80); // Crescimento mais alto

    // Tronco
    fill(101, 67, 33);
    rect(this.x - 2, this.y - this.altura, 4, this.altura);

    // Camadas da copa da araucária (em forma de disco)
    let numCamadas = 3;
    let camadaAltura = 15;
    let camadaLargura = [60, 45, 30]; // Tamanho das copas

    for (let i = 0; i < numCamadas; i++) {
      fill(34, 139, 34);
      ellipse(
        this.x,
        this.y - this.altura - i * camadaAltura,
        camadaLargura[i],
        15
      );
    }
  }
}

class GralhaAzul {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vel = random(2, 4);
  }

  mover() {
    this.x += this.vel;
  }

  mostrar() {
    // Corpo
    fill(0, 102, 204); // Azul forte
    ellipse(this.x, this.y, 20, 10); // corpo
    ellipse(this.x + 10, this.y - 5, 15, 8); // cabeça

    // Asa
    fill(0, 76, 153);
    triangle(this.x - 10, this.y, this.x, this.y - 10, this.x + 5, this.y);

    // Bico
    fill(255, 153, 51);
    triangle(this.x + 17, this.y - 5, this.x + 22, this.y - 3, this.x + 17, this.y - 1);

    // Olho
    fill(255);
    ellipse(this.x + 12, this.y - 6, 3);
  }
}

class Peixe {
  constructor(x, y, vel) {
    this.x = x;
    this.y = y;
    this.vel = vel;
    this.tamanho = random(10, 20);
    this.cor = color(random(200, 255), random(100, 200), random(50, 150));
  }

  mover() {
    this.x += this.vel;
    // Faz o peixe dar a volta ao chegar na borda
    if (this.x > width + this.tamanho || this.x < -this.tamanho) {
      this.vel *= -1;
    }
  }

  mostrar() {
    fill(this.cor);
    ellipse(this.x, this.y, this.tamanho * 1.5, this.tamanho); // Corpo
    triangle(this.x - this.tamanho * 0.75 * Math.sign(this.vel), this.y,
             this.x - this.tamanho * 1.25 * Math.sign(this.vel), this.y - this.tamanho / 2,
             this.x - this.tamanho * 1.25 * Math.sign(this.vel), this.y + this.tamanho / 2); // Cauda
  }
}
   
