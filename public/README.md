# Como Testar a Aplicação Localmente

## Localização da Aplicação

**Diretório**: `C:\Users\marco\.gemini\antigravity\scratch\legal-ops-app`

## Arquivos Criados

✅ **index.html** - Estrutura principal da aplicação  
✅ **styles.css** - Estilização profissional  
✅ **app.js** - Lógica da aplicação (state management, localStorage, navegação)  
✅ **questions.js** - Banco de 50 perguntas em 10 seções

---

## Como Abrir no Navegador

### Opção 1: Duplo Clique (Recomendado)
1. Abra o Windows Explorer
2. Navegue até: `C:\Users\marco\.gemini\antigravity\scratch\legal-ops-app`
3. Dê duplo clique no arquivo **index.html**
4. A aplicação abrirá no seu navegador padrão

### Opção 2: Arrastar e Soltar
1. Abra seu navegador (Chrome, Edge, Firefox)
2. Abra o Windows Explorer
3. Navegue até: `C:\Users\marco\.gemini\antigravity\scratch\legal-ops-app`
4. Arraste o arquivo **index.html** para a janela do navegador

### Opção 3: Copiar Caminho
Copie e cole este caminho na barra de endereços do navegador:
```
file:///C:/Users/marco/.gemini/antigravity/scratch/legal-ops-app/index.html
```

---

## O Que Testar

### 1. Tela de Boas-Vindas ✓
- [ ] Título "Diagnóstico Operacional" exibido
- [ ] Informações sobre tempo (20-30 min), confidencialidade e save/resume
- [ ] Descrição do diagnóstico
- [ ] Declaração de privacidade
- [ ] Botão "Iniciar Diagnóstico"

### 2. Navegação Entre Seções ✓
- [ ] Clicar em "Iniciar Diagnóstico"
- [ ] Seção 1 carrega com título "Captação e Admissão de Clientes"
- [ ] Barra de progresso mostra "Seção 1 de 10" e "10%"
- [ ] 5 perguntas são exibidas
- [ ] Responder algumas perguntas
- [ ] Clicar em "Próxima →"
- [ ] Seção 2 carrega corretamente
- [ ] Barra de progresso atualiza para "Seção 2 de 10" e "20%"

### 3. Funcionalidade Save & Resume ✓
- [ ] Responder perguntas nas Seções 1-3
- [ ] Clicar em "💾 Salvar e Sair"
- [ ] Retorna à tela de boas-vindas
- [ ] Botão "Continuar de onde parei" aparece
- [ ] Clicar em "Continuar de onde parei"
- [ ] Retorna à Seção 3 com todas as respostas anteriores preenchidas

### 4. Validação de Campos Obrigatórios ✓
- [ ] Tentar clicar em "Próxima" sem responder perguntas obrigatórias (marcadas com *)
- [ ] Mensagem de erro aparece: "Por favor, responda todas as perguntas obrigatórias"
- [ ] Preencher campos obrigatórios
- [ ] Navegação funciona normalmente

### 5. Tipos de Perguntas ✓
- [ ] **Múltipla escolha** (radio buttons) - Seção 1, Q1
- [ ] **Múltipla escolha múltipla** (checkboxes) - Seção 2, Q2
- [ ] **Numérico com unidade** - Seção 1, Q3 (horas)
- [ ] **Escala Likert** (1-5) - Seção 3, Q4
- [ ] **Texto livre** (textarea) - Seção 7, Q3

### 6. Revisão e Envio ✓
- [ ] Completar todas as 10 seções
- [ ] Tela de "Revisão das Respostas" aparece
- [ ] Todas as respostas são exibidas por seção
- [ ] Clicar em um título de seção para editar
- [ ] Retorna à seção específica
- [ ] Voltar à revisão
- [ ] Clicar em "Enviar Diagnóstico"
- [ ] Confirmação aparece
- [ ] Confirmar envio
- [ ] Tela de conclusão aparece com ícone de sucesso ✓

### 7. Auto-Save ✓
- [ ] Abrir console do navegador (F12)
- [ ] Responder algumas perguntas
- [ ] Aguardar 30 segundos
- [ ] Verificar mensagem no console: "Auto-saved at [hora]"

### 8. Design Responsivo ✓
- [ ] Redimensionar janela do navegador para mobile (~375px)
- [ ] Layout se adapta (coluna única, botões empilhados)
- [ ] Redimensionar para tablet (~768px)
- [ ] Layout se adapta adequadamente
- [ ] Redimensionar para desktop (~1200px+)
- [ ] Layout otimizado

---

## Recursos Implementados

✅ **10 seções** cobrindo jornada completa do escritório  
✅ **50 perguntas** com tipos variados (múltipla escolha, numérico, Likert, texto)  
✅ **Save & Resume** via localStorage  
✅ **Auto-save** a cada 30 segundos  
✅ **Barra de progresso** com percentual e seção atual  
✅ **Validação** de campos obrigatórios  
✅ **Navegação** Previous/Next com estado preservado  
✅ **Tela de revisão** com edição por seção  
✅ **Design profissional** com paleta azul corporativa  
✅ **Responsivo** para mobile, tablet e desktop  
✅ **Privacidade** - dados armazenados localmente no navegador  

---

## Observações Técnicas

- **Armazenamento**: Dados salvos em `localStorage` do navegador
- **Chave de armazenamento**: `legalOpsDiagnosis_session`
- **Auto-save**: Intervalo de 30 segundos
- **Navegadores compatíveis**: Chrome, Edge, Firefox, Safari (versões modernas)
- **Sem backend**: Aplicação 100% client-side para teste local

---

## Próximos Passos (Opcional)

Se quiser evoluir a aplicação:

1. **Backend**: Criar API para salvar respostas em banco de dados
2. **Scoring**: Implementar cálculo das 5 dimensões diagnósticas
3. **Relatório**: Gerar PDF com análise e recomendações
4. **Autenticação**: Sistema de login para múltiplos usuários
5. **Dashboard**: Painel administrativo para visualizar diagnósticos
6. **Benchmarking**: Módulo opt-in para comparações anônimas

---

**Aplicação pronta para teste! 🚀**
