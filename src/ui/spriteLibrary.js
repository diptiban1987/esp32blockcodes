// Built-in high-end sprite library with colorful vector SVGs and full costume sets
import { animals } from './sprites/animals.js';
import { people } from './sprites/people.js';
import { fantasy } from './sprites/fantasy.js';
import { sports } from './sprites/sports.js';
import { music } from './sprites/music.js';
import { vehicles } from './sprites/vehicles.js';
import { space } from './sprites/space.js';
import { things } from './sprites/things.js';
import { food } from './sprites/food.js';
import { nature } from './sprites/nature.js';

export const SPRITE_LIBRARY = [
  ...animals,
  ...people,
  ...fantasy,
  ...sports,
  ...music,
  ...vehicles,
  ...space,
  ...things,
  ...food,
  ...nature
];
