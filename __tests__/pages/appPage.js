import userEvent from '@testing-library/user-event';
import { expect } from 'vitest';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';

class AppPage {
  constructor() {
    this.user = userEvent.setup();
  }

  async emailInput() {
    return screen.findByLabelText('Email');
  }

  async passwordInput() {
    return screen.findByLabelText('Пароль');
  }

  async addressInput() {
    return screen.findByLabelText('Адрес');
  }

  async cityInput() {
    return screen.findByLabelText('Город');
  }

  async countryInput() {
    return screen.findByLabelText('Страна');
  }

  async checkBox() {
    return screen.findByLabelText('Принять правила');
  }

  async signUpBtn() {
    return screen.findByRole('button', { name: 'Зарегистрироваться' });
  }

  async getBackBtn() {
    return screen.findByRole('button', { name: 'Назад' });
  }

  async getRegistrationTable() {
    return screen.findByRole('table');
  }

  async fillForm({
    email,
    password,
    address,
    city,
    country,
    rulesCheckBox
  }) {
    const emailInput = await this.emailInput();
    const passwordInput = await this.passwordInput();
    const addressInput = await this.addressInput();
    const cityInput = await this.cityInput();
    const countryInput = await this.countryInput();
    const checkBox = await this.checkBox();

    await this.user.type(emailInput, email);
    await this.user.type(passwordInput, password);
    await this.user.type(addressInput, address);
    await this.user.type(cityInput, city);
    await this.user.selectOptions(countryInput, country);
    if (rulesCheckBox === true) {
      await this.user.click(checkBox);
    }
  }

  async checkAppRender() {
    const emailInput = await this.emailInput();
    const passwordInput = await this.passwordInput();
    const addressInput = await this.addressInput();
    const cityInput = await this.cityInput();
    const countryInput = await this.countryInput();
    const checkBox = await this.checkBox();
    const signUpBtn = await this.signUpBtn();

    expect(emailInput).toHaveAttribute('placeholder', 'Email');
    expect(passwordInput).toHaveAttribute('placeholder', 'Пароль');
    expect(addressInput).toHaveAttribute('placeholder', 'Невский проспект, 12');
    expect(cityInput).not.toHaveAttribute('placeholder');
    expect(countryInput).toHaveValue('');
    expect(checkBox).not.toBeChecked();
    expect(signUpBtn).toBeVisible();
    expect(signUpBtn).toBeEnabled();
  }

  async submitForm() {
    const signUpBtn = await this.signUpBtn();
    await this.user.click(signUpBtn);
  }

  async registerUser(data) {
    await this.fillForm(data);
    await this.submitForm();
  }

  async checkTableIsVisible() {
    const table = await this.getRegistrationTable();
    expect(table).toBeVisible();
  }

  async checkBackBtnIsVisible() {
    const backBtn = await this.getBackBtn();
    expect(backBtn).toBeVisible();
    expect(backBtn).toBeEnabled();
  }

  convertKeyToLabel(key) {
    const labels = {
      email: 'Email',
      password: 'Пароль',
      address: 'Адрес',
      city: 'Город',
      country: 'Страна',
      rulesCheckBox: 'Принять правила',
    };
    return labels[key];
  }

  async checkTablecontent(data) {
    const table = await this.getRegistrationTable();
    const rows = table.querySelectorAll('tr');

    const expectedData = Object.entries(data).map(([key, value]) => {
      return [this.convertKeyToLabel(key), value.toString()];
    });

    expect(rows).toHaveLength(expectedData.length);

    expectedData.forEach((item, index) => {
      const row = rows[index];
      expect(row.cells[0]).toHaveTextContent(item[0]);
      expect(row.cells[1]).toHaveTextContent(item[1]);
    });
  }
}

export default AppPage;
