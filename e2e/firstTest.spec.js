const { reloadApp } = require('detox-expo-helpers');

describe('Test example', () => {
  beforeEach(async () => {
    await reloadApp();
  });

  // it('should login successfully', async () => {
  //   await element(by.text('')).tap();

  //   await expect(element(by.id('email'))).toBeVisible();

  //   await element(by.id('email')).typeText('john@example.com');
  //   await element(by.id('password')).typeText('123456');
  //   await element(by.text('Login')).tap();

  //   await expect(element(by.text('Welcome'))).toBeVisible();
  //   await expect(element(by.id('email'))).toNotExist();
  // });
});
