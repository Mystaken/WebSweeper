export interface ShooterConfig {
  speed: {
    player?: number,
    enemy?: number,
    shots?: number
  },
  respawn?: number,
  invincible?: number,
  hpLoss?: number,
  maxEnemy?: number,
  enemyHP?: number,
  playerHP?: number
}

export const difficulty: { [difficulty: number]: ShooterConfig } = {
  0: {
    speed: {
      player: 8,
      enemy: 1,
      shots: 10
    },
    respawn: 100,
    invincible: 1000,
    hpLoss: 1,
    maxEnemy: 1,
    enemyHP: 1,
    playerHP: 10000
  },
  1: {
    speed: {
      player: 8,
      enemy: 1,
      shots: 10
    },
    respawn: 1000,
    invincible: 1000,
    hpLoss: 10,
    maxEnemy: 3,
    enemyHP: 1,
    playerHP: 10000
  },
  2: {
    speed: {
      player: 8,
      enemy: 2,
      shots: 10
    },
    respawn: 1000,
    invincible: 1000,
    hpLoss: 10,
    maxEnemy: 4,
    enemyHP: 1,
    playerHP: 10000
  },
  3: {
    speed: {
      player: 8,
      enemy: 2,
      shots: 10
    },
    respawn: 1000,
    invincible: 1000,
    hpLoss: 10,
    maxEnemy: 7,
    enemyHP: 1,
    playerHP: 10000
  },
  4: {
    speed: {
      player: 8,
      enemy: 3,
      shots: 10
    },
    respawn: 1000,
    invincible: 1000,
    hpLoss: 100,
    maxEnemy: 8,
    enemyHP: 1,
    playerHP: 10000
  },
  5: {
    speed: {
      player: 8,
      enemy: 3,
      shots: 10
    },
    respawn: 100,
    invincible: 1000,
    hpLoss: 1000,
    maxEnemy: 10,
    enemyHP: 3,
    playerHP: 10000
  },
  6: {
    speed: {
      player: 8,
      enemy: 4,
      shots: 10
    },
    respawn: 1000,
    invincible: 1000,
    hpLoss: 100,
    maxEnemy: 10,
    enemyHP: 3,
    playerHP: 10000
  },
  7: {
    speed: {
      player: 8,
      enemy: 4,
      shots: 10
    },
    respawn: 100,
    invincible: 100,
    hpLoss: 100,
    maxEnemy: 10,
    enemyHP: 3,
    playerHP: 10000
  },
  8: {
    speed: {
      player: 8,
      enemy: 4,
      shots: 10
    },
    respawn: 100,
    invincible: 100,
    hpLoss: 100,
    maxEnemy: 15,
    enemyHP: 4,
    playerHP: 10000
  },
  9: {
    speed: {
      player: 8,
      enemy: 4,
      shots: 10
    },
    respawn: 100,
    invincible: 100,
    hpLoss: 100,
    maxEnemy: 15,
    enemyHP: 5,
    playerHP: 10000
  },
  10: {
    speed: {
      player: 8,
      enemy: 5,
      shots: 10
    },
    respawn: 100,
    invincible: 100,
    hpLoss: 100,
    maxEnemy: 50,
    enemyHP: 5,
    playerHP: 10000
  }
};
