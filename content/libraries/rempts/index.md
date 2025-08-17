---
title: "@reliverse/rempts"
description: "@reliverse/rempts is the ultimate type-safe, crash-resilient, and developer-friendly library for building stunning, interactive command-line interfaces (CLIs)."
---

[**Docs**](.github/DOCS.md) | [**npmjs.com**](https://npmjs.com/package/@reliverse/rempts) | [**GitHub**](https://github.com/reliverse/rempts) | [**Discord**](https://discord.gg/Pb8uKbwpsJ)

<p align="left">
  <a href="https://npmjs.org/package/@reliverse/rempts">
    <img src="https://img.shields.io/npm/v/@reliverse/rempts.svg" alt="version" />
  </a>
  <!-- <a href="https://github.com/reliverse/rempts/actions/workflows/test.yml">
    <img src="https://github.com/reliverse/rempts/actions/workflows/test.yml/badge.svg" alt="test" />
  </a> -->
  <a href="https://npmjs.org/package/@reliverse/rempts">
    <img src="https://img.shields.io/npm/dm/@reliverse/rempts.svg" alt="downloads" />
  </a>
  <!-- <a href="https://licenses.dev/npm/@reliverse/rempts">
    <img src="https://licenses.dev/b/npm/@reliverse/rempts" alt="licenses" />
  </a> -->
  <!---
   <a href="https://packagephobia.now.sh/result?p=@reliverse/rempts">
    <img src="https://packagephobia.now.sh/badge?p=@reliverse/rempts" alt="install size" />
  </a>
  --->
</p>

@reliverse/rempts is a powerful library that enables seamless, type-safe, and resilient prompts for command-line applications. Crafted with simplicity and elegance, it provides developers with an intuitive and robust way to build interactive CLIs.

@reliverse/rempts is a full-featured alternative to @inquirer/prompts (Inquirer.js), enquirer, @clack/prompts, terkelg prompts, cronvel terminal-kit, unjs consola, and similar libraries.

## Installation

Install with your preferred package manager:

```sh
bun add @reliverse/prompts # Replace 'bun' with npm, pnpm, or yarn if desired (deno and jsr support coming soon)
```

## Screenshot

<!-- [![CLI Example](../../../../assets/prompts.png)](prompts.png) -->

## Key Features

- **Type Safety**: Built with TypeScript, ensuring strong typing to prevent runtime errors.
- **Schema Validation**: Validates user inputs using schemas for enhanced reliability.
- **Flexible Prompt Types**: Supports a range of prompt types, including text, password, number, select, and multiselect.
- **Crash Resilience**: Designed to handle cancellations and errors gracefully, ensuring stability.

## Prompt Types

Each type has its own validation and display logic. More types are planned for future releases.

- **Text**: Collects text input.
- **Password**: Hidden input for secure password entries.
- **Number**: Numeric input with optional validation.
- **Confirm**: Simple Yes/No prompt.
- **Select**: Dropdown selection for multiple choices.
- **Multiselect**: Allows users to select multiple items from a list.

## Input Validation

All prompts support custom validation logic, providing immediate feedback to users.

## Contributing

@reliverse/prompts is a work in progress. I welcome feedback and contributions to help make it the best library it can be. Thank you!

Here is how to install the library for development:

```sh
git clone https://github.com/reliverse/prompts.git
cd prompts
bun i
```

## Playground

Run `bun dev` to launch the [examples/launcher.ts](./examples/launcher.ts) CLI, which helps you to dive into and explore any of the examples listed below. Experiment with @reliverse/prompts by running examples locally or reviewing the linked code:

1. **[1-main.ts](./examples/1-main.ts)**: A comprehensive example of a CLI application featuring a well styled UI config. This example showcases all available prompt components, with code organized into separate functions and files for better readability and clarity.
2. **[2-mono.ts](./examples/2-mono.ts)**: A quiz game example inspired by Fireship's video about CLIs. It demonstrates the dynamic capabilities of @reliverse/prompts by using a prompt() that includes all prompt components, so you don't need to import each component separately.
3. **[3-simple.ts](./examples/3-simple.ts)**: A simple example highlighting the core functionalities of @reliverse/prompts. The entire implementation is contained within a single file for easy understanding.
4. **[4-args-a.ts](./examples/4-args-a.ts)**: An example of how to run commands using arguments.
5. **[5-args-b.ts](./examples/5-args-b.ts)**: Another example of how to run commands using arguments.

## Extendable Configuration

**Example Configuration:**

```typescript
const basicConfig = {
  titleColor: "cyanBright",
  titleTypography: "bold",
  borderColor: "dim",
} satisfies PromptOptions;

const extendedConfig = {
  ...basicConfig,
  contentTypography: "italic",
  contentColor: "dim",
} satisfies PromptOptions;

const username = await inputPrompt({
  id: "username",
  title: "We're glad you're testing my library!",
  content: "Let's get to know each other!\nWhat's your username?",
  schema: schema.properties.username,
  ...extendedConfig,
});
```

## Mono Component

The Mono Component is a special component that includes all other components. It's a great way to get started quickly or to see how all the components work together.

This component requires providing prompt id. To have typesafety use something like the following:

```ts
export const IDs = {
  start: "start",
  username: "username",
  dir: "dir",
  spinner: "spinner",
  password: "password",
  age: "age",
  lang: "lang",
  color: "color",
  birthday: "birthday",
  features: "features",
};
```

## Task Management

> The library provides a powerful task management system that allows you to create, track, and manage asynchronous tasks with progress indicators, priorities, and nested subtasks:

```ts
import { task } from "@reliverse/prompts";

// Simple success/error task with automatic verification
const result = await task(
  "Check answer", 
  async ({ setError }) => {
    const isCorrect = answer === "correct";
    
    if (!isCorrect) {
      setError(new Error("Wrong answer!")); // Shows error in red
      return false;
    }
    
    return "Great job!"; // Shows as success message
  },
  "normal",
  {
    displayType: "spinner",    // "spinner" | "progress"
    verificationSteps: 5,      // Number of verification steps to show
    stepDelay: 400,           // Delay between steps in ms
    initialDelay: 500,        // Initial delay before starting
    exitProcessOnError: true,  // Exit process on error (default: true)
  }
);

// Handle task result
if (result.result === false) {
  process.exit(1);
}

// Progress tracking task
await task(
  "Download files", 
  async ({ setProgress, setStatus }) => {
    setStatus("Downloading...");
    for (let i = 0; i < 100; i++) {
      setProgress({ 
        current: i + 1, 
        total: 100, 
        message: `File ${i + 1}/100` 
      });
      await someWork();
    }
  },
  "normal",
  { displayType: "progress" }
);

// Group tasks with priorities
await task.group(create => [
  create("Critical task", async () => { /* ... */ }, "critical"),
  create("Normal task", async () => { /* ... */ }, "normal"),
  create("Low priority", async () => { /* ... */ }, "low")
]);

// Custom validation with error handling
const result = await task(
  "Validate data",
  async ({ setError, setStatus }) => {
    try {
      // Custom validation logic
      const validateData = (data: string) => {
        // Your validation here
        return data === "valid";
      };

      const isValid = validateData(data);
      
      if (!isValid) {
        setError(new Error("Invalid data"));
        return false;
      }

      return "Data validated successfully!";
    } catch (err) {
      setError(new Error(`Validation failed: ${err.message}`));
      return false;
    }
  }
);

// With exitProcessOnError: false, you can handle errors manually
const result = await task(
  "Check data", 
  async ({ setError }) => {
    const isValid = validateData();
    
    if (!isValid) {
      setError(new Error("Invalid data"));
      return false;
    }
    return "Data is valid!";
  },
  "normal",
  { exitProcessOnError: false }
);

// Handle error manually
if (result.result === false) {
  // Custom error handling...
  await cleanup();
  process.exit(1);
}
```

**Perks**:

- **Progress bars that actually move**: Progress tracking with current/total counts and status messages
- **Task priorities (because some stuff is more important)**: Critical, high, normal, low
- **Built-in stats, error handling, and cancellation**: Task timing and statistics, built-in error handling and cancellation support
- **Customizable spinners to keep your eyes happy**: Customizable spinners and progress indicators
- **Nested subtasks and task groups**: Group tasks and subtasks for better organization

## Non-Interactive Mode 101

**TL;DR**: The awesome thing for script wizards who can’t rely on a TTY, and especially for CI/CD. Library will generate a `prompts.json` when your user runs your CLI in non-interactive mode, fill it, and carry on.  

### 1. Interactive Prompts with Non-Interactive Fallback

```ts
import { inputPrompt, NonInteractiveError } from "@reliverse/prompts";

try {
  const username = await inputPrompt({
    title: "What's your name?",
    nonInteractive: true,
  });
} catch (error) {
  if (error instanceof NonInteractiveError) {
    console.log("prompts.json generated. Fill it out and rerun the CLI!");
  }
}
```

### 2. Non-Interactive Commands

```ts
import { createMain, NonInteractiveError } from "@reliverse/prompts";

const main = createMain({
  meta: {
    name: "mycli",
    version: "1.0.0",
    description: "My awesome CLI",
  },
  args: {
    name: { type: "string", description: "Your name" },
    age: { type: "number", description: "Your age" },
  },
  run({ args }) {
    console.log(`Hey ${args.name}, you are ${args.age} years old!`);
  },
});

try {
  await main({ nonInteractive: true });
} catch (error) {
  if (error instanceof NonInteractiveError) {
    console.log("prompts.json generated. Edit it and rerun!");
  }
}
```

### 3. Going Custom

```ts
import { createMain } from "@reliverse/prompts";
import fs from "node:fs/promises";

const main = createMain({ /* ... CLI config ... */ });

await main({
  nonInteractive: true,
  nonInteractiveAction: {
    promptsJson: {
      type: "prompts",
      message: "Custom message here",
      command: { /* ...custom data... */ }
    },
    onNonInteractive: async (json) => {
      await fs.writeFile("./config/prompts.json", JSON.stringify(json, null, 2));
      console.log("Saved at ./config/prompts.json");
    }
  }
});
```

### 4. Reading Existing Prompts

```ts
import fs from "node:fs/promises";

const main = createMain({ /* ... */ });
const existingPrompts = JSON.parse(await fs.readFile("./prompts.json", "utf-8"));

await main({
  nonInteractive: true,
  nonInteractiveAction: {
    promptsJson: existingPrompts,
    onNonInteractive: async (json) => {
      console.log(`Running with saved config`, json);
    }
  }
});
```

**In short**: If `nonInteractiveAction` is set, I do your custom routine. If not, I spit out `prompts.json` and bail. Perfect!

## Prompts Library Comparison

> **Note:** This table contains approximate and placeholder values. More detailed assessments will be provided as libraries continue to evolve.

The mission of @reliverse/prompts is to achieve the 🟢 in all categories.

**Icon Legend:**

- 🟡: Not yet verified
- 🟢: Fully supported
- 🔵: Partially supported
- 🔴: Not supported

| **Feature**                                              | **@reliverse/prompts**                                         | **@inquirer/prompts**                      | **@enquirer/enquirer** | **@clack/prompts** | **@terkelg/prompts** | **@cronvel/terminal-kit** | **@unjs/citty** | **@unjs/consola**  | **@chjj/blessed** |
| -------------------------------------------------------- | -------------------------------------------------------------- | ------------------------------------------ | ---------------------- | ------------------ | -------------------- | ------------------------- | --------------- | ------------------ | ----------------- |
| - Full ES Modules Support                                | 🟢 Native ES module package                                    | 🟢                                        | 🟡                     | 🟡                 | 🔴 CJS-only          | 🔴 CJS-only             | 🟢              | 🟢                | 🟡                |
| - Works both in node, bun, and deno environments         | 🔵 node+bun (deno support is coming soon)                      | 🟡                                        | 🟡                     | 🟡                 | 🟡                   | 🟡                      | 🔵              | 🔵                | 🟡                |
| - Codebase typesafety with intellisense                  | 🔵                                                             | 🟡                                        | 🟡                     | 🟡                 | 🟡                   | 🟡                      | 🟡              | 🟡                | 🟡                |
| - Runtime typesafety with schema validation              | 🟢 TypeBox & Custom                                            | 🟡                                        | 🟡                     | 🟡                 | 🟡                   | 🟡                      | 🟡              | 🟡                | 🟡                |
| - Usage Examples                                         | 🟢                                                             | 🟡                                        | 🟡                     | 🟡                 | 🟡                   | 🟡                      | 🟡              | 🟡                | 🟡                |
| - Customization                                          | 🟢 Colors, typography, variants, borders, and more             | 🟡                                        | 🟡                     | 🟡                 | 🟡                   | 🟡                      | 🟡              | 🟡                | 🟡                |
| - Custom Validation                                      | 🔵                                                             | 🟡                                        | 🟡                     | 🟡                 | 🟡                   | 🟡                      | 🟡              | 🟡                | 🟡                |
| - Error Handling                                         | 🔵                                                             | 🟡                                        | 🟡                     | 🟡                 | 🟡                   | 🟡                      | 🟡              | 🟡                | 🟡                |
| - Ease of Setup                                          | 🔵                                                             | 🟡                                        | 🟡                     | 🟡                 | 🟡                   | 🟡                      | 🟡              | 🟡                | 🟡                |
| - Crash Resilience                                       | 🔵                                                             | 🟡                                        | 🟡                     | 🟡                 | 🟡                   | 🟡                      | 🟡              | 🟡                | 🟡                |
| - General DX                                             | 🔵 Clean and understandable TypeScript code                    | 🟡                                        | 🟡                     | 🟡                 | 🔴 JS-only           | 🔴 JS-only              | 🟡              | 🟡                | 🟡                |
| - DX: Classes                                            | 🟢 Minimal number of classes as possible                       | 🟡                                        | 🟡                     | 🟡                 | 🟡                   | 🟡                      | 🟡              | 🟡                | 🟡                |
| - Documentation                                          | 🔵                                                             | 🟡                                        | 🟡                     | 🟡                 | 🔵                   | 🟢                      | 🟡              | 🟡                | 🟢                |
| - Extendable APIs                                        | 🟢 Works well with @reliverse/relinka                          | 🟢 Huge number of community prompts       | 🟡                     | 🟡                 | 🟡                   | 🟡                      | 🟡              | 🟡                | 🟡                |
| - Designed With UX/DX in Mind                            | 🟢                                                             | 🟡                                        | 🟡                     | 🟡                 | 🟡                   | 🟡                      | 🟡              | 🟡                | 🟡                |
| - All components support Ctrl+C                          | 🔵                                                             | 🟡                                        | 🟡                     | 🟡                 | 🟡                   | 🟡                      | 🟡              | 🟡                | 🟡                |
| - As minimal number of dependencies as possible          | 🔵                                                             | 🟢                                        | 🟡                     | 🟡                 | 🟡                   | 🟡                      | 🟡              | 🟡                | 🟡                |
| **Components**                                           |                                                                |                                            |                        |                    |                      |                           |                 |                    |                   |
| - Visual Components                                      | 🟢 Animated Text (incl. 6 anims) & ASCII Art (incl. 290 fonts) | 🟡                                        | 🟡                     | 🟡                 | 🟡                   | 🟡                      | 🟡              | 🟡                | 🟡                |
| - Mono Component                                         | 🟢 Mono (All-In-One) & Separate                                | 🟡                                        | 🟡                     | 🟡                 | 🔵 Mono-only         | 🟡                      | 🟡              | 🟡                | 🟡                |
| - Start Component                                        | 🟢                                                             | 🟡                                        | 🟡                     | 🟡                 | 🟡                   | 🟡                      | 🟡              | 🟡                | 🟡                |
| - Text Component                                         | 🟢                                                             | 🟡                                        | 🟡                     | 🟡                 | 🟡                   | 🟡                      | 🟡              | 🟡                | 🟡                |
| - Password Component                                     | 🔵                                                             | 🟡                                        | 🟡                     | 🟡                 | 🟡                   | 🟡                      | 🟡              | 🟡                | 🟡                |
| - Number Component                                       | 🔵                                                             | 🟡                                        | 🟡                     | 🟡                 | 🟡                   | 🟡                      | 🟡              | 🟡                | 🟡                |
| - Confirm Component                                      | 🔵                                                             | 🟡                                        | 🟡                     | 🟡                 | 🟡                   | 🟡                      | 🟡              | 🟡                | 🟡                |
| - Select Component                                       | 🔵 Native separator support                                    | 🔵 Separator supported via `new` keyword  | 🟡                     | 🟡                 | 🟡                   | 🟡                      | 🟡              | 🟡                | 🟡                |
| - Multiselect Component                                  | 🔵 Native separator support                                    | 🔵 Separator supported via `new` keyword  | 🟡                     | 🟡                 | 🟡                   | 🟡                      | 🟡              | 🟡                | 🟡                |
| - Search/Autocomplete Component                          | 🔵                                                             | 🟡                                        | 🟡                     | 🟡                 | 🟡                   | 🟡                      | 🟡              | 🟡                | 🟡                |
| - Task/Spinner & Progressbar Components                  | 🔵                                                             | 🟡                                        | 🟡                     | 🟡                 | 🟡                   | 🟢                      | 🟡              | 🟡                | 🟡                |
| - Image Component                                        | 🔴 Planned                                                     | 🟡                                        | 🟡                     | 🟡                 | 🟡                   | 🟢                      | 🟡              | 🟡                | 🟡                |
| - Range Component                                        | 🔵                                                             | 🟡                                        | 🟡                     | 🟡                 | 🟡                   | 🟢                      | 🟡              | 🟡                | 🟡                |
| **Arguments Support**                                    |                                                                |                                            |                        |                    |                      |                           |                 |                    |                   |
| - Fast and lightweight argument parser                   | 🟢                                                             | 🟡                                        | 🟡                     | 🟡                 | 🟡                   | 🟡                      | 🟢              | 🟡                | 🟡                |
| - Smart value parsing with typecast                      | 🟢                                                             | 🟡                                        | 🟡                     | 🟡                 | 🟡                   | 🟡                      | 🟢              | 🟡                | 🟡                |
| - Boolean shortcuts and unknown flag handling            | 🟢                                                             | 🟡                                        | 🟡                     | 🟡                 | 🟡                   | 🟡                      | 🟢              | 🟡                | 🟡                |
| - Nested sub-commands                                    | 🟢                                                             | 🟡                                        | 🟡                     | 🟡                 | 🟡                   | 🟡                      | 🟢              | 🟡                | 🟡                |
| - Lazy and Async commands                                | 🟢                                                             | 🟡                                        | 🟡                     | 🟡                 | 🟡                   | 🟡                      | 🟢              | 🟡                | 🟡                |
| - Pluggable and composable API                           | 🟢                                                             | 🟡                                        | 🟡                     | 🟡                 | 🟡                   | 🟡                      | 🟢              | 🟡                | 🟡                |
| - Auto generated usage and help                          | 🟢                                                             | 🟡                                        | 🟡                     | 🟡                 | 🟡                   | 🟡                      | 🟢              | 🟡                | 🟡                |

**Related Links**: [@reliverse/relinka](https://github.com/reliverse/relinka#readme), [ESM/CJS](https://dev.to/iggredible/what-the-heck-are-cjs-amd-umd-and-esm-ikm), ["Pure ESM package"](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c), [Clean code](https://github.com/ryanmcdermott/clean-code-javascript#readme), ["UX patterns for CLI tools"](https://lucasfcosta.com/2022/06/01/ux-patterns-cli-tools.html), [DX (Developer Experience)](https://github.blog/enterprise-software/collaboration/developer-experience-what-is-it-and-why-should-you-care), [TypeBox](https://github.com/sinclairzx81/typebox#readme), ["ANSI Escape Sequences"](https://gist.github.com/ConnerWill/d4b6c776b509add763e17f9f113fd25b), [@chjj/blessed](https://github.com/chjj/blessed#readme), [Wrapping](https://github.com/SBoudrias/Inquirer.js/pull/255), [Visual Control](https://stackoverflow.com/questions/68344362/how-do-i-get-full-visual-control-of-a-terminal-with-node)

## CLI Best Practices

@reliverse/prompts follows the following best practices (legend: 🟢 - fully supported, 🔵 - partially supported, 🔴 - not supported, 🟡 - not yet verified):

- 🟡 [Respect POSIX args](./prompts-cc/cli-best-practices#11-respect-posix-args)
- 🟡 [Build empathic CLIs](./prompts-cc/cli-best-practices#12-build-empathic-clis)
- 🟡 [Stateful data](./prompts-cc/cli-best-practices#13-stateful-data)
- 🟡 [Provide a colorful experience](./prompts-cc/cli-best-practices#14-provide-a-colorful-experience)
- 🟡 [Rich interactions](./prompts-cc/cli-best-practices#15-rich-interactions)
- 🟡 [Hyperlinks everywhere](./prompts-cc/cli-best-practices#16-hyperlinks-everywhere)
- 🟡 [Zero configuration](./prompts-cc/cli-best-practices#17-zero-configuration)
- 🟡 [Respect POSIX signals](./prompts-cc/cli-best-practices#18-respect-posix-signals)
- 🟡 [Prefer a small dependency footprint](./prompts-cc/cli-best-practices#21-prefer-a-small-dependency-footprint)
- 🟡 [Use the shrinkwrap, Luke](./prompts-cc/cli-best-practices#22-use-the-shrinkwrap-luke)
- 🟡 [Cleanup configuration files](./prompts-cc/cli-best-practices#23-cleanup-configuration-files)
- 🟡 [Accept input as STDIN](./prompts-cc/cli-best-practices#31-accept-input-as-stdin)
- 🟡 [Enable structured output](./prompts-cc/cli-best-practices#32-enable-structured-output)
- 🟡 [Cross-platform etiquette](./prompts-cc/cli-best-practices#33-cross-platform-etiquette)
- 🟡 [Support configuration precedence](./prompts-cc/cli-best-practices#34-support-configuration-precedence)
- 🟡 [Containerize the CLI](./prompts-cc/cli-best-practices#41-containerize-the-cli)
- 🟡 [Graceful degradation](./prompts-cc/cli-best-practices#42-graceful-degradation)
- 🟡 [Node.js versions compatibility](./prompts-cc/cli-best-practices#43-nodejs-versions-compatibility)
- 🟡 [Shebang autodetect the Node.js runtime](./prompts-cc/cli-best-practices#44-shebang-autodetect-the-nodejs-runtime)
- 🟡 [Put no trust in locales](./prompts-cc/cli-best-practices#51-put-no-trust-in-locales)
- 🟡 [Trackable errors](./prompts-cc/cli-best-practices#61-trackable-errors)
- 🟡 [Actionable errors](./prompts-cc/cli-best-practices#62-actionable-errors)
- 🟡 [Provide debug mode](./prompts-cc/cli-best-practices#63-provide-debug-mode)
- 🟡 [Proper use of exit codes](./prompts-cc/cli-best-practices#64-proper-use-of-exit-codes)
- 🟡 [Effortless bug reports](./prompts-cc/cli-best-practices#65-effortless-bug-reports)
- 🟡 [Use a bin object](./prompts-cc/cli-best-practices#71-use-a-bin-object)
- 🟡 [Use relative paths](./prompts-cc/cli-best-practices#72-use-relative-paths)
- 🟡 [Use the files field](./prompts-cc/cli-best-practices#73-use-the-files-field)
- 🟡 [Strict Opt-in Analytics](./prompts-cc/cli-best-practices#81-strict-opt-in-analytics)
- 🟡 [Include a --version Flag](./prompts-cc/cli-best-practices#91-include-a---version-flag)
- 🟡 [Use Semantic Versioning](./prompts-cc/cli-best-practices#92-use-semantic-versioning)
- 🟡 [Provide Version Information in a 'package.json' file](./prompts-cc/cli-best-practices#93-provide-version-information-in-a-packagejson-file)
- 🟡 [Display Version in Error Messages and Help Text](./prompts-cc/cli-best-practices#94-display-version-in-error-messages-and-help-text)
- 🟡 [Backward Compatibility](./prompts-cc/cli-best-practices#95-backward-compatibility)
- 🟡 [Publish Versioned Releases on npm](./prompts-cc/cli-best-practices#96-publish-versioned-releases-on-npm)
- 🟡 [Update Your App's Version Documents](./prompts-cc/cli-best-practices#97-update-your-apps-version-documents)
- 🟡 [Minimize Argument Injection](./prompts-cc/cli-best-practices#101-minimize-argument-injection)

## Wrap-Up

@reliverse/prompts is a versatile library designed to accelerate CLI development by providing customizable prompt components. Integrated into the [Reliverse CLI](https://github.com/blefnk/reliverse#readme), @reliverse/prompts enables you to create a unique design aligned with your CLI app’s aesthetics, similar to how @shadcn/ui supports customizable web UI components. Quickly get started by copying configurations from the [Reliverse Docs](https://docs.reliverse.org/prompts) and using components that fit your project, making it faster to bring your CLI app to life. You’re free to customize each component as desired, with default designs provided to ensure an attractive interface from the start.

## Learn More

- [Temporary @reliverse/prompts Docs](.github/DOCS.md)
- [Reliverse Docs](https://docs.reliverse.org)

## Special Thanks

This project wouldn’t exist without the amazing work of the huge number of contributors to the list of projects below. Many of the @reliverse/prompts prompts are based on the incredible work of:

[@inquirer/prompts](https://github.com/SBoudrias/Inquirer.js#readme) | [terkelg/prompts](https://github.com/terkelg/prompts#readme) | [@clack/prompts](https://github.com/bombshell-dev/clack#readme) | [create-t3-app](https://github.com/t3-oss/create-t3-app#readme) | [create-astro](https://github.com/withastro/astro/tree/main/packages/create-astro#readme) | [cronvel/terminal-kit](https://github.com/cronvel/terminal-kit#readme) | [unjs/consola](https://github.com/unjs/consola#readme) | [nodejs/string_decoder](https://github.com/nodejs/string_decoder) | [TooTallNate/keypress](https://github.com/TooTallNate/keypress) | [derhuerst](https://github.com/derhuerst)

## License

[MIT](./LICENSE.md) © [Nazarii Korniienko](https://github.com/blefnk)
