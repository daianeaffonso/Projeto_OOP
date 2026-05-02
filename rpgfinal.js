// ============================================================
// SISTEMA RPG — Projeto Final
// ============================================================

// --- CLASSE BASE --- #atributos privados

class Personagem {
  #nome;
  #vida;
  #vidaMaxima;
  #nivel;
  #forca;

  constructor(nome, vidaMaxima, forca, nivel) {
    if (!nome || nome.trim() === "") throw new Error("Nome inválido");
    this.#nome = nome.trim(); // Para definir o nome dos personagens uma vez e não alterar
    this.#vidaMaxima = vidaMaxima;
    this.#vida = vidaMaxima;
    this.#nivel = 1;
    this.#forca = forca;
  }

  // Getter
  get nome() { return this.#nome; }
  get vida() { return this.#vida; }
  get vidaMaxima() { return this.#vidaMaxima; }
  get nivel() { return this.#nivel; }
  get forca() { return this.#forca; }
  get estaVivo() { return this.#vida > 0; }

  atacar(alvo) {
    
    if (!this.estaVivo) {
      console.log(`${this.nome} está derrotado e não pode atacar!`);
      return;
    }
    
    alvo.receberDano(this.#forca);
  }

  receberDano(dano) {
    this.#vida = Math.max(0, this.#vida - dano);
    if (this.#vida === 0) {
      console.log(`${this.#nome} foi derrotado!`);
    }
  }

  curar(quantidade) {//Math.min para não deixar passar a quantidade máxima de vida
    if (!this.estaVivo) {
      console.log(`${this.nome} está derrotado e não pode ser curado!`);
      return
    }
    this.#vida = Math.min(this.#vidaMaxima, this.#vida + quantidade);
    console.log(`✨ ${this.#nome} recuperou ${quantidade} de vida (vida: ${this.#vida}/${this.#vidaMaxima})`);
  }

  subirNivel() {
    this.#nivel++;
    this.#vidaMaxima += 10;
    this.#forca += 5;
    this.#vida = this.#vidaMaxima;
  }

  exibirStatus() {
    console.log(`${this.#nome} - Vida: ${this.#vida}/${this.#vidaMaxima}, Nível: ${this.#nivel}, Força: ${this.#forca}`);
  }
}

// Classe Guerreiro
class Guerreiro extends Personagem {
  #armadura;
  #time;
  constructor(nome, vidaMaxima, forca, armadura = 10, time = "herois") {
    super(nome, vidaMaxima, forca);
    this.#armadura = armadura;
    this.#time = time;
  }

  get armadura() { return this.#armadura; }
  get time() { return this.#time; }

  atacar(alvo) {
    if (!this.estaVivo) {
      console.log(`${this.nome} está derrotado e não pode atacar!`);
      return;
    }
    if (alvo.time === this.time) {
      console.log(`${this.nome} não pode atacar aliados!`);
      return;
    }

    // dano bonificado no guerreiro
    console.log(`⚔️ ${this.nome} por ser guerreiro tem bônus de força!`);

    const dano = this.forca * 1.2;

    // Personagem 1 ataca personagem 2
    console.log(`⚔️ ${this.nome} ataca ${alvo.nome} causando ${dano} de dano!`);
    alvo.receberDano(dano);
  }

  receberDano(dano) {
    const danoFinal = Math.max(0, dano - this.#armadura);
    super.receberDano(danoFinal);
  }

  defesa() {
    this.#armadura *= 2;
    console.log(`${this.nome} está em posição de defesa!`);
  }
}

// Classe Mago
class Mago extends Personagem {
  #mana;
  #manaMaxima;
  #time
  constructor(nome, vidaMaxima, forca, manaMaxima = 50, time = "herois") {
    super(nome, vidaMaxima, forca);
    this.#manaMaxima = manaMaxima;
    this.#mana = manaMaxima;
    this.#time = time
  }

  get mana() { return this.#mana; }
  get manaMaxima() { return this.#manaMaxima; }
  get time() { return this.#time; }

  atacar(alvo) {
    if (!this.estaVivo) {
      console.log(`${this.nome} está derrotado e não pode atacar!`);
      return;
    }
   
    if (alvo.time === this.time) {
      console.log(`${this.nome} não pode atacar aliados!`);
      return;
    }
    if (this.#mana < 10) throw new Error("Mana insuficiente");
    this.#mana -= 10;
    const dano = this.forca * 3;
    alvo.receberDano(dano);
    // Personagem 1 ataca personagem 2
    console.log(`⚔️ ${this.nome} ataca ${alvo.nome} causando ${dano} de dano!`);
    console.log(`✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨
          YOU SHALL NOT PASS!
          ✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨

                 /\\
                /  \\
               |    |
               |    |
               |    |
              /      \\
             /   ⚔️    \\
            |     🧙     |
            |    Gandalf |
             \\          /
              \\________/
                 ||  ||
                 ||  ||
                 ||  ||
             ====      ====
            !!!   BLOCKED   !!!
             ====      ====
    `);
    alvo.receberDano(dano);
  }

  lancarCura(aliado) {//cura um aliado
    if (!this.estaVivo) {
      console.log(`${this.nome} está derrotado e não pode lançar cura!`);
      return;
    }
    if (aliado.time !== this.time) {
      console.log(`❌${this.nome} não pode curar inimigos!`);
      return;
    }
    if (this.#mana < 15) throw new Error("Mana insuficiente");
    this.#mana -= 15;
    aliado.curar(20);
    console.log(`✅${this.nome} curou ${aliado.nome}! Mana que restou do Gandalf: ${this.#mana}`);
  }

  meditar() {
    if (!this.estaVivo) {
      console.log(`${this.nome} está derrotado e não pode meditar!`);
      return;
    }
    this.#mana = Math.min(this.#manaMaxima, this.#mana + 20);
  }
}

// Classe Arqueiro
class Arqueiro extends Personagem {
  #flechas;
  #chanceCritico;
  #time
  constructor(nome, vidaMaxima, forca, flechas = 20, chanceCritico = 0.25, time = "herois") {
    super(nome, vidaMaxima, forca);
    this.#flechas = flechas;
    this.#chanceCritico = chanceCritico;
    this.#time = time
  }

  get flechas() { return this.#flechas; }
  get chanceCritico() { return this.#chanceCritico; }
  get time() { return this.#time; }


  atacar(alvo) {
    if (!this.estaVivo) {
      console.log(`${this.nome} está derrotado e não pode atacar!`);
      return;
    }

    if (alvo.time === this.time) {
      console.log(`${this.nome} não pode atacar aliados!`);
      return;
    }
    if (this.#flechas <= 0) throw new Error("Sem flechas");
    this.#flechas--;
    let dano = this.forca;
    if (Math.random() < this.#chanceCritico) {
      dano *= 2;
      console.log("🎯 Crítico!");
    }
    alvo.receberDano(dano);
    // Personagem 1 ataca personagem 2
    console.log(`⚔️ ${this.nome} ataca ${alvo.nome} causando ${dano} de dano!`);
    alvo.receberDano(dano);
  }

  recarregarFlechas(qtd) {
    this.#flechas += qtd;
  }
}

// Classe Inimigo
class Inimigo extends Personagem {
#armadura;
#time
  constructor(nome, vidaMaxima, forca, armadura = 20, time = "inimigos") {
    super(nome, vidaMaxima, forca);
    this.#armadura = armadura;
    this.#time
  }

  get armadura() { return this.#armadura; }
  get time(){ return this.#time; }

  atacar(alvo) {
    if (!this.estaVivo) {
      console.log(`${this.nome} está derrotado e não pode atacar!`);
      return;
    }
    
    // dano bonificado no inimigo
    console.log(`⚔️ ${this.nome} por ser inimigo tem mais força para atacar!`);

    const dano = this.forca * 3;

    // Personagem 1 ataca personagem 2
    console.log(`⚔️ ${this.nome} ataca ${alvo.nome} causando ${dano} de dano!`);
    alvo.receberDano(dano);
  }

  receberDano(dano) {
    const danoFinal = Math.max(0, dano - this.#armadura);
    super.receberDano(danoFinal);
  }

  defesa() {
    this.#armadura *= 2;
    console.log(`${this.nome} está em posição de defesa!`);
  }
}


const gimli = new Guerreiro("🪓 Gimli, filho de Glóin", 50, 10, 15);
const gandalf = new Mago("🧙 Gandalf, o cinzento", 80, 15, 100);
const legolas = new Arqueiro("🧝🏹🌲 Legolas, o elfo", 90, 18, 30);

gimli.exibirStatus();
gandalf.exibirStatus();
legolas.exibirStatus();

const inimigo = new Inimigo("Orc", 200, 10, 5);

//Testes:
[gimli, gandalf, legolas].forEach(p => p.atacar(inimigo));
inimigo.defesa()
legolas.atacar(inimigo)

inimigo.exibirStatus()
inimigo.atacar(legolas)
legolas.exibirStatus()
gandalf.lancarCura(legolas)
legolas.exibirStatus()
gandalf.lancarCura(inimigo)

//gimli.defesa();
//gandalf.meditar();
//gandalf.lancarCura(gimli);
//legolas.recarregarFlechas(10);

//gimli.atacar(gandalf)
//gandalf.atacar(gimli)
//gandalf.curar(100);

//inimigo.atacar(gandalf)
//gandalf.exibirStatus()
//gandalf.lancarCura(gandalf)
//gandalf.exibirStatus()