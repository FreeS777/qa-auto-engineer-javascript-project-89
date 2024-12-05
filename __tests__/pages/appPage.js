import userEvent from '@testing-library/user-event';
import { expect } from 'vitest';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import getBtn from './utils/getBtn';
import getRegistrationTable from './utils/getRegTable';

class AppPage {
  constructor() {
    this.user = userEvent.setup();
    this.getBtn = getBtn;
    this.getRegistrationTable = getRegistrationTable;
    this.emailInput = screen.getByLabelText('Email');
    this.passwordInput = screen.getByLabelText('Пароль');
    this.addressInput = screen.getByLabelText('Адрес');
    this.cityInput = screen.getByLabelText('Город');
    this.countryInput = screen.getByLabelText('Страна');
    this.checkBox = screen.getByLabelText('Принять правила');
    this.buttons = {
      signUpBtn: { name: 'Зарегистрироваться' },
      backBtn: { name: 'Назад' },
    }
  }

  async fillForm({
    email,
    password,
    address,
    city,
    country,
    rulesCheckBox
  }) {
    const emailInput = this.emailInput;
    const passwordInput = this.passwordInput;
    const addressInput = this.addressInput;
    const cityInput = this.cityInput;
    const countryInput = this.countryInput;
    const checkBox = this.checkBox;

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
    const emailInput = this.emailInput;
    const passwordInput = this.passwordInput;
    const addressInput = this.addressInput;
    const cityInput = this.cityInput;
    const countryInput = this.countryInput;
    const checkBox = this.checkBox;
    const signUpBtn = await this.getBtn(this.buttons.signUpBtn);

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
    const signUpBtn = await this.getBtn(this.buttons.signUpBtn);
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
    const backBtn = await this.getBtn(this.buttons.backBtn);
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
  
    const expectedData = Object.entries(data).map(([key, value]) => [
      this.convertKeyToLabel(key),
      value.toString()
    ]);
  
    expect(rows).toHaveLength(expectedData.length);
  
    expectedData.forEach((item, index) => {
      const row = rows[index];
      expect(row.cells[0]).toHaveTextContent(item[0]);
      expect(row.cells[1]).toHaveTextContent(item[1]);
    });
  }
  
}

export default AppPage;
