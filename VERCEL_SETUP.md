# 🚀 Guia de Deploy na Vercel

## Configuração de Variáveis de Ambiente

Para que seus projetos do GitHub apareçam na Vercel, você precisa configurar as variáveis de ambiente:

### 1. Obter Token do GitHub

1. Acesse: https://github.com/settings/tokens
2. Clique em **"Generate new token"** > **"Generate new token (classic)"**
3. Dê um nome descritivo: `Portfolio Website`
4. Selecione os escopos necessários:
   - ✅ `repo` (acesso completo aos repositórios)
5. Clique em **"Generate token"**
6. **COPIE O TOKEN** (você só verá ele uma vez!)

### 2. Configurar na Vercel

1. Acesse seu projeto na Vercel: https://vercel.com/dashboard
2. Vá em **Settings** > **Environment Variables**
3. Adicione as seguintes variáveis:

| Nome da Variável | Valor | Ambiente |
|------------------|-------|----------|
| `NEXT_PUBLIC_GITHUB_TOKEN` | `seu_token_aqui` | Production, Preview, Development |
| `NEXT_PUBLIC_GITHUB_USERNAME` | `r90ur7` | Production, Preview, Development |

4. Clique em **Save**

### 3. Redesploy

Após configurar as variáveis:

1. Vá em **Deployments**
2. Clique nos três pontos (...) no último deploy
3. Selecione **"Redeploy"**
4. ✅ Seus projetos agora devem aparecer!

---

## ⚠️ Importante: Sistema de Fallback

Mesmo sem token do GitHub, o portfólio exibirá projetos do arquivo `projectsConfig.json`.

**Projetos que aparecem no fallback:**
- Todos os projetos que têm `imageURL` configurada em `src/data/projectsConfig.json`
- Atualmente: **10 projetos** (Dojo, challenge-algorithms, OnePiecePage, etc.)

---

## 🐛 Troubleshooting

### Problema: "Projetos não aparecem na Vercel"

**Solução 1:** Verificar variáveis de ambiente
```bash
# No Vercel Dashboard:
Settings > Environment Variables
```

**Solução 2:** Verificar logs
```bash
# Na Vercel, vá em:
Deployments > [Último Deploy] > Function Logs
```

**Solução 3:** Forçar rebuild
```bash
# Localmente:
vercel --prod --force
```

### Problema: "Rate limit da API do GitHub"

Isso acontece se você fizer muitas requisições sem token.

**Solução:** Configure o token conforme instruções acima.

---

## 📊 Monitoramento

Para ver os logs em produção:
1. Acesse o projeto na Vercel
2. Vá em **Deployments** > Selecione o deploy
3. Clique em **Functions**
4. Veja os logs de execução

---

## ✅ Checklist de Deploy

- [ ] Token do GitHub criado
- [ ] Variáveis de ambiente configuradas na Vercel
- [ ] Redesploy realizado
- [ ] Projetos aparecem no site
- [ ] Imagens dos projetos carregando
- [ ] Links dos projetos funcionando

---

## 💡 Dicas

1. **Mantenha seu token seguro**: Nunca commite o arquivo `.env.local`
2. **Atualize regularmente**: Tokens podem expirar
3. **Use fallback**: O sistema sempre mostra projetos, mesmo sem API
4. **Cache inteligente**: Projetos são cacheados por 30 minutos no navegador

---

## 📝 Estrutura de Projetos

Os projetos são carregados de 3 formas (em ordem de prioridade):

1. **Cache do navegador** (30 minutos)
2. **API do GitHub** (com token)
3. **Fallback** (de `projectsConfig.json`)

```
┌─────────────────┐
│  Cache válido?  │
└────────┬────────┘
         │ Não
         ↓
┌─────────────────┐
│  API GitHub     │
│  disponível?    │
└────────┬────────┘
         │ Não
         ↓
┌─────────────────┐
│  Usar Fallback  │
│  (sempre!!)     │
└─────────────────┘
```
