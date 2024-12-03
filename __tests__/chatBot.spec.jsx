import { beforeEach, describe, test, vi, expect } from "vitest";
import { ChatBotPage } from "./pages/chatBotPage";
import Widget from "@hexlet/chatbot-v2";
import { validSteps } from "../__fixtures__/steps";
import { emptyMessages } from "../__fixtures__/emptyMessages";
import { emptyButtons } from "../__fixtures__/emptyButtons";
import { render, waitFor } from "@testing-library/react";

describe("Chat Bot tests", () => {
  let chatBotPage;
  describe("positive tests", () => {
    beforeEach(() => {
      render(Widget(validSteps));
      chatBotPage = new ChatBotPage();
      window.HTMLElement.prototype.scrollIntoView = vi.fn();
    });

    test("chatbot render", async () => {
      await chatBotPage.checkChatBotRender();
    });
    test("opens the chat modal", async () => {
      await chatBotPage.openChat();
      await chatBotPage.checkConversationStartBtnVisible();
    });

    test("closes the chat modal", async () => {
      await chatBotPage.openChat();
      await chatBotPage.closeChat();
      await chatBotPage.checkChatBotRender();
    });
    test("shows the start block in the chat", async () => {
      await chatBotPage.openChat();
      await chatBotPage.clickNextStep(validSteps[0].buttons[0].text);
      await chatBotPage.checkStartBlockRendered();
      expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();
    });
    test("shows the switch block in the chat", async () => {
      await chatBotPage.openChat();
      await chatBotPage.clickNextStep(validSteps[0].buttons[0].text);
      await chatBotPage.clickNextStep(validSteps[1].buttons[0].text);
      await chatBotPage.checkSwitchBlockRendered();
      expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();
    });
    test("shows the details block in the chat", async () => {
      await chatBotPage.openChat();
      await chatBotPage.clickNextStep(validSteps[0].buttons[0].text);
      await chatBotPage.clickNextStep(validSteps[1].buttons[0].text);
      await chatBotPage.clickNextStep(validSteps[2].buttons[0].text);
      await chatBotPage.checkDetailsBlockRendered();
      expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();
    });
    test("shows the subscribe block in the chat", async () => {
      await chatBotPage.openChat();
      await chatBotPage.clickNextStep(validSteps[0].buttons[0].text);
      await chatBotPage.clickNextStep(validSteps[1].buttons[0].text);
      await chatBotPage.clickNextStep(validSteps[2].buttons[0].text);
      await chatBotPage.clickNextStep(validSteps[6].buttons[0].text);
      await chatBotPage.checkSubscribeBlockRendered();
      expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();
    });
  });

  describe("negative tests", () => {
    beforeEach(() => {
      chatBotPage = new ChatBotPage();
      window.HTMLElement.prototype.scrollIntoView = vi.fn();
    });
    test("shows error with invalid steps", async () => {
      await waitFor(() => {
        expect(() => render(Widget({})).toThrow());
      });
    });

    test("shows error with empty steps", async () => {
      render(Widget([]));
      await chatBotPage.openChat();
      await chatBotPage.checkEmptyStepsBlockRendered();
    });

    test("shows error with empty messages", async () => {
      render(Widget(emptyMessages));
      await chatBotPage.openChat();
      await chatBotPage.checkEmptyMessagesBlockRendered();
    });

    test("shows error with empty buttons", async () => {
      render(Widget(emptyButtons));
      await chatBotPage.openChat();
      await chatBotPage.checkEmptyButtonsBlockRendered();
    });
  });
});
