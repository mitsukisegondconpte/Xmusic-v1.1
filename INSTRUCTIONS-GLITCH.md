# 🎯 DÉPLOIEMENT 100% GRATUIT SUR GLITCH

## Étape 1 : Préparer GitHub

1. **Créer repository GitHub**
   - Allez sur github.com
   - Nouveau repository : `whatsapp-music-bot`
   - Uploadez tous les fichiers du ZIP

## Étape 2 : Déployer sur Glitch

1. **Aller sur Glitch**
   - Allez sur [glitch.com](https://glitch.com)
   - Inscrivez-vous gratuitement

2. **Importer depuis GitHub**
   - Cliquez **"New Project"**
   - Sélectionnez **"Import from GitHub"**
   - Collez l'URL de votre repository GitHub

## Étape 3 : Installation (CRUCIAL)

1. **Terminal Glitch**
   - Cliquez sur **"Terminal"** en bas
   - Tapez ces commandes UNE PAR UNE :

```bash
# 1. Installer Python et pip
sudo apt-get update
sudo apt-get install -y python3 python3-pip

# 2. Installer FFmpeg
sudo apt-get install -y ffmpeg

# 3. Installer yt-dlp
pip3 install yt-dlp

# 4. Vérifier installations
which yt-dlp
which ffmpeg

# 5. Démarrer le bot
npm start
```

## Étape 4 : Configuration automatique

1. **Modifier package.json**
   - Remplacez le contenu par `package-glitch.json`
   - Cela ajoute les scripts d'installation

2. **Commande rapide**
   ```bash
   npm run install-deps
   ```

## Étape 5 : Connexion WhatsApp

1. **Logs Glitch**
   - Cliquez sur **"Logs"** 
   - Attendez le QR code

2. **Scanner**
   - Ouvrez WhatsApp sur téléphone
   - Menu → Appareils connectés
   - Scannez le QR code

## Étape 6 : Tester

```
/help
/ttt
/play Despacito
```

## 🎉 AVANTAGES GLITCH GRATUIT

✅ **Complètement gratuit**
✅ **Installation système autorisée**
✅ **Support yt-dlp et ffmpeg**
✅ **Pas de limite de temps**
✅ **Import GitHub direct**

## ⚠️ LIMITATIONS

- Le projet dort après 5 minutes d'inactivité
- Se réveille automatiquement quand quelqu'un envoie un message
- 1000 heures/mois gratuites (largement suffisant)

## 🔧 MAINTENIR ACTIF (optionnel)

Pour garder le bot toujours actif :

1. **UptimeRobot** (gratuit)
   - Créez un compte sur uptimerobot.com
   - Ajoutez l'URL de votre projet Glitch
   - Ping toutes les 5 minutes

2. **URL Glitch**
   - Format : `https://votre-nom-projet.glitch.me`
   - UptimeRobot pingera cette URL

## 📞 Support

Si ça ne marche pas :
- WhatsApp : 36846133
- Telegram : @jeff_mitsuki

## 🎯 RÉSUMÉ RAPIDE

1. GitHub → Upload fichiers
2. Glitch → Import GitHub
3. Terminal → Installer dépendances
4. Logs → Scanner QR code
5. WhatsApp → Tester `/play`

**TOUT EST GRATUIT !**