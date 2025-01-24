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

      // Diminua 1 ponto do jogador 2 CASO o poder do jogador 1 seja maior que o 2 E se pontuação do jogador 2 for maior que 0. Caso não for verdade, diminuir 0
      if (powerResult1 > powerResult2 && character2.PONTOS > 0) {
        console.log(
          `${character1.NOME} venceu o confronto! ${character2.NOME} perdeu 1 ponto.`
        );
        character2.PONTOS--;
      }

      if (powerResult2 > powerResult1 && character1.PONTOS > 0) {
        console.log(
          `${character2.NOME} venceu o confronto! ${character1.NOME} perdeu 1 ponto.`
        );
        character1.PONTOS--;
      }

      console.log(powerResult2 === powerResult1 ? 'Empate.' : '');
    }

    //verificando o vencedor
    if (testSkill1 > testSkill2) {
      console.log(`${character1.NOME} marcou um ponto!`);
      character1.PONTOS++;
    } else if (testSkill2 > testSkill1) {
      console.log(`${character2.NOME} marcou um ponto!`);
      character2.PONTOS++;
    }

    console.log(`--------------------------\n`);
  }
}

async function declareWinner(character1, character2) {
  console.log('Resultado final:');
  console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`);
  console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s)`);

  if (character1.PONTOS > character2.PONTOS) {
    console.log(`\n${character1.NOME} venceu a corrida! Parabéns! 🏆`);
  } else if (character2.PONTOS > character1.PONTOS) {
    console.log(`\n${character2.NOME} venceu a corrida! Parabéns! 🏆`);
  } else {
    console.log('Empate! 🙁');
  }
}

(async function main() {
  console.log(
    `🏁📢 Corrida entre ${player1.NOME} e ${player2.NOME} começando... 🚨\n`
  );
  await playRaceEngine(
    player1,
    player2
  ); /* await vai fazer a main esperar a função PLAYRACE ser rodada pra depois a função MAIN rodar */
  await declareWinner(player1, player2);
})();
