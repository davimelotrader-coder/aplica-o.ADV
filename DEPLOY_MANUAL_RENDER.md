# 🚀 Deploy Manual no Render - Passo a Passo Visual

**Código já está no GitHub**: ✅ https://github.com/davimelotrader-coder/aplica-o.ADV

**Tempo estimado**: 15 minutos

---

## 📋 Passo 1: Criar Conta/Login no Render (2 min)

### 1.1 - Acesse o Render
🔗 Abra: **https://render.com**

### 1.2 - Faça Login via GitHub
1. Clique em **"Get Started"** ou **"Sign In"** (canto superior direito)
2. Clique em **"Sign in with GitHub"**
3. Se pedir autorização, clique **"Authorize Render"**
4. Pronto! Você está logado

**✅ Você verá o Dashboard do Render**

---

## 📊 Passo 2: Criar PostgreSQL Database (5 min)

### 2.1 - Iniciar Criação
1. No Dashboard, clique no botão **"New +"** (canto superior direito)
2. Selecione **"PostgreSQL"**

### 2.2 - Configurar Database
Preencha os campos:

| Campo | Valor |
|-------|-------|
| **Name** | `legalops-db` |
| **Database** | `legalops` |
| **User** | `legalops_user` (auto-preenchido) |
| **Region** | **Ohio (US East)** |
| **PostgreSQL Version** | 16 (padrão) |
| **Datadog API Key** | Deixe vazio |
| **Instance Type** | **Free** |

### 2.3 - Criar
1. Clique **"Create Database"**
2. **Aguarde 2-3 minutos** (status mudará para "Available")

### 2.4 - Copiar URL do Banco ⚠️ IMPORTANTE
Quando status = **"Available"**:
1. Clique no database `legalops-db` (na lista)
2. Role até a seção **"Connections"**
3. Procure por **"Internal Database URL"**
4. Clique no ícone de **copiar** (📋) ao lado da URL
5. **Cole em um bloco de notas** - você vai usar no próximo passo!

**Exemplo de URL**:
```
postgresql://legalops_user:abc123xyz@dpg-xxxxx.ohio-postgres.render.com/legalops
```

**✅ Database criado! URL copiada!**

---

## 🌐 Passo 3: Criar Web Service (8 min)

### 3.1 - Iniciar Criação
1. Volte ao Dashboard (clique em "Dashboard" no menu lateral)
2. Clique **"New +"** novamente
3. Selecione **"Web Service"**

### 3.2 - Conectar Repositório GitHub
1. Se aparecer "Connect account", clique e autorize o Render a acessar seus repositórios
2. Na lista de repositórios, procure: **`aplica-o.ADV`**
3. Clique em **"Connect"** ao lado do repositório

### 3.3 - Configurar Web Service

**Informações Básicas**:

| Campo | Valor |
|-------|-------|
| **Name** | `legal-ops-diagnosis` |
| **Region** | **Ohio (US East)** (mesma do banco!) |
| **Branch** | `main` |
| **Root Directory** | `backend` |
| **Runtime** | **Node** |

**Build & Deploy**:

| Campo | Valor |
|-------|-------|
| **Build Command** | `npm install` |
| **Start Command** | `node server.js` |

**Instance Type**:
- Selecione: **Free**

### 3.4 - Adicionar Environment Variables ⚠️ CRÍTICO

Role até **"Environment Variables"** e clique **"Add Environment Variable"**:

**Variável 1**:
- **Key**: `NODE_ENV`
- **Value**: `production`

Clique **"Add Environment Variable"** novamente:

**Variável 2**:
- **Key**: `DATABASE_URL`
- **Value**: `postgresql://legalops_user:JrZ9hxl2d4wfKfoCEANgzkcyuE16ZcYx@dpg-d5tmmgfgi27c73fbf99g-a/legalops`

⚠️ **IMPORTANTE**: Cole exatamente como está acima (é a Internal Database URL do seu PostgreSQL)

### 3.5 - Criar Web Service
1. Clique **"Create Web Service"** (botão azul no final da página)
2. Render começará o deploy automaticamente

---

## ⏳ Passo 4: Aguardar Deploy (3-5 min)

### 4.1 - Acompanhar Logs
Você verá logs em tempo real:
```
==> Cloning from https://github.com/davimelotrader-coder/aplica-o.ADV...
==> Running build command 'npm install'...
==> Starting service with 'node server.js'...
✅ Legal Ops Diagnosis Server running on http://localhost:3000
```

### 4.2 - Aguardar Status "Live"
- No topo da página, o status mudará de:
  - 🟡 "Building..." → 🟢 "Live"
- Quando ficar **verde "Live"**, está pronto!

---

## 🎉 Passo 5: Acessar Aplicação (1 min)

### 5.1 - Copiar URL
No topo da página, você verá a URL da aplicação:
```
https://legal-ops-diagnosis.onrender.com
```

### 5.2 - Testar
1. Clique na URL ou copie e cole no navegador
2. Você verá a tela de boas-vindas do diagnóstico
3. Clique **"Iniciar Diagnóstico"**
4. Responda algumas perguntas
5. Teste o fluxo completo!

---

## ✅ Deploy Completo!

**Sua aplicação está no ar em**:
```
https://legal-ops-diagnosis.onrender.com
```

### 📊 Informações do Deploy

**GitHub**: https://github.com/davimelotrader-coder/aplica-o.ADV  
**Render Dashboard**: https://dashboard.render.com  
**PostgreSQL**: `legalops-db` (Ohio US East)  
**Web Service**: `legal-ops-diagnosis` (Ohio US East)

---

## 🔧 Se Algo Der Errado

### Erro: "Application failed to respond"
1. Vá em **Logs** (menu lateral)
2. Procure por erros em vermelho
3. Verifique se `DATABASE_URL` está correto nas Environment Variables

### Erro: "Failed to connect to database"
1. Confirme que copiou a **Internal Database URL** (não External)
2. Vá em Settings → Environment Variables
3. Verifique se `DATABASE_URL` está lá
4. Clique **"Manual Deploy"** → **"Deploy latest commit"**

### Deploy travou
1. Aguarde 10 minutos (pode demorar na primeira vez)
2. Se não resolver, clique **"Manual Deploy"** → **"Clear build cache & deploy"**

---

## 💡 Dicas

- **Cold Start**: Aplicação "dorme" após 15 min sem uso (Free Tier)
- **Wake Up**: Primeira requisição após sleep leva ~30 segundos
- **Logs**: Sempre disponíveis em tempo real no menu "Logs"
- **Redeploy**: Qualquer `git push` no GitHub faz deploy automático

---

## 📞 Precisa de Ajuda?

**Render Docs**: https://render.com/docs  
**Render Community**: https://community.render.com

---

**Boa sorte! 🚀**
