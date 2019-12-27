import { heroes } from './heroes';
import { Hero } from '../lib';

/**
 * Return a fulfilled promise after a given delay.
 */
const delay: (ms: number) => Promise<void> = (ms: number) =>
  new Promise<void>(resolve => setTimeout(resolve, ms));

/**
 * Return a fulfilled promise of heroes
 */
const getHeroesDelayedAsync: () => Promise<Hero[]> = () =>
  new Promise<Hero[]>(resolve => resolve(heroes));

/**
 * Return a fulfilled promise of empty array
 */
let getHeroesEmpty: () => Promise<Hero[]> = () => Promise.resolve([]);
// new Promise<Hero[]>(resolve => resolve([]));

/**
 * Get the heroes via a Promise
 */
export let getHeroesViaPromise: () => Promise<Hero[]> = () =>
  // return delay(1000) then getHeroes
  delay(1000).then(() => getHeroesDelayedAsync());

/**
 * Create and return a promise.
 * When invoked, it will settle
 * by either resolve or reject.
 */
export let getHeroesViaNewPromise: () => Promise<Hero[]> = () => {
  const newPromise = new Promise<Hero[]>((resolve, reject) => {
    return delay(1000)
      .then(() => getHeroesDelayedAsync())
      .then((heroes: Hero[]) => {
        if (heroes && heroes.length) {
          resolve(heroes);
        } else {
          reject(Error('Uh oh! Errors!'));
        }
      });
  });
  return newPromise;
};

/**
 * Get the heroes,
 * except this always causes a Promise reject
 */
export let getHeroesViaPromiseReject: () => Promise<Hero[]> = () => {
  const newPromise = new Promise<Hero[]>((resolve, reject) => {
    return delay(1000)
      .then(() => getHeroesEmpty())
      .then((heroes: Hero[]) => {
        if (heroes && heroes.length) {
          resolve(heroes);
        } else {
          reject(Error('Uh oh! Errors!'));
        }
      });
  });
  return newPromise;
};

/**
 * Get the heroes
 * Except this always causes a Promise to reject, too
 */
export let getHeroesViaPromiseRejectShorter: () => Promise<Hero[]> = () => {
  const getsHeroesOrDoesIt = () =>
    Promise.reject('bad error occured getting the heores');
  return delay(1000).then(() => getsHeroesOrDoesIt());
};
