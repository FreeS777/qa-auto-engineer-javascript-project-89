import userEvent from "@testing-library/user-event";
import { waitFor, screen } from "@testing-library/react";
import { expect } from "vitest";
import { validSteps } from "../../__fixtures__/steps";

export class ChatBotPage {
  constructor(screen) {
    this.user = userEvent.setup();
    this.steps = validSteps;
    this.screen = screen;
  }

  get openChatBtn() {
    return screen.getByRole("button", { name: "Открыть Чат" });
  }
  get conversationStartBtn() {
    return screen.getByRole("button", { name: "Начать разговор" });
  }
  get changeProfessionBtn() {
    return screen.getByRole("button", {
      name: "Сменить профессию или трудоустроиться",
    });
  }
  get tellMoreBtn() {
    return screen.getByRole("button", { name: "Расскажи подробнее" });
  }

  get signToCourseBtn() {
    return screen.getByRole("button", {
      name: "Останусь здесь, запишусь на курс",
    });
  }

  get closeBtn() {
    return screen.getByRole("button", {
      name: "Close",
    });
  }

  async clickNextStep(step) {
    await waitFor(async () => {
      await this.user.click(screen.getByText(step));
    });
  }
  async openChat() {
    await waitFor(async () => {
      await this.user.click(this.openChatBtn);
    });
  }

  async closeChat() {
    await waitFor(async () => {
      await this.user.click(this.closeBtn);
    });
  }
  async checkChatBotRender() {
    expect(this.openChatBtn).toBeVisible();
  }

  async checkConversationStartBtnVisible() {
    expect(this.conversationStartBtn).toBeVisible();
  }

  async checkStartBlockRendered() {
    const button = this.changeProfessionBtn;
    expect(button).toBeVisible();
    expect(screen.getByRole("button", { name: "Попробовать себя в IT" }));
    expect(
      screen.getByRole("button", {
        name: "Я разработчик, хочу углубить свои знания",
      })
    );
    expect(screen.getByText(/помогу вам выбрать.*/i)).toBeVisible();
  }

  async checkSwitchBlockRendered() {
    const button = this.tellMoreBtn;
    expect(button).toBeVisible();
    expect(screen.getByRole("button", { name: "А есть что-нибудь попроще" }));
    expect(
      screen.getByRole("button", {
        name: "Вернуться в начало",
      })
    );
    expect(screen.getByText(/у нас есть программы.*/i)).toBeVisible();
  }

  async checkDetailsBlockRendered() {
    const button = this.signToCourseBtn;
    expect(button).toBeVisible();
    expect(
      screen.getByRole("button", {
        name: "Вернуться в начало",
      })
    );
    expect(screen.getByText(/в Хекслете можно.*/i)).toBeVisible();
  }

  async checkSubscribeBlockRendered() {
    const button = this.signToCourseBtn;
    expect(button).toBeVisible();
    expect(
      screen.getByRole("button", {
        name: "Верни меня в начало",
      })
    );
    expect(screen.getByText(/ага, дублирую ссылку.*/i)).toBeVisible();
  }

  async checkEmptyStepsBlockRendered() {
    const message = screen.queryByText(/Привет!.*/i);
    const button = this.screen.queryByRole("button", {
      name: "Начать разговор",
    });
    expect(message).not.toBeInTheDocument();
    expect(button).not.toBeInTheDocument();
  }

  async checkEmptyMessagesBlockRendered() {
    const message = screen.queryByText(/Привет!.*/i);
    const button = this.screen.queryByRole("button", {
      name: "Начать разговор",
    });
    expect(message).not.toBeInTheDocument();
    expect(button).toBeVisible();
  }

  async checkEmptyButtonsBlockRendered() {
    const message = screen.queryByText(/Привет!.*/i);
    const button = this.screen.queryByRole("button", {
      name: "Начать разговор",
    });
    expect(message).toBeVisible();
    expect(button).not.toBeInTheDocument();
  }
}
