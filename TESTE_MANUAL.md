# Guia de Teste - Fluxo Completo do Diagnóstico

## 🎯 Objetivo
Testar o fluxo completo do diagnóstico operacional, desde o início até a visualização dos resultados.

---

## 📋 Pré-requisitos

✅ Servidor backend rodando em **http://localhost:3000**  
✅ Navegador aberto (Chrome, Edge, Firefox)

---

## 🧪 Roteiro de Testes

### Teste 1: Tela de Boas-Vindas

**Ações**:
1. Abra o navegador e acesse: **http://localhost:3000**
2. Verifique se a tela de boas-vindas carrega

**Verificações**:
- [ ] Título "Diagnóstico Operacional" exibido
- [ ] Informações sobre tempo (20-30 min)
- [ ] Ícones de confidencialidade e save/resume
- [ ] Botão "Iniciar Diagnóstico" visível
- [ ] Declaração de privacidade presente

**Resultado Esperado**: Tela profissional com design azul corporativo

---

### Teste 2: Criação de Sessão e Seção 1

**Ações**:
1. Abra o **Console do Navegador** (F12 → Console)
2. Clique em "Iniciar Diagnóstico"
3. Observe o console

**Verificações no Console**:
- [ ] Mensagem: `Session created: [UUID]`
- [ ] UUID no formato: `xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx`

**Verificações na Tela**:
- [ ] Seção 1 carrega: "Captação e Admissão de Clientes"
- [ ] Barra de progresso mostra "Seção 1 de 10"
- [ ] Percentual mostra "10%"
- [ ] 5 perguntas são exibidas
- [ ] Botão "Anterior" está desabilitado
- [ ] Botão "Próxima →" está habilitado
- [ ] Botão "💾 Salvar e Sair" está visível

**Ações - Responder Perguntas**:
1. **Q1**: Selecione "CRM ou sistema de gestão"
2. **Q2**: Selecione "Até 4 horas úteis"
3. **Q3**: Digite "24" no campo numérico
4. **Q4**: Digite "2" no campo numérico
5. **Q5**: Selecione "2 vezes (3 sistemas)"

**Resultado Esperado**: Todas as perguntas respondidas, sem erros

---

### Teste 3: Navegação e Auto-Save

**Ações**:
1. Clique em "Próxima →"
2. Verifique se Seção 2 carrega
3. Responda 2-3 perguntas da Seção 2
4. Aguarde 30 segundos
5. Observe o console

**Verificações**:
- [ ] Seção 2 carrega corretamente
- [ ] Progresso atualiza para "Seção 2 de 10" e "20%"
- [ ] Botão "Anterior" agora está habilitado
- [ ] Console mostra: `Auto-saved at [hora]` após 30 segundos

**Resultado Esperado**: Navegação suave, auto-save funcionando

---

### Teste 4: Save & Resume

**Ações**:
1. Clique em "💾 Salvar e Sair"
2. Verifique o alerta que aparece
3. Confirme o alerta
4. Verifique se retorna à tela de boas-vindas
5. Observe se botão "Continuar de onde parei" aparece
6. Clique em "Continuar de onde parei"

**Verificações**:
- [ ] Alerta confirma salvamento
- [ ] Retorna à tela de boas-vindas
- [ ] Botão "Continuar de onde parei" está visível
- [ ] Ao clicar, retorna à Seção 2
- [ ] Respostas anteriores estão preenchidas

**Resultado Esperado**: Save/Resume funciona perfeitamente

---

### Teste 5: Completar Diagnóstico (Modo Rápido)

**Ações**:
Para economizar tempo, vamos preencher apenas o mínimo necessário:

1. **Seção 2**: Responda 3 perguntas obrigatórias (*), clique "Próxima"
2. **Seção 3**: Responda 3 perguntas obrigatórias, clique "Próxima"
3. **Seção 4**: Responda 3 perguntas obrigatórias, clique "Próxima"
4. **Seção 5**: Responda 3 perguntas obrigatórias, clique "Próxima"
5. **Seção 6**: Responda 3 perguntas obrigatórias, clique "Próxima"
6. **Seção 7**: Responda 3 perguntas obrigatórias, clique "Próxima"
7. **Seção 8**: Responda 3 perguntas obrigatórias, clique "Próxima"
8. **Seção 9**: Responda 3 perguntas obrigatórias, clique "Próxima"
9. **Seção 10**: Responda 3 perguntas obrigatórias

**Verificações**:
- [ ] Progresso atualiza a cada seção (20%, 30%, 40%... 100%)
- [ ] Validação impede avançar sem preencher campos obrigatórios
- [ ] Na Seção 10, botão muda para "Revisar Respostas →"

**Resultado Esperado**: Navegação completa sem erros

---

### Teste 6: Tela de Revisão

**Ações**:
1. Na Seção 10, clique em "Revisar Respostas →"
2. Observe a tela de revisão

**Verificações**:
- [ ] Todas as 10 seções são listadas
- [ ] Respostas são exibidas por seção
- [ ] Cada seção tem ícone "✏️ Editar"
- [ ] Botão "Enviar Diagnóstico" está visível

**Teste de Edição** (opcional):
1. Clique no título de uma seção
2. Verifique se retorna à seção específica
3. Modifique uma resposta
4. Navegue de volta à revisão

**Resultado Esperado**: Revisão completa e edição funciona

---

### Teste 7: Submissão do Diagnóstico

