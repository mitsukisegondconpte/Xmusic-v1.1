# 🌟 ORACLE CLOUD - 100% GRATUIT À VIE

## **Pourquoi Oracle Cloud ?**
- ✅ **Complètement gratuit** - aucun coût, jamais
- ✅ **VPS complet** - accès root total
- ✅ **Pas de limite de temps** - gratuit à vie
- ✅ **1GB RAM + 50GB stockage**
- ✅ **Install ce que vous voulez**

## **ÉTAPES DÉTAILLÉES**

### 1️⃣ **Créer compte Oracle Cloud**
- Allez sur [cloud.oracle.com](https://cloud.oracle.com)
- Cliquez **"Start for free"**
- Remplissez le formulaire (carte bancaire requise mais pas chargée)
- Vérifiez votre email

### 2️⃣ **Créer VM Always Free**
- Dans le dashboard, cliquez **"Create a VM instance"**
- Choisissez **"Always Free Eligible"**
- Image : **Ubuntu 22.04** 
- Shape : **VM.Standard.E2.1.Micro** (gratuit)
- Téléchargez la **clé SSH** privée

### 3️⃣ **Configurer le réseau**
- Security Lists → Default Security List
- Ajoutez **Ingress Rule** :
  - Source CIDR : `0.0.0.0/0`
  - Port : `3000` (pour le bot)

### 4️⃣ **Connexion SSH**
```bash
# Windows (téléchargez PuTTY ou utilisez WSL)
ssh -i your-key.key ubuntu@your-ip

# Mac/Linux
chmod 400 your-key.key
ssh -i your-key.key ubuntu@your-ip
```

### 5️⃣ **Installation complète**
```bash
# Mise à jour système
sudo apt update && sudo apt upgrade -y

# Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Python et pip
sudo apt install -y python3 python3-pip

# FFmpeg
sudo apt install -y ffmpeg

# yt-dlp
pip3 install yt-dlp

# Git
sudo apt install -y git

# Vérification
node --version
python3 --version
ffmpeg -version
yt-dlp --version
```

### 6️⃣ **Déployer le bot**
```bash
# Cloner depuis GitHub (ou upload files)
git clone https://github.com/votre-nom/whatsapp-bot.git
cd whatsapp-bot

# Installer dépendances
npm install

# Démarrer le bot
npm start
```

### 7️⃣ **Maintenir actif (optionnel)**
```bash
# Installer PM2 pour garder le bot en marche
npm install -g pm2

# Démarrer avec PM2
pm2 start index.js --name whatsapp-bot

# Auto-restart au reboot
pm2 startup
pm2 save
```

## **🔧 CONFIGURATION ORACLE**

### **Firewall Ubuntu**
```bash
# Ouvrir port 3000
sudo ufw allow 3000
sudo ufw enable
```

### **Variables d'environnement**
```bash
# Créer fichier .env
nano .env

# Ajouter
NODE_ENV=production
TZ=America/Port-au-Prince
```

## **📊 MONITORING**

### **Logs du bot**
```bash
# Voir logs en temps réel
pm2 logs whatsapp-bot

# Statut
pm2 status
```

### **Utilisation ressources**
```bash
# CPU et RAM
htop

# Espace disque
df -h
```

## **🆘 DÉPANNAGE**

### **Si VM s'arrête**
- Always Free VMs peuvent être "reclaimed"
- Redémarrez simplement dans le dashboard Oracle

### **Si bot plante**
```bash
# Redémarrer PM2
pm2 restart whatsapp-bot

# Voir erreurs
pm2 logs whatsapp-bot --error
```

### **Mise à jour bot**
```bash
cd whatsapp-bot
git pull origin main
pm2 restart whatsapp-bot
```

## **💡 CONSEILS**

### **Backup configuration**
- Sauvegardez votre clé SSH
- Notez l'IP publique
- Backup du dossier `.wwebjs_auth`

### **Sécurité**
- Changez le mot de passe par défaut
- Utilisez seulement des clés SSH
- Mettez à jour régulièrement

## **✅ AVANTAGES ORACLE**
- ✅ **Vraiment gratuit à vie**
- ✅ **Contrôle total du serveur**
- ✅ **Performance stable**
- ✅ **Aucune limitation logicielle**
- ✅ **Support de tous les outils**

**Oracle Cloud = Solution gratuite permanente !**