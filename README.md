# 🧙‍♂️ Sistema RPG — Projeto Final

Um projeto em **JavaScript** que simula um sistema de **RPG de batalhas** entre personagens com diferentes classes e habilidades.  
Cada personagem possui atributos únicos e métodos específicos que representam ações típicas de um jogo de fantasia.

---

## ⚔️ Classes Principais

### 🧩 Personagem (Classe Base)
Define os atributos e comportamentos comuns a todos os personagens:
- **Atributos:** `#nome`, `#vida`, `#vidaMaxima`, `#nivel`, `#forca`
- **Métodos:** `atacar()`, `receberDano()`, `curar()`, `subirNivel()`, `exibirStatus()`

---

### 🪓 Guerreiro
Personagem com alta defesa e bônus de força.
- **Atributos:** `#armadura`, `#time`
- **Métodos:** `atacar()`, `defesa()`
- **Destaque:** Reduz o dano recebido com base na armadura.

---

### 🧙 Mago
Personagem com habilidades mágicas e capacidade de cura.
- **Atributos:** `#mana`, `#manaMaxima`, `#time`
- **Métodos:** `atacar()`, `lancarCura()`, `meditar()`
- **Destaque:** Usa mana para lançar feitiços e curar aliados.  
  Inclui o famoso feitiço “**YOU SHALL NOT PASS!**” inspirado em Gandalf.

---

### 🧝 Arqueiro
Personagem ágil com ataques à distância e chance de crítico.
- **Atributos:** `#flechas`, `#chanceCritico`, `#time`
- **Métodos:** `atacar()`, `recarregarFlechas()`
- **Destaque:** Pode causar dano crítico aleatório e precisa gerenciar suas flechas.

---

### 👹 Inimigo
Representa os oponentes do grupo de heróis.
- **Atributos:** `#armadura`, `#time`
- **Métodos:** `atacar()`, `defesa()`
- **Destaque:** Possui força de ataque multiplicada e alta resistência.

---

## 🧠 Lógica de Combate

- Cada personagem pode **atacar**, **receber dano**, **curar** ou **defender**.
- O sistema impede ataques entre aliados (`alvo.time === this.time`).
- O dano é calculado com base na força e nas defesas individuais.
- O Mago consome **mana** para usar magias e curas.
- O Arqueiro consome **flechas** e pode causar **críticos**.

---

## 🚀 Como Executar

1. Clone o repositório:
   ```bash
   https://github.com/daianeaffonso/Projeto_OOP

Abra o projeto no VS Code ou outro editor.

Execute o arquivo principal:

node rpg.js

Observe as interações e resultados no console.

🧩 Exemplo de Saída

🪓 Gimli, filho de Glóin - Vida: 50/50, Nível: 1, Força: 10;

🧙 Gandalf, o cinzento - Vida: 80/80, Nível: 1, Força: 15;

🧝🏹🌲 Legolas, o elfo - Vida: 90/90, Nível: 1, Força: 18;

⚔️ Orc por ser inimigo tem mais força para atacar!;

⚔️ Orc ataca 🧝🏹🌲 Legolas, o elfo causando 30 de dano!;

✨ Gandalf curou Legolas! Mana restante: 85;

💡 Melhorias Futuras

Implementar sistema de turnos automáticos.

Adicionar itens e equipamentos.

Criar interface visual com HTML/CSS.

Adicionar sistema de experiência e evolução.

🧾 Licença

Este projeto é de uso educacional e livre para modificações e melhorias.

Made with JavaScript por Daiane.
