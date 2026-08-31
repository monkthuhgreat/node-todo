# Full CI/CD with GitOps(Node.js)

## О проекте

Этот проект - пример микросервиса на Node.js + Express + MongoDB, развернутого в Kubernetes через GitOps подход.

Главная фишка проекта - раздельный CI/CD:
- CI (Continuous Integration) настроен через GitHub Actions
- CD (Continuous Delivery) реализован через ArgoCD

Любой `git push` в ветку `main` запускает автоматическую сборку, тестирование, обновление манифестов и деплой в кластер.

---

## Стек технологий

|    Компонент    |         Инструмент          |           Назначение            |
|-----------------|-----------------------------|---------------------------------|
|   Приложение    | Node.js + Express + MongoDB |   REST API (4 CRUD операции)    |
| Контейнеризация |     Docker (multi-stage)    |   Сборка легковесного образа    |
|   Оркестрация   |    Kubernetes (Minikube)    |     Управление контейнерами     |
|       CI        |       GitHub Actions        | Сборка, тесты, пуш в Docker Hub |
|       CD        |           ArgoCD            |  GitOps-синхронизация кластера  |
|  Конфигурация   |      ConfigMap + Secret     |      Управление окружением      |
|   Мониторинг    |  liveness/readiness probes  |     Проверка состояния подов    |