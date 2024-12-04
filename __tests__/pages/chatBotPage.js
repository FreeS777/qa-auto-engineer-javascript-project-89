import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import { expect } from 'vitest';
import { validSteps } from '../../__fixtures__/steps';
import '@testing-library/jest-dom';

class ChatBotPage {
  constructor() {
    this.user = userEvent.setup();
    this.steps = validSteps;
  }

  async clickNextStep(step) {
    await waitFor(async () => {
      await this.user.click(screen.getByText(step));
    });
  }

  async openChat() {
    await waitFor(async () => {
      await this.user.click(screen.getByRole('button', { name: 'Открыть Чат' }));
    });
  }

  async closeChat() {
    await waitFor(async () => {
      await this.user.click(screen.getByRole('button', { name: 'Close' }));
    });
  }

  async checkChatBotRender() {
    expect(screen.getByRole('button', { name: 'Открыть Чат' })).toBeVisible();
  }

  async checkConversationStartBtnVisible() {
    expect(screen.getByRole('button', { name: 'Начать разговор' })).toBeVisible();
  }

  async checkStartBlockRendered() {
    const button = screen.getByRole('button', {
      name: 'Сменить профессию или трудоустроиться',
    });
    expect(button).toBeVisible();
    expect(screen.getByRole('button', { name: 'Попробовать себя в IT' }));
    expect(
      screen.getByRole('button', {
        name: 'Я разработчик, хочу углубить свои знания',
      }),
    );
    expect(screen.getByText(/помогу вам выбрать.*/i)).toBeVisible();
  }

  async checkSwitchBlockRendered() {
    const button = screen.getByRole('button', { name: 'Расскажи подробнее' });
    expect(button).toBeVisible();
    expect(screen.getByRole('button', { name: 'А есть что-нибудь попроще' }));
    expect(
      screen.getByRole('button', {
        name: 'Вернуться в начало',
      }),
    );
    expect(screen.getByText(/у нас есть программы.*/i)).toBeVisible();
  }

  async checkDetailsBlockRendered() {
    const button = screen.getByRole('button', {
      name: 'Останусь здесь, запишусь на курс',
    });
    expect(button).toBeVisible();
    expect(
      screen.getByRole('button', {
        name: 'Вернуться в начало',
      }),
    );
    expect(screen.getByText(/в Хекслете можно.*/i)).toBeVisible();
  }

  async checkSubscribeBlockRendered() {
    const button = screen.getByRole('button', {
      name: 'Останусь здесь, запишусь на курс',
    });
    expect(button).toBeVisible();
    expect(
      screen.getByRole('button', {
        name: 'Верни меня в начало',
      })
    );
    expect(screen.getByText(/ага, дублирую ссылку.*/i)).toBeVisible();
  }

  async checkEmptyStepsBlockRendered() {
    const message = screen.queryByText(/Привет!.*/i);
    const button = screen.queryByRole('button', {
      name: 'Начать разговор',
    });
    expect(message).not.toBeInTheDocument();
    expect(button).not.toBeInTheDocument();
  }

  async checkEmptyMessagesBlockRendered() {
    const message = screen.queryByText(/Привет!.*/i);
    const button = screen.queryByRole('button', {
      name: 'Начать разговор',
    });
    expect(message).not.toBeInTheDocument();
    expect(button).toBeVisible();
  }

  async checkEmptyButtonsBlockRendered() {
    const message = screen.queryByText(/Привет!.*/i);
    const button = screen.queryByRole('button', {
      name: 'Начать разговор',
    });
    expect(message).toBeVisible();
    expect(button).not.toBeInTheDocument();
  }
}

export default ChatBotPage;
