import { escolas as mockEscolas } from './mock';
import { Escola } from '@/types';

let _store: Escola[] = [...mockEscolas];

export const escolaStore = {
  getAll: (): Escola[] => _store,
  getById: (id: string): Escola | null => _store.find((e) => e.id === id) ?? null,
  add: (escola: Escola): void => { _store = [..._store, escola]; },
  update: (escola: Escola): void => { _store = _store.map((e) => (e.id === escola.id ? escola : e)); },
  remove: (id: string): void => { _store = _store.filter((e) => e.id !== id); },
};
