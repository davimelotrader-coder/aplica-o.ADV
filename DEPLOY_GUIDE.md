# 🚀 Guia de Deploy - Render (Conta Nova)

## ✅ Preparação Completa

Tudo pronto para deploy:
- ✅ Backend migrado para PostgreSQL
- ✅ Dependências instaladas (`pg`, `dotenv`)
- ✅ Arquivos de configuração criados
- ✅ `.gitignore` configurado
- ✅ README.md documentado

---

## 📋 Passo a Passo - Deploy no Render

### **Passo 1: Criar Conta no Render** (5 min)

1. Acesse: **https://render.com**
2. Clique em **"Get Started for Free"**
3. Escolha uma opção de cadastro:
   - **GitHub** (recomendado - mais rápido para deploy)
   - **GitLab**
   - **Email**
4. Complete o cadastro
5. Confirme seu email

**✅ Conta criada!**

---

### **Passo 2: Criar Repositório no GitHub** (10 min)

#### 2.1 - Criar Repositório

1. Acesse: **https://github.com/new**
2. Configure:
   - **Repository name**: `legal-ops-diagnosis`
   - **Description**: `Diagnóstico Operacional para Escritórios de Advocacia`
   - **Visibility**: **Private** (recomendado) ou Public
   - **NÃO** marque "Initialize with README" (já temos)
3. Clique **"Create repository"**

#### 2.2 - Inicializar Git Local

Abra o PowerShell e execute:

```powershell
cd C:\Users\marco\.gemini\antigravity\scratch\legal-ops-app

# Inicializar repositório
git init

# Adicionar todos os arquivos
git add .

# Primeiro commit
git commit -m "Initial commit - Legal Ops Diagnosis with PostgreSQL"

# Renomear branch para main (se necessário)
git branch -M main

# Adicionar remote (SUBSTITUA [seu-usuario] pelo seu username do GitHub)
git remote add origin https://github.com/[seu-usuario]/legal-ops-diagnosis.git

# Push para GitHub
git push -u origin main
```

**Observação**: O GitHub vai pedir suas credenciais. Use:
- **Username**: Seu username do GitHub
- **Password**: **Personal Access Token** (não a senha normal)

**Como criar Personal Access Token**:
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token → Classic
3. Marque: `repo` (acesso completo)
4. Generate token
5. **Copie o token** (não será mostrado novamente!)
6. Use este token como senha no git push

**✅ Código no GitHub!**

---

### **Passo 3: Criar PostgreSQL Database no Render** (5 min)

1. Acesse: **https://dashboard.render.com**
2. Clique **"New +"** (canto superior direito)
3. Selecione **"PostgreSQL"**
4. Configure:
   - **Name**: `legalops-db`
   - **Database**: `legalops`
   - **User**: `legalops_user` (auto-preenchido)
   - **Region**: **Ohio (US East)** (mais próximo do Brasil)
   - **PostgreSQL Version**: 16 (padrão)
   - **Datadog API Key**: Deixe vazio
   - **Plan**: **Free**
5. Clique **"Create Database"**

**Aguarde 2-3 minutos** enquanto o banco é provisionado.

Quando status = **"Available"**:
1. Clique no database `legalops-db`
2. Role até **"Connections"**
3. **Copie** a **"Internal Database URL"**
   - Formato: `postgresql://legalops_user:...@dpg-xxx/legalops`
   - **Guarde este URL!** Vamos usar no próximo passo

**✅ Banco de dados criado!**

---

### **Passo 4: Criar Web Service no Render** (10 min)

1. No Render Dashboard, clique **"New +"**
2. Selecione **"Web Service"**
3. Clique **"Connect account"** → Conecte sua conta GitHub
4. Autorize o Render a acessar seus repositórios
5. Selecione o repositório **`legal-ops-diagnosis`**
6. Clique **"Connect"**

#### 4.1 - Configurar Web Service

**Informações Básicas**:
- **Name**: `legal-ops-diagnosis`
- **Region**: **Ohio (US East)** (mesma do banco)
- **Branch**: `main`
- **Root Directory**: `backend`
- **Runtime**: **Node**

**Build & Deploy**:
- **Build Command**: `npm install`
- **Start Command**: `node server.js`

**Plan**:
- Selecione: **Free**

#### 4.2 - Adicionar Environment Variables

Role até **"Environment Variables"** e adicione:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `DATABASE_URL` | [Cole a Internal Database URL do Passo 3] |

