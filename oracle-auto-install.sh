#!/bin/bash

echo "🚀 Installation automatique Bot WhatsApp sur Oracle Cloud..."
echo "📋 Ce script installe TOUT automatiquement !"

# Mise à jour système
echo "📦 Mise à jour du système..."
sudo apt update && sudo apt upgrade -y

# Node.js 18
echo "🟢 Installation Node.js 18..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Python et pip
echo "🐍 Installation Python 3 et pip..."
sudo apt install -y python3 python3-pip

# FFmpeg
echo "🎵 Installation FFmpeg..."
sudo apt install -y ffmpeg

# yt-dlp
echo "📺 Installation yt-dlp..."
pip3 install yt-dlp

# Git
echo "📁 Installation Git..."
sudo apt install -y git

# PM2 pour maintenir le bot actif
echo "⚡ Installation PM2..."
sudo npm install -g pm2

# Créer dossier projet
echo "📂 Création du dossier projet..."
mkdir -p ~/whatsapp-bot
cd ~/whatsapp-bot

# Télécharger les fichiers du bot (si depuis GitHub)
if [ ! -z "$1" ]; then
    echo "📥 Téléchargement depuis GitHub..."
    git clone $1 .
else
    echo "📝 Prêt pour upload manuel des fichiers"
fi

# Installer dépendances Node.js
if [ -f "package.json" ]; then
    echo "📦 Installation dépendances Node.js..."
    npm install
fi

# Configuration firewall
echo "🔥 Configuration firewall..."
sudo ufw allow 3000
sudo ufw --force enable

# Permissions yt-dlp
echo "🔧 Configuration des permissions..."
export PATH="$HOME/.local/bin:$PATH"
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc

# Vérification installations
echo "✅ Vérification des installations..."
echo "Node.js version:"
node --version
echo "Python version:"
python3 --version
echo "FFmpeg version:"
ffmpeg -version | head -1
echo "yt-dlp version:"
yt-dlp --version

echo ""
echo "🎉 INSTALLATION TERMINÉE !"
echo "📋 Tout est installé automatiquement :"
echo "   ✅ Node.js 18"
echo "   ✅ Python 3 + pip"
echo "   ✅ FFmpeg"
echo "   ✅ yt-dlp"
echo "   ✅ PM2"
echo "   ✅ Git"
echo "   ✅ Firewall configuré"
echo ""
echo "🚀 Prochaine étape :"
echo "   1. Uploadez vos fichiers bot dans ~/whatsapp-bot/"
echo "   2. Lancez: npm start"
echo "   3. Scannez le QR code WhatsApp"
echo ""
echo "💡 Pour maintenir le bot actif :"
echo "   pm2 start index.js --name whatsapp-bot"
echo "   pm2 startup"
echo "   pm2 save"