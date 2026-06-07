# 📱 Rotina com Propósito — PWA

Agenda semanal com notificações push, histórico e sequência de dias.

## 🚀 Deploy no GitHub Pages (passo a passo)

### 1. Criar repositório no GitHub

Acesse https://github.com/new e crie um repositório chamado `rotina` (público).

### 2. Clonar e subir os arquivos

```bash
# Clone o repositório vazio
git clone https://github.com/SEU_USUARIO/rotina.git
cd rotina

# Copie os arquivos do PWA para dentro da pasta
# (index.html, sw.js, manifest.json, icon-192.png, icon-512.png)

# Adicione tudo
git add .
git commit -m "primeiro commit — rotina PWA"
git push origin main
```

### 3. Ativar GitHub Pages

- Vá em **Settings** do repositório
- Clique em **Pages** no menu lateral
- Em "Source", selecione **Deploy from a branch**
- Branch: **main** / pasta: **/ (root)**
- Clique em **Save**

Aguarde ~1 minuto. Seu app estará em:
**https://SEU_USUARIO.github.io/rotina**

### 4. Instalar no iPhone

1. Abra o link no **Safari**
2. Toque no ícone de **compartilhar** (⬆️)
3. Toque em **"Adicionar à Tela de Início"**
4. Confirme → toque em **Adicionar**
5. Abra o app e toque em **"Ativar notificações"**

---

## 📁 Arquivos do projeto

| Arquivo | Função |
|---|---|
| `index.html` | App principal |
| `sw.js` | Service Worker (cache + notificações) |
| `manifest.json` | Configuração do PWA |
| `icon-192.png` | Ícone do app (tela inicial) |
| `icon-512.png` | Ícone do app (alta resolução) |
