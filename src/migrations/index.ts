import * as migration_20261023_135853_initial from './20261023_135853_initial';

export const migrations = [
  {
    up: migration_20261023_135853_initial.up,
    down: migration_20261023_135853_initial.down,
    name: '20261023_135853_initial'
  },
];
