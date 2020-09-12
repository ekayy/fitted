import { reloadApp } from 'detox-expo-helpers';

describe('App', () => {
  beforeEach(async () => {
    await reloadApp();
  });

  it('should show the welcome page', async () => {
    await expect(element(by.id('loginButton'))).toBeVisible();
  });

  it('should navigate to the login page', async () => {
    await element(by.id('loginButton')).tap();
    await waitFor(element(by.id('loginSubmit')))
      .toBeVisible()
      .withTimeout(5000);

    await expect(element(by.id('username'))).toBeVisible();
    await expect(element(by.id('password'))).toBeVisible();
    await expect(element(by.id('loginSubmit'))).toBeVisible();
  });

  it.only('can login if correct credentials', async () => {
    await element(by.id('loginButton')).tap();
    await waitFor(element(by.id('loginSubmit'))).toBeVisible();

    await element(by.id('username')).typeText('fittedsf');
    await element(by.id('password')).typeText('original');
    await element(by.id('loginSubmit')).tap();

    await waitFor(element(by.id('searchBar'))).toBeVisible();
    await expect(element(by.id('searchBar'))).toBeVisible();
  });
});
