import { PlaywrightFluent } from "playwright-fluent";
import fs from "fs";
import path from "path";
import cron from "node-cron";

// Constants
const COOKIE_FILE_PATH = path.join(__dirname, "./cookie.json");
const CHAT_URL = "https://chat.openai.com/";

class OpenAIChatBot {
  p: PlaywrightFluent;
  questionIndex: number;
  questions: string[];
  constructor() {
    this.p = new PlaywrightFluent();
    this.questionIndex = 0;
    // put your questions here
    this.questions = ["question 1", "question 2", "question 3"];
  }

  async init() {
    const cookies = this._loadCookies();
    await this._initializeBrowser(cookies);
    this._scheduleQuestions();
  }

  _loadCookies() {
    const data = fs.readFileSync(COOKIE_FILE_PATH, "utf8");
    return JSON.parse(data);
  }

  async _initializeBrowser(cookies: any) {
    await this.p
      .withBrowser("chromium")
      .withOptions({ headless: false })
      .withStorageState({ cookies, origins: [] })
      .withCursor()
      .navigateTo(CHAT_URL)
      .wait(5000);
  }

  _scheduleQuestions() {
    cron.schedule("*/5 * * * *", async () => {
      if (this.questionIndex < this.questions.length) {
        await this._askQuestion(this.questions[this.questionIndex]);
        this.questionIndex++;
      } else {
        console.log("All questions asked.");
      }
    });
  }

  async _askQuestion(question: string) {
    await this.p
      .selector("div#__next > div > div > div > div > div > nav > div > a")
      .click()
      .then(async () => {
        await this.p
          .click("#prompt-textarea")
          .typeText(question)
          .wait(1000)
          .click(
            "div#__next > div > div:nth-of-type(2) > main > div > div:nth-of-type(2) > form > div > div:nth-of-type(2) > div > button"
          )
          .wait(7000);
        console.log(`Question ${this.questionIndex + 1} asked.`);
      });
  }
}

// Execution
(async () => {
  const chatBot = new OpenAIChatBot();
  await chatBot.init();
})();