**Ações**:
1. Na tela de revisão, clique em "Enviar Diagnóstico"
2. Confirme o diálogo que aparece
3. Observe o console do navegador
4. Aguarde o redirecionamento

**Verificações no Console**:
- [ ] Mensagem: `Diagnostic submitted: {success: true, diagnosticId: "...", scores: {...}}`
- [ ] Scores exibem 5 dimensões + overall

**Verificações na Tela**:
- [ ] Redirecionamento automático para `/resultado/{sessionId}`
- [ ] URL contém UUID da sessão

**Resultado Esperado**: Submissão bem-sucedida, redirecionamento automático

---

### Teste 8: Página de Resultados ⭐

**Verificações Visuais**:
- [ ] **Pontuação Geral**: Número de 0-100 exibido em destaque
- [ ] **Interpretação**: Texto abaixo (Excelente/Bom/Regular/Necessita Atenção)
- [ ] **5 Cards de Dimensões**:
  - [ ] Eficiência Operacional (score + barra de progresso)
  - [ ] Proteção de Receita (score + barra de progresso)
  - [ ] Experiência do Cliente (score + barra de progresso)
  - [ ] Gestão de Riscos (score + barra de progresso)
  - [ ] Visibilidade Estratégica (score + barra de progresso)
- [ ] **Gráfico Radar**: Chart.js renderizado com 5 pontos
- [ ] **Botões de Ação**:
  - [ ] "📥 Baixar Relatório (PDF)" (mostra alerta "em breve")
  - [ ] "🔗 Copiar Link Permanente"
  - [ ] "↻ Novo Diagnóstico"
- [ ] **Informações da Sessão**:
  - [ ] Diagnóstico ID exibido
  - [ ] Data/hora de conclusão exibida
- [ ] **Declaração de Privacidade**: Texto confirmando isolamento

**Teste de Funcionalidades**:
1. Clique em "🔗 Copiar Link Permanente"
   - [ ] Alerta confirma cópia
   - [ ] Link copiado para área de transferência
2. Abra uma nova aba anônima
3. Cole o link copiado
   - [ ] Página de resultados carrega novamente
   - [ ] Mesmos scores são exibidos

**Resultado Esperado**: Página de resultados completa e funcional

---

### Teste 9: Verificação do Backend

**Ações**:
1. Abra o Windows Explorer
2. Navegue até: `C:\Users\marco\.gemini\antigravity\scratch\legal-ops-app\data\diagnostics`
3. Verifique os arquivos criados

**Verificações**:
- [ ] Existe pelo menos 1 arquivo JSON
- [ ] Nome do arquivo é um UUID (ex: `a1b2c3d4-e5f6-7890-abcd-ef1234567890.json`)
- [ ] Abra o arquivo JSON em um editor de texto
- [ ] Verifique estrutura:
  ```json
  {
    "sessionId": "...",
    "status": "completed",
    "responses": { "1": {...}, "2": {...}, ... },
    "scores": {
      "overall": 65,
      "dimensions": {
        "efficiency": 70,
        "revenue": 68,
        "client": 72,
        "risk": 60,
        "strategic": 55
      }
    }
  }
  ```

**Resultado Esperado**: Arquivo JSON individual criado com todos os dados

---

### Teste 10: Isolamento de Diagnósticos

**Ações**:
1. Volte para **http://localhost:3000**
2. Clique em "Iniciar Diagnóstico" (novo diagnóstico)
3. Observe o console para novo UUID
4. Responda algumas perguntas
5. Submeta o diagnóstico
6. Verifique a pasta `data/diagnostics` novamente

**Verificações**:
- [ ] Novo UUID criado (diferente do anterior)
- [ ] Agora existem 2 arquivos JSON na pasta
- [ ] Cada arquivo tem UUID diferente
- [ ] Conteúdo dos arquivos é diferente

**Resultado Esperado**: Diagnósticos completamente isolados

---

## ✅ Checklist Final

Após completar todos os testes, verifique:

- [ ] Fluxo completo funciona sem erros
- [ ] Session ID é criado e mantido
- [ ] Auto-save funciona (console mostra mensagens)
- [ ] Save & Resume funciona
- [ ] Validação de campos obrigatórios funciona
- [ ] Submissão redireciona para resultados
- [ ] Página de resultados exibe scores corretamente
- [ ] Gráfico radar é renderizado
- [ ] Arquivos JSON são criados individualmente
- [ ] Cada diagnóstico tem seu próprio arquivo
- [ ] Link permanente funciona

---

## 🐛 Problemas Comuns

### Erro: "Failed to load results"
**Causa**: Diagnóstico não foi concluído  
**Solução**: Complete o diagnóstico até o fim e submeta

### Erro: "Session not found"
**Causa**: UUID inválido ou arquivo não existe  
**Solução**: Inicie novo diagnóstico

### Gráfico não aparece
**Causa**: Chart.js não carregou  
**Solução**: Verifique conexão com internet (CDN) ou console para erros

### Auto-save não funciona
**Causa**: Intervalo de 30s não passou  
**Solução**: Aguarde 30 segundos completos

---

## 📊 Resultado Esperado Final

✅ **Aplicação funcional** com fluxo completo  
✅ **Backend salvando** dados individuais  
✅ **Scoring calculado** corretamente  
✅ **Resultados visualizados** com gráficos  
✅ **Privacidade garantida** (arquivos isolados)

---

**Servidor rodando em**: http://localhost:3000  
**Dados salvos em**: `C:\Users\marco\.gemini\antigravity\scratch\legal-ops-app\data\diagnostics\`
