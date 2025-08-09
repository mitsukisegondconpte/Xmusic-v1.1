# 🤖 Bot WhatsApp - Musique & TicTacToe

Bot WhatsApp complet avec téléchargement YouTube et jeu TicTacToe interactif, développé en Node.js.

## ✨ Fonctionnalités

### 🎵 Téléchargement de Musique
- Recherche automatique sur YouTube
- Téléchargement et conversion MP3
- Envoi direct sur WhatsApp
- Gestion automatique des fichiers temporaires
- Limite de taille respectée (16MB WhatsApp)

### 🎮 Jeu TicTacToe
- Interface avec émojis (⭕❌)
- Grille numérotée (1️⃣-9️⃣)
- Mode multijoueur dans les groupes
- Mode solo contre le bot en privé
- Détection automatique des victoires

### 🔐 Authentification WhatsApp
- Connexion par QR Code
- Session persistante (LocalAuth)
- Reconnexion automatique
- Support multi-plateforme

## 🚀 Déploiement GitHub + Render

### Étape 1 : Configuration GitHub

1. **Créer un nouveau repository**
```bash
# Cloner et configurer
git clone https://github.com/votre-username/whatsapp-music-bot.git
cd whatsapp-music-bot

# Ajouter les fichiers
git add .
git commit -m "🚀 Initial commit - Bot WhatsApp complet"
git push origin main
```

2. **Structure des fichiers requis**
```
whatsapp-music-bot/
├── index.js          # Code principal du bot
├── package.json      # Dépendances Node.js
├── README.md         # Documentation complète
├── .gitignore        # Fichiers à ignorer
└── render.yaml       # Configuration Render
```

### Étape 2 : Déploiement sur Render

