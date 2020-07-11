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
});
