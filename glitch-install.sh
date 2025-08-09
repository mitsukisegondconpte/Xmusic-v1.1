#!/bin/bash
# Script d'installation pour Glitch

echo "🚀 Installation des dépendances pour le bot WhatsApp..."

# Mettre à jour les packages
sudo apt-get update

# Installer Python et pip
sudo apt-get install -y python3 python3-pip

# Installer FFmpeg
sudo apt-get install -y ffmpeg

# Installer yt-dlp
pip3 install yt-dlp

echo "✅ Installation terminée !"
echo "🎵 Le bot peut maintenant télécharger de la musique !"

# Démarrer le bot
npm start