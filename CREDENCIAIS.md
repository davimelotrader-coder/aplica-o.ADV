# 🔐 Credenciais e Configurações - Legal Ops Diagnosis

**Data de Criação**: 29/01/2026  
**Projeto**: Diagnóstico Operacional para Escritórios de Advocacia

---

## 📧 GitHub

**Email de Login**: `davimelotrader@gmail.com`  
**Repositório**: https://github.com/davimelotrader-coder/aplica-o.ADV  
**Username**: `davimelotrader-coder`  
**Branch Principal**: `main`

### Informações do Repositório

- **Nome**: `aplica-o.ADV`
- **Descrição**: Diagnóstico Operacional para Escritórios de Advocacia
- **Visibilidade**: Private (recomendado)
- **URL Clone HTTPS**: `https://github.com/davimelotrader-coder/aplica-o.ADV.git`

### Personal Access Token (PAT)

**Quando criar**:
- GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
- Generate new token (classic)
- **Scopes necessários**: `repo` (Full control of private repositories)
- **Expiration**: 90 days (ou No expiration)

**Onde usar**:
- Como senha ao fazer `git push` pela primeira vez
- Armazene em local seguro (não será mostrado novamente)

---

## 🚀 Render

**Login**: Via GitHub (conta `davimelotrader@gmail.com`)  
**Dashboard**: https://dashboard.render.com  
**Método de Autenticação**: OAuth via GitHub

### Recursos Criados

#### 1. PostgreSQL Database

- **Nome**: `legalops-db`
- **Database Name**: `legalops`
- **User**: `legalops_user` (auto-gerado)
- **Region**: Ohio (US East)
- **Plan**: Free
- **PostgreSQL Version**: 16

**Connection URLs**:
- **Internal Database URL**: `postgresql://legalops_user:[password]@[host]/legalops`
  - ⚠️ Será gerado automaticamente após criação
  - ⚠️ Use esta URL nas Environment Variables do Web Service
- **External Database URL**: Para acesso via cliente SQL (pgAdmin, DBeaver)

**Onde encontrar**:
1. Render Dashboard → `legalops-db`
2. Connections → Internal Database URL (copiar)

---

#### 2. Web Service

- **Nome**: `legal-ops-diagnosis`
- **Repository**: `aplica-o.ADV`
- **Branch**: `main`
- **Region**: Ohio (US East)
- **Root Directory**: `backend`
- **Runtime**: Node
- **Plan**: Free

**Build Configuration**:
- **Build Command**: `npm install`
- **Start Command**: `node server.js`

**Environment Variables**:
| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `DATABASE_URL` | [Internal Database URL do PostgreSQL] |

**URL de Produção**:
- Será gerada automaticamente: `https://legal-ops-diagnosis.onrender.com`
- Ou personalizada se configurar custom domain

---

## 🗂️ Estrutura de Arquivos

### Diretório do Projeto

**Local**: `C:\Users\marco\.gemini\antigravity\scratch\legal-ops-app`

```
legal-ops-app/
├── backend/
│   ├── server.js              # Express server com PostgreSQL
│   ├── db.js                  # Módulo de conexão PostgreSQL
│   ├── package.json           # Dependências
│   ├── .env                   # Variáveis locais (NÃO commitar)
│   └── .env.example           # Template de variáveis
├── frontend/
│   ├── index.html             # Página principal
│   ├── resultado.html         # Página de resultados
│   ├── styles.css             # Estilos
│   ├── app.js                 # Lógica da aplicação
│   └── questions.js           # Banco de perguntas
├── .gitignore                 # Arquivos ignorados pelo Git
├── README.md                  # Documentação
└── DEPLOY_GUIDE.md            # Guia de deploy
```

---

## 🔑 Variáveis de Ambiente

### Local Development (`.env`)

```env
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/legalops_dev
```

### Production (Render)

```env
NODE_ENV=production
DATABASE_URL=[Auto-configurado pelo Render]
```

⚠️ **IMPORTANTE**: O arquivo `.env` está no `.gitignore` e NÃO será enviado ao GitHub (segurança).

---

## 📊 Banco de Dados

### Schema PostgreSQL

```sql
CREATE TABLE diagnostics (
    session_id UUID PRIMARY KEY,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    status VARCHAR(20) DEFAULT 'in_progress',
    current_section INTEGER DEFAULT 0,
    responses JSONB DEFAULT '{}',
    scores JSONB,
    metadata JSONB DEFAULT '{}'
);

CREATE INDEX idx_status ON diagnostics(status);
CREATE INDEX idx_created_at ON diagnostics(created_at);
```

### Queries Úteis

**Ver todos os diagnósticos**:
```sql
SELECT session_id, status, created_at, updated_at 
FROM diagnostics 
ORDER BY created_at DESC;
```

