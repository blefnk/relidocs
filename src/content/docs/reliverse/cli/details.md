---
title: Reliverse CLI Details
description: A detailed guide to the Reliverse CLI, including the problem it solves, the solution it provides, and what it can do.
---

## **I. The Problem**

Picture this: you’re in the terminal, trying to set up a brand new Next.js app. You’re typing command by command, fine-tuning flags, editing environment files by hand, and juggling a ridiculous chain of steps just to get something that’s barely functional. You start to wonder, “Why is this so tedious? Aren’t I supposed to be _developing_ instead of typing random flags all day?”

Sound familiar? That’s the reality of many traditional project bootstrapping CLIs—they’re clunky, slow, and frustrating. But guess what? You’re not a machine that exists solely to type `npm run this`, `git push that`. You’re a developer, you’re here to build.

## **II. The Solution**

Let's rip off the band-aid. You deserve a tool that’s not just faster but smarter.
That’s why I built **Reliverse CLI**—a brand-new way to spin up, manage, and deploy your projects quickly. Because I shouldn’t have to wrestle with the command line—I should actually _enjoy_ my workflow. No more command-line headaches, no more wasted energy.

## **III. What My CLI Can Do**

- **Create a new project?** Sure. The classic “fresh start” option.
- **Clone any existing repos:** Making forks has never been so easy.
- **.env Files?** Auto-handled. No manual edits, no missing variables.
- **Database?** Fully managed. Migrations, seeds, pushes... all done.
- **Linters, formatters, updates?** Runs in the background, keeps your code clean without nagging you. Set `scriptsBehavior: autoYes` to get yolo mode.
- **Push to GitHub? Deploy to Vercel?** Bam.

### **Got an existing project?**

**Supercharge it with @reliverse/addons:**

    - **Tools & libs:** Integrate your favorites.
    - **Automatic i18n:** Because monolingual apps are boring.
    - **UI components:** Shadcn for React, Vue, or _even Svelte_—just plug and play.
    - **Database schema:** Generate it quickly for Drizzle and Prisma.
    - **Even more cool stuff:** Coming soon!

### **Btw, under the hood, it has:**

- **@reliverse/prompts** for an intuitive, user-friendly vibe.
- **@reliverse/relico** because your terminal deserves to look good too.

### **And there’s plenty more what Reliverse CLI can do:**

- **Multiple projects at once:** Because your time is gold, my friend.
- **Chat with the Assistant** – got a question? Need an idea? Brainstorm features. Get coding tips. Right in your terminal. Reliverse AI is your buddy.
- **Vercel Manager** – bulk-delete projects from Vercel (because they still don’t offer that).
- **Simple Setup:** Replace all those messy flags with one single file: `reliverse.jsonc` or `reliverse.ts`.

### **reliverse.jsonc/ts: The Central File**

This file is like the project’s heart, dictating how Reliverse CLI runs and skipping all the repetitive questions you’d otherwise get.

- **reliverse.jsonc (Recommended):** Solid, straightforward, and stable.
- **reliverse.ts (Experimental):** For those of you feeling a bit adventurous.

I constantly improving these formats—tweaking features and making your workflow smoother every step of the way.

### **More Than a CLI: A Terminal-Based Site Builder**

Reliverse CLI is no dusty, old-school command prompt. It’s a sleek site builder that chats with you and even remembers your name, thanks to **Reliverse Memory**, a specialized chatbot for coding tasks.

- **Your Name**: Because personalization matters.
- **Access Keys**: Stored securely so you’re not hunting them down every five minutes.

And that’s just the start. We’re dreaming up more ways to make your coding life easier.

---

## **IV. A New Project**

### **Installation**

Enough chitchat—let’s jump in and see what it can do.

```bash
bun i -g @reliverse/cli
```

### **Updating**

Already have it, huh? Keep things fresh:

```bash
reliverse update
```

### **Setup: Step-by-Step**

1. **Run it**:

```bash
reliverse cli
```

1. **Verify Your Device**: Head over to **reliverse.org** for a quick security check.
2. **Environment Scan**: Reliverse CLI automatically figures out your system’s setup.
3. **Custom Menu**: Built just for _you_ based on your environment.

---

## **Protecting Your Credentials**

I take security seriously. Here’s the rundown:

**.env (Classic)**
    - **Pros**: Universal and easy to set up.
    - **Cons**: Not encrypted—handle with care.
    - **Typical Use**: Currently for OpenAI keys.
**Reliverse Memory (Recommended)**
    - **Pros**: Fully encrypted, tied to your machine.
    - **Cons**: None worth mentioning.
    - **Method**: Your secrets are basically locked to your hardware—ultra safe.

Want to view or tweak your stored secrets? Just run:

```bash
reliverse studio
```

It’s your data, and you’re in control.

---

## **Want to Start Over?**

Sometimes you just need a blank slate. If so:

```bash
reliverse logout
```

Everything is wiped, so you can begin again with zero baggage.

---

## **Project Creation Example**

Let’s walk through a quick scenario:

- **Category**: Pick “Web Application” (or anything else that fits).
- **Platform**: **Next.js**—a favorite for so many reasons.
- **Type**: Maybe “Online Store & Fullstack,” if you’re aiming to sell something.
- **Template**: **“Relivator”**—a trusty starter.
- **Frontend Name**: **“blefnk”**—or any quirky name you like.
- **App Name**: Approve the default suggestion or type your own.

Then, watch Reliverse CLI do its thing:

- **Template Check**: Already on your machine? Great! If not, it fetches the latest.
- **Personalize**: Anywhere the template says “Relivator,” it swaps in your fancy new name.

---

## **API Keys & Deployment in One Go**

- Reliverse CLI only asks for what’s needed. Any sensitive input is masked.
- Already have a `.env` file? Great, just import from there.

## **Dependencies**

- Everything you need—installs, updates, linting—happens automatically in the background.

## **GitHub & Vercel: Launch It!**

1. **Create a New GitHub Repo?** Your choice.
2. **Use an Existing Repo?** Sure, or archive it if it’s time for a cleanup.
3. **GitHub Credentials**: Provide them for a smooth push.
4. **Vercel Token**: So you can deploy in seconds.
5. **IDE**: Ready to go—open your fresh project in VS Code or wherever you code happily.
6. **Website**: Check it out online immediately!

---

## **Conclusion: Take Your Development**

_Basically, it’s the next step in making development more fun. And yes, it’s available right now._

And there it is, crafted by **blefnk Nazar Kornienko**, **Reliverse CLI** is ready to empower your development process to the next Level. It's fast and powerful. Give it free you from repetitive nonsense so you can focus on the exciting parts: building something truly _awesome_.

- Got questions? Just ask!
- Feeling inspired? Drop the comment!
- Ready to level up your workflow? Go for it:

```bash
bun i -g @reliverse/cli
```

Happy Reliversing!
