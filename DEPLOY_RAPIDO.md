# 🚀 Guia Rápido de Deploy - Legal Ops Diagnosis

**Repositório GitHub**: https://github.com/davimelotrader-coder/aplica-o.ADV  
**Email**: davimelotrader@gmail.com

---

## ⚡ Passo a Passo Rápido

### 1️⃣ Push para GitHub (10 min)

```powershell
cd C:\Users\marco\.gemini\antigravity\scratch\legal-ops-app

# Inicializar Git
git init
git add .
git commit -m "Initial commit - Legal Ops Diagnosis"
git branch -M main

# Adicionar remote
git remote add origin https://github.com/davimelotrader-coder/aplica-o.ADV.git

# Push (vai pedir credenciais)
git push -u origin main
```

**Credenciais**:
- **Username**: `davimelotrader-coder`
- **Password**: [Personal Access Token - criar em GitHub → Settings → Developer settings]

---

### 2️⃣ Criar PostgreSQL no Render (5 min)

1. Acesse: https://dashboard.render.com
2. Login via GitHub (`davimelotrader@gmail.com`)
3. New + → PostgreSQL
4. Configure:
   - Name: `legalops-db`
   - Database: `legalops`
   - Region: Ohio (US East)
   - Plan: Free
5. Create Database
6. **Copie a Internal Database URL**

---

### 3️⃣ Criar Web Service no Render (10 min)

1. New + → Web Service
2. Conecte repositório: `aplica-o.ADV`
3. Configure:
   - Name: `legal-ops-diagnosis`
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `node server.js`
   - Plan: Free

4. **Environment Variables**:
   - `NODE_ENV` = `production`
   - `DATABASE_URL` = [Cole a Internal Database URL]

5. Create Web Service

---

### 4️⃣ Aguardar Deploy (5 min)

- Acompanhe logs em tempo real
- Aguarde status = "Live"
- URL gerada: `https://legal-ops-diagnosis.onrender.com`

---

### 5️⃣ Testar Aplicação (5 min)

1. Acesse a URL do Render
2. Clique "Iniciar Diagnóstico"
3. Responda algumas perguntas
4. Complete e veja resultados

---

## ✅ Deploy Completo!

**URL de Produção**: `https://legal-ops-diagnosis.onrender.com`

**Credenciais salvas em**: `CREDENCIAIS.md`

---

## 🔧 Comandos Git Úteis

**Ver status**:
```bash
git status
```

**Fazer alterações e atualizar**:
```bash
git add .
git commit -m "Descrição da alteração"
git push
```

**Ver histórico**:
```bash
git log --oneline
```

---

## 📊 Acessar Banco de Dados

**Render Dashboard** → `legalops-db` → Connect → External Connection

Use com `psql` ou DBeaver:
```bash
psql [External Database URL]
```

**Queries úteis**:
```sql
-- Ver todos os diagnósticos
SELECT * FROM diagnostics ORDER BY created_at DESC;

-- Contar por status
SELECT status, COUNT(*) FROM diagnostics GROUP BY status;
```

---

**Tempo Total**: ~35 minutos  
**Custo**: $0 (Free Tier)