**Ver diagnósticos completos**:
```sql
SELECT session_id, scores->>'overall' as score, metadata->>'completedAt' as completed
FROM diagnostics 
WHERE status = 'completed'
ORDER BY created_at DESC;
```

**Contar diagnósticos por status**:
```sql
SELECT status, COUNT(*) 
FROM diagnostics 
GROUP BY status;
```

---

## 🔒 Segurança

### Dados Sensíveis (NÃO COMMITAR)

❌ **Nunca commitar**:
- `.env` (variáveis de ambiente locais)
- `node_modules/` (dependências)
- `data/` (dados locais de desenvolvimento)
- Personal Access Tokens
- Database passwords

✅ **Pode commitar**:
- `.env.example` (template sem valores reais)
- Código-fonte
- `README.md` e documentação
- `.gitignore`

### Proteções Implementadas

- ✅ **UUID v4**: IDs não sequenciais (não enumeráveis)
- ✅ **Sem listagem**: Não há endpoint `/api/diagnostics` (lista todos)
- ✅ **Acesso por ID**: Apenas `/api/diagnostics/:sessionId`
- ✅ **SSL/HTTPS**: Automático no Render
- ✅ **Environment Variables**: Criptografadas no Render
- ✅ **Database Internal URL**: Acesso restrito à rede interna do Render

---

## 💰 Custos e Limites

### Render Free Tier

**Web Service**:
- ✅ **Gratuito**: 750 horas/mês
- ⚠️ **Sleep após inatividade**: 15 minutos sem requisições
- ⚠️ **Cold start**: ~30 segundos para "acordar"
- ✅ **Bandwidth**: 100 GB/mês

**PostgreSQL**:
- ✅ **Gratuito**: 90 dias
- ⚠️ **Após 90 dias**: $7/mês
- ✅ **Storage**: 1 GB
- ✅ **Connections**: 97 simultâneas

**Alternativas após 90 dias**:
1. Pagar $7/mês no Render
2. Migrar para Supabase (PostgreSQL gratuito permanente)
3. Migrar para Neon (PostgreSQL gratuito com limites)

---

## 📞 Suporte e Recursos

### Render

- **Dashboard**: https://dashboard.render.com
- **Docs**: https://render.com/docs
- **Community**: https://community.render.com
- **Status**: https://status.render.com

### GitHub

- **Repositório**: https://github.com/davimelotrader-coder/aplica-o.ADV
- **Docs**: https://docs.github.com
- **Support**: https://support.github.com

### PostgreSQL

- **Docs**: https://www.postgresql.org/docs/
- **Tutorial**: https://www.postgresqltutorial.com/

---

## 🚨 Troubleshooting

### Git Push Falha

**Erro**: `Authentication failed`

**Solução**:
1. Certifique-se de usar Personal Access Token como senha (não a senha do GitHub)
2. Gere novo token: GitHub → Settings → Developer settings → Personal access tokens
3. Marque scope: `repo`
4. Use o token como senha no `git push`

---

### Render Deploy Falha

**Erro**: `Failed to connect to database`

**Solução**:
1. Verifique se `DATABASE_URL` está nas Environment Variables
2. Confirme que copiou a **Internal Database URL** (não External)
3. Verifique se o PostgreSQL está "Available"
4. Reinicie o Web Service

---

### Aplicação Não Responde

**Erro**: `Application failed to respond`

**Solução**:
1. Verifique logs: Render Dashboard → Logs
2. Confirme que `Start Command` = `node server.js`
3. Confirme que `Root Directory` = `backend`
4. Verifique se todas as dependências estão em `package.json`

---

## ✅ Checklist de Deploy

Antes de fazer deploy, confirme:

- [ ] Código commitado no GitHub
- [ ] `.env` NÃO está no repositório (verificar `.gitignore`)
- [ ] `package.json` tem todas as dependências (`pg`, `dotenv`, etc.)
- [ ] PostgreSQL criado no Render
- [ ] Internal Database URL copiada
- [ ] Web Service configurado corretamente
- [ ] Environment Variables adicionadas
- [ ] Deploy iniciado
- [ ] Status = "Live"
- [ ] Aplicação acessível via URL
- [ ] Teste completo: criar diagnóstico → completar → ver resultados

---

## 📝 Notas Importantes

1. **Primeiro Deploy**: Pode levar 5-10 minutos
2. **Cold Start**: Aplicação "dorme" após 15 min de inatividade (Free Tier)
3. **Wake Up**: Primeira requisição após sleep leva ~30 segundos
4. **Logs**: Sempre verifique logs em caso de erro
5. **Database Backup**: Render não faz backup automático no Free Tier
6. **SSL**: Automático e gratuito
7. **Custom Domain**: Disponível no Free Tier

---

**Última Atualização**: 29/01/2026  
**Status**: Pronto para deploy
