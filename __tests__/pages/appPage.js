import userEvent from "@testing-library/user-event";
import { expect } from "vitest";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";

export class AppPage {
  constructor() {
    this.user = userEvent.setup();
    this.emailInput = screen.getByLabelText("Email");
    this.passwordInput = screen.getByLabelText("Пароль");
    this.addressInput = screen.getByLabelText("Адрес");
    this.cityInput = screen.getByLabelText("Город");
    this.countryInput = screen.getByLabelText("Страна");
    this.checkBox = screen.getByLabelText("Принять правила");
    this.signUpBtn = screen.getByRole("button", {
      name: "Зарегистрироваться",
    });
  }

  get getBackBtn() {
    return screen.getByRole("button", { name: "Назад" });
  }

  get getRegistrationTable() {
    return screen.getByRole("table");
  }

  async fillForm({ email, password, address, city, country, rulesCheckBox }) {
    await this.user.type(this.emailInput, email);
    await this.user.type(this.passwordInput, password);
    await this.user.type(this.addressInput, address);
    await this.user.type(this.cityInput, city);
    await this.user.selectOptions(this.countryInput, country);
    if (rulesCheckBox === true) {
      await this.user.click(this.checkBox);
    }
  }
  checkAppRender() {
    expect(this.emailInput).toHaveAttribute("placeholder", "Email");
    expect(this.passwordInput).toHaveAttribute("placeholder", "Пароль");
    expect(this.addressInput).toHaveAttribute(
      "placeholder",
      "Невский проспект, 12"
    );
    expect(this.cityInput).not.toHaveAttribute("placeholder");
    expect(this.countryInput).toHaveValue("");
    expect(this.checkBox).not.toBeChecked();
    expect(this.signUpBtn).toBeVisible();
    expect(this.signUpBtn).toBeEnabled();
  }

  async submitForm() {
    await this.user.click(this.signUpBtn);
  }

  async registerUser(data) {
    await this.fillForm(data);
    await this.submitForm();
  }

  checkTableIsVisible() {
    expect(screen.getByRole("table")).toBeVisible();
  }

  checkBackBtnIsVisible() {
    expect(this.getBackBtn).toBeVisible();
    expect(this.getBackBtn).toBeEnabled();
  }

  convertKeyToLabel(key) {
    const labels = {
      email: "Email",
      password: "Пароль",
      address: "Адрес",
      city: "Город",
      country: "Страна",
      rulesCheckBox: "Принять правила",
    };
    return labels[key];
  }
  checkTablecontent(data) {
    const table = this.getRegistrationTable;
    const rows = table.querySelectorAll("tr");

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
