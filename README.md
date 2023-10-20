# ChatGPT-4's automation surpasses the limitation of 50 questions every 3 hours

This project utilizes Playwright in conjunction with TypeScript to automate the process of asking questions to GPT-4 every 5 minutes.

### Prerequisites

- Node.js (version 16 or higher recommended)
- Yarn or npm (for package management)

### How to use?

- First, you need to download the Chromium browser separately. Once downloaded, log in to your OpenAI account. Next, install the "Edit This Cookie" extension. After installation, export your cookies and save them to a file named "cookie.json" in the root directory.
- Please note that you should capitalize the first character in 'samesite' when setting cookies. Failing to do so will result in an error.
- For simplicity, I did not create an API for this program. Instead, you can input your questions directly into the index.ts file.

Then run

```bash
yarn dev
```

- When you visit the ChatGPT main page for the first time, click the 'OK' button.