1. **Connexion à Render**
   - Allez sur [render.com](https://render.com)
   - Connectez votre compte GitHub

2. **Création du service**
   - Cliquez **"New"** → **"Web Service"**
   - Sélectionnez votre repository GitHub
   - Configuration recommandée :

```yaml
# render.yaml
services:
  - type: web
    name: whatsapp-music-bot
    env: node
    plan: free
    buildCommand: npm install && apt-get update && apt-get install -y python3 python3-pip ffmpeg && pip3 install yt-dlp
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
```

3. **Variables d'environnement**
   - `NODE_ENV`: production
   - `PUPPETEER_SKIP_CHROMIUM_DOWNLOAD`: true
   - `PUPPETEER_EXECUTABLE_PATH`: /usr/bin/chromium-browser

### Étape 3 : Connexion WhatsApp

1. **Surveiller les logs Render**
   - Allez dans votre service → **Logs**
   - Attendez l'affichage du QR code

2. **Scanner le QR Code**
   - Ouvrez WhatsApp sur votre téléphone
   - **Android**: Menu → Appareils connectés → Connecter un appareil
   - **iPhone**: Réglages → WhatsApp Web/Desktop
   - Scannez le QR code dans les logs

3. **Vérification de connexion**
```
✅ Bot WhatsApp connecté avec succès !
🎵 Commandes disponibles:
   /play [nom de la chanson] - Télécharger de la musique
   /ttt - Jouer au TicTacToe
   /help - Afficher l'aide
```

## 🎮 Utilisation

### Commandes Musique
```
/play Despacito
/play The Weeknd Blinding Lights
/play Bob Marley No Woman No Cry
```

### Jeu TicTacToe
```
/ttt
```
Interface de jeu :
```
1️⃣2️⃣3️⃣
4️⃣5️⃣6️⃣
7️⃣8️⃣9️⃣

🎮 Tour de ⭕
```
Tapez un chiffre (1-9) pour jouer !

### Aide et Support
```
/help
```

## 🔧 Installation Locale

### Prérequis
- Node.js 18+
- Python 3.8+
- FFmpeg
- yt-dlp

### Commandes d'installation

#### Ubuntu/Debian
```bash
# Dépendances système
sudo apt update
sudo apt install nodejs npm python3 python3-pip ffmpeg

# yt-dlp
pip3 install yt-dlp

# Dépendances Node.js
npm install
```

#### macOS
```bash
# Homebrew
brew install node python ffmpeg

# yt-dlp
pip3 install yt-dlp

# Dépendances Node.js
npm install
```

#### Windows
```bash
# Chocolatey
choco install nodejs python ffmpeg

# yt-dlp
pip install yt-dlp

# Dépendances Node.js
npm install
```

### Démarrage local
```bash
npm start
# ou
node index.js
```

## 🌐 Autres Plateformes de Déploiement

### Railway
1. Connectez votre repository GitHub
2. Variables d'environnement :
```
NIXPACKS_BUILD_CMD=npm install && apt-get update && apt-get install -y python3 python3-pip ffmpeg && pip3 install yt-dlp
NIXPACKS_START_CMD=npm start
```

### Glitch
1. **Import from GitHub** → URL de votre repository
2. Terminal Glitch :
```bash
sudo apt-get update
sudo apt-get install python3 python3-pip ffmpeg
pip3 install yt-dlp
npm start
```

### Heroku (avec Docker)
**Dockerfile**
```dockerfile
FROM node:18

RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    ffmpeg

RUN pip3 install yt-dlp

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD ["npm", "start"]
```

**Déploiement**
```bash
heroku container:push web --app votre-app
heroku container:release web --app votre-app
```

## 🔍 Dépannage

### Problèmes de Connexion WhatsApp

**QR Code ne s'affiche pas**
- Vérifiez les logs du service
- Redémarrez le service
- Vérifiez les dépendances Puppeteer

**Session expirée**
```bash
# Supprimez les fichiers de session
rm -rf .wwebjs_auth/
rm -rf .wwebjs_cache/
```

### Problèmes de Téléchargement

**yt-dlp non trouvé**
```bash
# Vérification installation
which yt-dlp
yt-dlp --version

# Réinstallation si nécessaire
pip3 install --upgrade yt-dlp
```

**FFmpeg non trouvé**
```bash
# Vérification installation
which ffmpeg
ffmpeg -version

# Installation selon l'OS
sudo apt install ffmpeg  # Ubuntu
brew install ffmpeg      # macOS
```

### Problèmes de Performance

**Fichiers temporaires**
- Les fichiers sont automatiquement supprimés après 5 minutes
- Nettoyage manuel si nécessaire :
```bash
rm -rf ./temp/*
```

**Mémoire insuffisante**
- Utilisez un plan payant sur votre plateforme
- Optimisez la qualité audio dans le code

## 📋 Configuration Avancée

### Personnalisation du Bot

**Modifier les limites**
```javascript
// Dans index.js
const config = {
    maxFileSize: 16 * 1024 * 1024, // 16MB
    downloadTimeout: 300000,       // 5 minutes
    supportedFormats: ['mp3', 'ogg']
};
```

**Ajouter des commandes**
```javascript
// Nouvelle commande dans le gestionnaire de messages
if (messageBody === '/nouvelle') {
    message.reply('✨ Nouvelle fonctionnalité !');
}
```

### Sécurité et Bonnes Pratiques

**Variables d'environnement**
```bash
# .env (non inclus dans git)
NODE_ENV=production
BOT_NAME=MonBot
OWNER_NUMBER=+1234567890
```

**Limitation des utilisateurs**
```javascript
// Whitelist des utilisateurs autorisés
const authorizedUsers = ['numero@c.us'];
if (!authorizedUsers.includes(message.from)) {
    return; // Ignorer les messages non autorisés
}
```

## 📞 Support et Contact

### 👨‍💻 Créateur - jeff_mitsuki
- **WhatsApp** : [36846133](https://wa.me/36846133)
- **Telegram** : [@jeff_mitsuki](https://t.me/jeff_mitsuki)  
- **GitHub** : [mitsukisegondconpte](https://github.com/mitsukisegondconpte)

### 🐛 Signaler un Bug
1. Ouvrez une **Issue** sur GitHub
2. Décrivez le problème en détail
3. Incluez les logs d'erreur
4. Mentionnez votre plateforme de déploiement

### 💡 Proposer une Fonctionnalité
1. **Fork** le repository
2. Créez une branche pour votre fonctionnalité
3. Développez et testez
4. Soumettez une **Pull Request**

## 📄 Licence

**MIT License** - Libre d'utilisation, modification et distribution.

```
Copyright (c) 2024 jeff_mitsuki

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software...
```

## 🎯 Roadmap

### Version 1.1 (Prochaine)
- [ ] Support des playlists YouTube
- [ ] Commandes d'administration
- [ ] Statistiques d'utilisation
- [ ] Support multi-langues

### Version 1.2 (Future)
- [ ] Interface web de contrôle
- [ ] Base de données pour les préférences
- [ ] API REST pour intégrations
- [ ] Support des podcasts

---

⭐ **N'oubliez pas de mettre une étoile sur GitHub si ce projet vous aide !**

🔔 **Suivez les mises à jour** en "watchant" le repository