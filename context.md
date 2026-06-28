# Contexto do Repositório — NIT Crawler Web

Este documento resume o repositório para ser usado como contexto pelo VS Code / Copilot/Code.

## Visão geral
- Projeto: Website e API para o Núcleo de Inovação Tecnológica de Farmanguinhos (NIT-Far).
- Frontend: React + TypeScript (Vite). Backend: Django + Django REST Framework.
- Infra: Docker Compose com Postgres (em produção/container) e SQLite (modo local).

## Estrutura principal
- [frontend](frontend): aplicação React (Vite, TypeScript, Styled Components, Framer Motion).
- [backend](backend): projeto Django com apps `funding` e `projects`.
- [scrapy_output](scrapy_output): JSONs de entrada gerados por crawlers (usados por comandos de import).
- `docker-compose.yml`: define serviços `db`, `backend`, `frontend`.
- `requirements.txt`: dependências Python do backend.

## Tecnologias
- Frontend: React 19, TypeScript, Vite, Styled Components, Framer Motion, Axios.
- Backend: Django 5.2, Django REST Framework, django-filter, django-cors-headers.
- DB: PostgreSQL (containers) / SQLite (local). Celery configurações apontam para Redis (externo).

## Como executar (resumo rápido)
1. Com Docker (recomendado):

   ```bash
   docker compose up -d --build
   ```

2. Frontend (manual):

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. Backend (manual):

   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py runserver
   ```

## Variáveis de ambiente importantes
- `DB_ENGINE`, `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` (configuram o DB).
- `DEBUG`, `SECRET_KEY`, `ALLOWED_HOSTS`, `CORS_ALLOWED_ORIGINS`.
- Frontend: `VITE_API_BASE_URL` (aponta para `http://localhost:8000/api` em Compose).

## Endpoints API principais
- `/api/opportunities/` — CRUD de oportunidades (`funding.FundingOpportunity`).
- `/api/opportunities/country-counts/` — agregação por país.
- `/api/filterable-fields/` — valores possíveis para filtros na UI.
- `/api/projects/` — CRUD de projetos (`projects.Project`).

Arquivos relevantes:
- [backend/urls.py](backend/backend/urls.py)
- [backend/funding/urls.py](backend/funding/urls.py)

## Modelos principais (resumo)
- FundingOpportunity (backend/funding/models.py)
  - Campos-notáveis: `title`, `description`, `link`, `opening_date`, `closing_date`, `country`, `total_fund`.
  - Campos para processamento por IA: `ai_keywords`, `ai_summary`, `ai_analysis`, `ai_processing_status`, `ai_last_processed`.
- Project (backend/projects/models.py)
  - Campos: `title`, `description`, `url`, `image`, `created_at`.

## Comandos de gerenciamento úteis
- `python manage.py import_scrapy_data <file> --source <SOURCE>` — importa um JSON único (backend/funding/management/commands/import_scrapy_data.py).
- `python manage.py import_scrapy_batch --path /data/scrapy_output` — importa todos os JSONs da pasta (backend/funding/management/commands/import_scrapy_batch.py).

## Dados de entrada / Crawlers
- JSONs de exemplo/entrada em [scrapy_output](scrapy_output) — nomes como `msca.json`, `cnpq.json`, `fapesp.json`.
- Os comandos de import usam o campo `link` como chave para evitar duplicados.

## Pontos de atenção para desenvolvedores
- Durante desenvolvimento local, o backend usa SQLite por padrão se `DB_ENGINE` não for `django.db.backends.postgresql`.
- A entrada do backend via Docker monta `./scrapy_output` como `/data/scrapy_output` (somente leitura).
- Celery está configurado para `redis://localhost:6379/0`; se for usar Celery em containers, adicione `redis` no Compose e ajuste URL para `redis://redis:6379/0`.

## Arquivos importantes
- [docker-compose.yml](docker-compose.yml)
- [README.md](README.md)
- [requirements.txt](requirements.txt)
- [frontend/package.json](frontend/package.json)
- [backend/manage.py](backend/manage.py)
- [backend/backend/settings.py](backend/backend/settings.py)

## Sugestão de uso como contexto no VS Code
- Colar o conteúdo deste `context.md` como resumo de repositório para Copilot/Code.
- Mantenha-o atualizado quando adicionar novos serviços, endpoints ou comandos de importação.

---
Gerado automaticamente como resumo de contexto para uso no VS Code.
