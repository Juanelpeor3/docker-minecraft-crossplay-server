import { Player, Session, ServerStatus, Page } from '../../models';

const now = new Date();
const hours = (h: number) => new Date(now.getTime() - h * 3600_000).toISOString();
const days = (d: number) => new Date(now.getTime() - d * 86400_000).toISOString();

export const MOCK_PLAYERS: Player[] = [
  { id: 1, name: 'xXDragonSlayerXx', platform: 'JAVA', firstSeen: days(45) },
  { id: 2, name: 'CreeperQueen', platform: 'JAVA', firstSeen: days(30) },
  { id: 3, name: '.BedrockSteve', platform: 'BEDROCK', firstSeen: days(28) },
  { id: 4, name: 'DiamondMiner99', platform: 'JAVA', firstSeen: days(21) },
  { id: 5, name: 'EnderPearl_Pro', platform: 'JAVA', firstSeen: days(18) },
  { id: 6, name: '.MobileAlex', platform: 'BEDROCK', firstSeen: days(14) },
  { id: 7, name: 'RedstoneWizard', platform: 'JAVA', firstSeen: days(10) },
  { id: 8, name: '.NetherExplorer', platform: 'BEDROCK', firstSeen: days(7) },
  { id: 9, name: 'PixelWarrior', platform: 'JAVA', firstSeen: days(5) },
  { id: 10, name: '.SwitchCrafter', platform: 'BEDROCK', firstSeen: days(3) },
  { id: 11, name: 'BuildMaster_X', platform: 'JAVA', firstSeen: days(2) },
  { id: 12, name: '.PocketEdition4Life', platform: 'BEDROCK', firstSeen: days(1) },
];

const ONLINE_PLAYER_IDS = [1, 3, 5, 6, 10];

export const MOCK_ONLINE_PLAYERS: Player[] = MOCK_PLAYERS.filter((p) =>
  ONLINE_PLAYER_IDS.includes(p.id),
);

export const MOCK_STATUS: ServerStatus = {
  online: true,
  playerCount: MOCK_ONLINE_PLAYERS.length,
  maxPlayers: 20,
  players: MOCK_ONLINE_PLAYERS,
};

export const MOCK_SESSIONS: Session[] = [
  // Active sessions (online players)
  { id: 101, playerId: 1, playerName: 'xXDragonSlayerXx', platform: 'JAVA', joinedAt: hours(2), leftAt: null },
  { id: 102, playerId: 3, playerName: 'BedrockSteve', platform: 'BEDROCK', joinedAt: hours(1.5), leftAt: null },
  { id: 103, playerId: 5, playerName: 'EnderPearl_Pro', platform: 'JAVA', joinedAt: hours(0.5), leftAt: null },
  { id: 104, playerId: 6, playerName: 'MobileAlex', platform: 'BEDROCK', joinedAt: hours(3), leftAt: null },
  { id: 105, playerId: 10, playerName: 'SwitchCrafter', platform: 'BEDROCK', joinedAt: hours(0.75), leftAt: null },

  // Past sessions
  { id: 90, playerId: 1, playerName: 'xXDragonSlayerXx', platform: 'JAVA', joinedAt: hours(26), leftAt: hours(22) },
  { id: 91, playerId: 2, playerName: 'CreeperQueen', platform: 'JAVA', joinedAt: hours(28), leftAt: hours(25) },
  { id: 92, playerId: 3, playerName: '.BedrockSteve', platform: 'BEDROCK', joinedAt: hours(48), leftAt: hours(45) },
  { id: 93, playerId: 4, playerName: 'DiamondMiner99', platform: 'JAVA', joinedAt: hours(30), leftAt: hours(28.5) },
  { id: 94, playerId: 5, playerName: 'EnderPearl_Pro', platform: 'JAVA', joinedAt: hours(50), leftAt: hours(46) },
  { id: 95, playerId: 6, playerName: '.MobileAlex', platform: 'BEDROCK', joinedAt: hours(52), leftAt: hours(50) },
  { id: 96, playerId: 7, playerName: 'RedstoneWizard', platform: 'JAVA', joinedAt: hours(72), leftAt: hours(68) },
  { id: 97, playerId: 8, playerName: '.NetherExplorer', platform: 'BEDROCK', joinedAt: hours(96), leftAt: hours(93) },
  { id: 98, playerId: 9, playerName: 'PixelWarrior', platform: 'JAVA', joinedAt: hours(100), leftAt: hours(97) },
  { id: 99, playerId: 11, playerName: 'BuildMaster_X', platform: 'JAVA', joinedAt: hours(24), leftAt: hours(20) },
  { id: 100, playerId: 12, playerName: '.PocketEdition4Life', platform: 'BEDROCK', joinedAt: hours(10), leftAt: hours(7) },
  { id: 89, playerId: 2, playerName: 'CreeperQueen', platform: 'JAVA', joinedAt: hours(75), leftAt: hours(71) },
  { id: 88, playerId: 4, playerName: 'DiamondMiner99', platform: 'JAVA', joinedAt: hours(55), leftAt: hours(52) },
  { id: 87, playerId: 7, playerName: 'RedstoneWizard', platform: 'JAVA', joinedAt: hours(120), leftAt: hours(116) },
  { id: 86, playerId: 1, playerName: 'xXDragonSlayerXx', platform: 'JAVA', joinedAt: hours(150), leftAt: hours(144) },
];

export const MOCK_COMMAND_RESPONSES: Record<string, string> = {
  list: `There are ${MOCK_ONLINE_PLAYERS.length}/20 players online:\n${MOCK_ONLINE_PLAYERS.map((p) => p.name).join(', ')}`,
  tps: 'TPS from last 1m, 5m, 15m: 19.98, 19.95, 19.92',
  seed: 'Seed: [-4823714850524768246]',
  difficulty: 'The difficulty is Normal',
  time: 'The time is 6543',
  weather: 'The weather is clear',
  default: 'Unknown or not permitted command.',
};
