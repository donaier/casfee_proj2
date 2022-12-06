import { AppConfiguration } from './app.configuration.po';

describe('basic tests for todo app', () => {
  let page: AppConfiguration;

  beforeEach(() => {
    page = new AppConfiguration();

    page.navigateTo();
  });

  it('first todo item is "Go shopping"', () => {

  });

  // Maximale Anzahl Accounts / Categorien
  // Keine Eintraege vorhanden
  // Updates erfolgreich durchfuehren - keine Aenderungen an Subklassen

  // Firestore ist nicht verfuegbar --> was nun ???

  // formulare ein neuer eintrag mitselbem namen -> evtl. mit validator loesen


});
