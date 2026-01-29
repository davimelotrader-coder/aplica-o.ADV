# Legal Operations Diagnosis

Aplicação web para diagnóstico operacional de escritórios de advocacia.

## 🎯 Características

- ✅ **Diagnósticos Individuais Isolados**: Cada escritório tem seus dados completamente separados
- ✅ **10 Seções de Avaliação**: Cobrindo toda a jornada operacional
- ✅ **5 Dimensões de Scoring**: Eficiência, Receita, Cliente, Risco e Estratégia
- ✅ **Save & Resume**: Salve e retome o diagnóstico a qualquer momento
- ✅ **Resultados Visuais**: Gráficos e análises detalhadas
- ✅ **Privacidade Garantida**: Sem compartilhamento ou comparação de dados

## 🏗️ Arquitetura

- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **Backend**: Node.js + Express
- **Banco de Dados**: PostgreSQL
- **Deploy**: Render (Full-Stack)

## 🚀 Instalação Local

### Pré-requisitos

- Node.js 18+
- PostgreSQL 14+

### Passos

1. Clone o repositório:
```bash
git clone https://github.com/[seu-usuario]/legal-ops-diagnosis.git
cd legal-ops-diagnosis
```

2. Instale as dependências do backend:
```bash
cd backend
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
# Edite .env com suas credenciais do PostgreSQL
```

4. Inicie o servidor:
```bash
npm start
```

5. Acesse: http://localhost:3000

## 📦 Deploy no Render

### 1. Criar PostgreSQL Database

1. Acesse [Render Dashboard](https://dashboard.render.com)
2. New + → PostgreSQL
3. Configure:
   - Name: `legalops-db`
   - Database: `legalops`
   - Region: Ohio (US East)
   - Plan: Free
4. Copie a **Internal Database URL**

### 2. Criar Web Service

1. New + → Web Service
2. Conecte ao repositório GitHub
3. Configure:
   - Name: `legal-ops-diagnosis`
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `node server.js`
   - Environment Variables:
     - `NODE_ENV` = `production`
     - `DATABASE_URL` = [Cole a Internal Database URL]

4. Deploy!

## 🔒 Privacidade e Segurança

- **UUID v4**: IDs não sequenciais (não enumeráveis)
- **Sem agregação**: Não há endpoints que listam ou comparam diagnósticos
- **Acesso por ID**: Apenas `/api/diagnostics/:sessionId`
- **SSL/HTTPS**: Criptografia em trânsito
- **Isolamento**: Cada diagnóstico em linha separada no banco

## 📊 API Endpoints

### `POST /api/session`
Cria nova sessão de diagnóstico

### `POST /api/diagnostics/:sessionId`
Salva progresso do diagnóstico

### `POST /api/diagnostics/:sessionId/submit`
Submete diagnóstico final e calcula scores

### `GET /api/results/:sessionId`
Retorna resultados do diagnóstico completo

## 📝 Licença

Proprietary - Todos os direitos reservados

## 👤 Autor

Desenvolvido para diagnóstico operacional de escritórios de advocacia.