**IMPORTANTE**: Cole a URL COMPLETA do banco, incluindo a senha.

#### 4.3 - Deploy

1. Clique **"Create Web Service"**
2. Render começará o deploy automaticamente

**Acompanhe o deploy**:
- Você verá logs em tempo real
- Aguarde até ver: ✅ `Legal Ops Diagnosis Server running on...`
- Status mudará para **"Live"**

**⏱️ Tempo estimado**: 3-5 minutos

**✅ Aplicação no ar!**

---

### **Passo 5: Acessar Aplicação** (1 min)

Quando o deploy terminar:

1. No topo da página, você verá a URL:
   ```
   https://legal-ops-diagnosis.onrender.com
   ```

2. **Clique na URL** ou copie e cole no navegador

3. **Teste o fluxo**:
   - Clique "Iniciar Diagnóstico"
   - Responda algumas perguntas
   - Verifique se está salvando
   - Complete e veja os resultados

**✅ Aplicação funcionando em produção!**

---

## 🎉 Deploy Completo!

Sua aplicação está no ar em:
```
https://legal-ops-diagnosis.onrender.com
```

### **Próximos Passos**

#### **Compartilhar Link**
Você pode compartilhar este link com qualquer pessoa. Cada escritório terá seu diagnóstico individual e isolado.

#### **Domínio Personalizado** (Opcional)
Se quiser usar um domínio próprio (ex: `diagnostico.seusite.com`):
1. No Render, vá em Settings → Custom Domain
2. Adicione seu domínio
3. Configure DNS conforme instruções

#### **Monitoramento**
- **Logs**: Render Dashboard → Logs (tempo real)
- **Métricas**: Render Dashboard → Metrics
- **Banco de Dados**: `legalops-db` → Metrics

---

## 🔧 Troubleshooting

### **Erro: "Application failed to respond"**
- Verifique logs no Render Dashboard
- Confirme que `DATABASE_URL` está correto
- Verifique se o banco está "Available"

### **Erro: "Failed to connect to database"**
- Confirme que copiou a **Internal Database URL** (não a External)
- Verifique se DATABASE_URL está nas Environment Variables
- Reinicie o Web Service

### **Deploy falhou**
- Verifique se o código está no GitHub
- Confirme que `Root Directory` = `backend`
- Verifique `Build Command` = `npm install`
- Verifique `Start Command` = `node server.js`

---

## 💰 Custos

**Render Free Tier**:
- ✅ **Web Service**: Gratuito (750h/mês)
- ✅ **PostgreSQL**: Gratuito por 90 dias
- ⚠️ **Após 90 dias**: PostgreSQL = $7/mês (ou migrar para Supabase gratuito)

**Sem surpresas**: Render não cobra automaticamente. Você receberá aviso antes do fim do período gratuito.

---

## 📊 Dados de Produção

**Onde estão os diagnósticos?**
- Banco PostgreSQL no Render
- Tabela: `diagnostics`
- Cada linha = 1 diagnóstico isolado

**Como acessar o banco?**
1. Render Dashboard → `legalops-db`
2. Connect → External Connection
3. Use `psql` ou cliente SQL (DBeaver, pgAdmin)

**Query de exemplo**:
```sql
SELECT session_id, status, created_at 
FROM diagnostics 
ORDER BY created_at DESC 
LIMIT 10;
```

---

## 🔐 Segurança

✅ **SSL/HTTPS**: Automático no Render  
✅ **Environment Variables**: Criptografadas  
✅ **Database**: Acesso restrito (Internal URL)  
✅ **Isolamento**: Cada diagnóstico com UUID único  
✅ **Sem agregação**: API não permite listar todos os diagnósticos  

---

## 📝 Checklist Final

Antes de considerar completo, verifique:

- [ ] Aplicação acessível via URL do Render
- [ ] Consegue criar novo diagnóstico
- [ ] Consegue salvar progresso
- [ ] Consegue retomar diagnóstico
- [ ] Consegue completar e ver resultados
- [ ] Gráfico radar aparece na página de resultados
- [ ] Link permanente funciona (copiar e colar em nova aba)
- [ ] Múltiplos diagnósticos são isolados (testar com 2 abas)

---

**🎊 Parabéns! Sua aplicação está em produção!**

**URL de Produção**: `https://legal-ops-diagnosis.onrender.com`

---

## 📞 Suporte

**Render Docs**: https://render.com/docs  
**Render Community**: https://community.render.com  
**PostgreSQL Docs**: https://www.postgresql.org/docs/
