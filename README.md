# Сайт услуг по 152-ФЗ

Прототип публичных страниц; реальные обращения пока закрыты. ТЗ: docs/specification.md; план: docs/implementation-plan.md; состояние: docs/status.md.

Для локальной разработки нужны Node.js 24, npm и Docker Compose. Из корня проекта:

```sh
npm run env:init
npm ci
npm run services:up
npm run db:migrate
npm run db:seed
npm run dev
```

.env создаётся локально с случайным паролем и правами 0600; существующий файл не перезаписывается. PostgreSQL и Mailpit привязаны к loopback. Не используйте данные реальных клиентов в этой среде. Для остановки: npm run services:down; эта команда не удаляет том БД.

Проверки: npm run lint, npm run typecheck, npm test, npm run test:integration, npm run build, npm run test:e2e. Браузерные тесты требуют сборки, работающей БД и Chromium. Worker пока не реализован. Не используйте локальный сценарий миграции с production.
