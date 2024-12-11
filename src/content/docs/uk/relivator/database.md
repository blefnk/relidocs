---
title: Database
description: This is the database of Relivator.
---

Relivator використовує [Drizzle ORM](https://orm.drizzle.team) для керування базами даних. За замовчуванням проект використовує [Neon](https://neon.tech) (безсерверний) з [PostgreSQL](https://neon.tech/docs/postgresql/introduction) у якості постачальника бази даних. Проект вже дотримується [Drizzle's guide](https://orm.drizzle.team/learn/tutorials/drizzle-with-neon) про те, як налаштувати Drizzle з Neon Postgres.

**4 серпня 2024 року: гаряче оновлення**:

Якщо ви використовуєте `neon` як постачальника баз даних, вам більше не потрібен `bun db:studio`; просто використовуйте Drizzle Studio на [веб-сайті Neon](https://neon.tech) 🎉

Для баз даних для розробки без важливих даних ви можете використовувати `bun db:push`. Для виробничих баз даних, що містять важливі дані, рекомендується використовувати `bun db:generate`, а потім `bun db:migrate`.

> Drizzle Kit дозволяє змінювати схему бази даних і швидко переносити дані за допомогою команди [bun db:push](https://orm.drizzle.team/kit-docs/overview#prototyping-with-db-push). Це дуже зручно, коли у вас є віддалені бази даних, такі як Neon, Planetscale або Turso. Команда 'push' ідеально підходить для швидкого тестування нових схем або змін у локальному середовищі розробки, дозволяючи проводити швидкі ітерації без зайвих витрат на керування файлами міграції. © [Drizzle Team](https://orm.drizzle.team/learn/tutorials/drizzle-with-neon)

**Drizzle Team**: Якщо ви хочете швидко виконувати ітерації під час локальної розробки або якщо ваш проект не потребує файлів міграції, Drizzle пропонує корисну команду під назвою drizzle-kit push. **Коли потрібно використовувати команду 'push'? **1.** На етапі створення прототипів та експериментів з вашою схемою в локальному середовищі. **2.** Якщо ви використовуєте зовнішнього провайдера, який керує міграціями та змінами схеми для вас (наприклад, PlanetScale). **3.** Якщо вам зручно змінювати схему бази даних до того, як ваші зміни коду будуть розгорнуті.

**Примітка**: NEXT_PUBLIC_DB_PROVIDER було вилучено у Relivator v1.2.6. Щоб змінити провайдера з Neon, змініть `drizzle.config.ts`. Для використання провайдерів MySQL або LibSQL, оновіть файли у `rc/db`. Автоматичне перемикання буде реалізовано у версії Relivator 1.3.x.

*Наведені нижче інструкції можуть бути застарілими, тому, будь ласка, перевірте їх ще раз! Ми повністю оновимо цей README.md з випуском Relivator 1.3.0.*.

Relivator розроблено для легкої підтримки баз даних як MySQL, так і PostgreSQL. Хоча PostgreSQL та [Neon](https://neon.tech) є конфігураціями за замовчуванням, перехід на MySQL від [Railway](https://railway.app?referralCode=sATgpf) або [PlanetScale](https://planetscale.com), або на PostgreSQL від [Railway](https://railway.app?referralCode=sATgpf) або [Vercel](https://vercel.com/storage/postgres) є простим. Налаштуйте конфігурацію бази даних у файлі [drizzle.config.ts](./drizzle.config.ts) та файлах `src/db/*` відповідним чином. Хоча Relivator оптимізовано для цих провайдерів, інші провайдери, сумісні з Drizzle та Auth.js (next-auth@beta/NextAuth.js), також можуть працювати з деякими додатковими налаштуваннями. Повна підтримка SQLite буде незабаром.

Щоб налаштувати `DATABASE_URL` у файлі `.env`, зверніться до `.env.example`. Ініціюйте нову базу даних або поширюйте зміни схеми, виконавши команду `bun db:push`. Це гарантує, що всі зміни, внесені до файлів схем у `src/db/*`, буде відображено у вибраному постачальнику баз даних.

Для перенесення бази даних скористайтеся командою `bun db:generate`, перегляньте теку `drizzle`, щоб переконатися, що все зроблено правильно, і виконайте команду `bun db:migrate`, коли все буде готово. Якщо необхідно, скористайтеся командою `bun db:drop` для контрольованого керування відкотами.

Якщо ви використовували Relivator до версії 1.2.6, ви можете видалити теку `drizzle` у кореневому каталозі. **Можлива застаріла інформація:** Не видаляйте файли з теки `drizzle` вручну. Замість цього використовуйте команду [`bun db:drop`](https://orm.drizzle.team/kit-docs/commands#drop-migration), якщо міграцію потрібно скасувати.

Ми забезпечуємо узгодженість конфігурації бази даних, використовуючи налаштування всередині `drizzle.config.ts` та експортуючи конфігурації в `src/db/index.ts` та `src/db/schema/index.ts`. При виборі провайдера бази даних закоментуйте або видаліть непотрібних провайдерів у `switch-case` цих файлів і видаліть відповідні файли схем, якщо це необхідно. Також можуть знадобитися додаткові налаштування в інших файлах. Автоматичне перемикання буде реалізовано найближчим часом у випуску Relivator v1.3.0.

**Історичний контекст**: У Relivator v1.1.0 ми прагнули забезпечити одночасну підтримку як MySQL, так і PostgreSQL для Drizzle ORM. У наступних випусках ми плануємо інтегрувати Prisma ORM, що зробить проект ще більш інклюзивним.