const player1 = {
  NOME: 'Mario',
  VELOCIDADE: 4,
  MANOBRABILIDADE: 3,
  PODER: 3,
  PONTOS: 0,
};

const player2 = {
  NOME: 'Luigi',
  VELOCIDADE: 3,
  MANOBRABILIDADE: 4,
  PODER: 4,
  PONTOS: 0,
};

// Função de rolar dados
// Retorna um número radômico
async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

// Função de pegar um bloco
// Retorna um bloco aleatório
async function getRandomBlock() {
  let random = Math.random();
  let result;

  switch (true) {
    case random < 0.33:
      result = 'RETA';
      break;

    case random < 0.66:
      result = 'CURVA';
      break;

    default:
      result = 'CONFRONTO';
  }

  return result;
}

// Mostra os valores do personagem
// Função é chamada dentro do playRaceEngine()
async function logRollResult(characterName, block, diceResult, atribute) {
  console.log(
    `${characterName} rolou um 🎲 de ${block} ${diceResult} + ${atribute} = ${
      diceResult + atribute
    }`
  );
}

async function playRaceEngine(character1, character2) {
  for (let round = 1; round <= 5; round++) {
    console.log(`🏁 Rodada ${round}`);

    // sortear bloco
    let block = await getRandomBlock();
    console.log(`Bloco ${block}`);

    //rolar os dados
    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    //teste de habilidade (dado + habilidade)
    let testSkill1 = 0;
    let testSkill2 = 0;

    if (block == 'RETA') {
      testSkill1 = diceResult1 + character1.VELOCIDADE;
      testSkill2 = diceResult2 + character2.VELOCIDADE;

      //personagem 1
      await logRollResult(
        character1.NOME,
        'VELOCIDADE',
        diceResult1,
        character1.VELOCIDADE
      );

      //personagem 2
      await logRollResult(
        character2.NOME,
        'VELOCIDADE',
        diceResult2,
        character2.VELOCIDADE
      );
    }
    if (block == 'CURVA') {
      testSkill1 = diceResult1 + character1.MANOBRABILIDADE;
      testSkill2 = diceResult2 + character2.MANOBRABILIDADE;

      //personagem 1
      await logRollResult(
        character1.NOME,
        'MANOBRABILIDADE',
        diceResult1,
        character1.MANOBRABILIDADE
      );

      //personagem 2
      await logRollResult(
        character2.NOME,
        'MANOBRABILIDADE',
        diceResult2,
        character2.MANOBRABILIDADE
      );
    }
    if (block == 'CONFRONTO') {
      let powerResult1 = diceResult1 + character1.PODER;
      let powerResult2 = diceResult2 + character2.PODER;

      console.log(`${character1.NOME} CONFRONTOU com ${character2.NOME} 💣💥`);

      //personagem 1
      await logRollResult(
        character1.NOME,
        'PODER',
        diceResult1,
        character1.PODER
      );

      //personagem 2
      await logRollResult(
        character2.NOME,
        'PODER',
        diceResult2,
        character2.PODER
      );

      if (powerResult1 > powerResult2) {
        if (character2.PONTOS > 0) {
          character2.PONTOS--;
        }
      } else if (powerResult2 > powerResult1) {
        if (character1.PONTOS > 0) {
          character1.PONTOS--;
        }
      }
      if (powerResult2 === powerResult1) {
        console.log('Empate.');
      }
    }

    //verificando o vencedor
    if (testSkill1 > testSkill2) {
      console.log(`${character1.NOME} marcou um ponto!`);
      character1.PONTOS++;
    } else if (testSkill2 > testSkill1) {
      console.log(`${character2.NOME} marcou um ponto!`);
      character2.PONTOS++;
    }

    console.log('--------------------------');
  }
}

(async function main() {
  console.log(
    `🏁📢 Corrida entre ${player1.NOME} e ${player2.NOME} começando... 🚨`
  );
  await playRaceEngine(
    player1,
    player2
  ); /* await vai fazer a main esperar a função PLAYRACE ser rodada pra depois a função MAIN rodar */
})();
