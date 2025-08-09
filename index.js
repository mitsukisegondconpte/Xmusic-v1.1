const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const TEMP_DIR = './temp';
const MAX_AUDIO_DURATION = 600; // 10 minutes max

// Créer le dossier temporaire
if (!fs.existsSync(TEMP_DIR)) {
    fs.mkdirSync(TEMP_DIR, { recursive: true });
}

// État des jeux TicTacToe par chat
const games = new Map();

// Initialisation du client WhatsApp
const client = new Client({
    authStrategy: new LocalAuth({
        name: "whatsapp-session"
    }),
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process',
            '--disable-gpu'
        ]
    }
});

// Gestion QR Code
client.on('qr', (qr) => {
    console.log('📱 Scannez ce QR code avec WhatsApp:');
    qrcode.generate(qr, { small: true });
    console.log('\n🔗 Ou utilisez ce lien: https://wa.me/qr/' + qr);
});

// Connexion réussie
client.on('ready', () => {
    console.log('✅ Bot WhatsApp connecté avec succès !');
    console.log('🎵 Commandes disponibles:');
    console.log('   /play [nom de la chanson] - Télécharger de la musique');
    console.log('   /ttt - Jouer au TicTacToe');
    console.log('   /help - Afficher l\'aide');
});

// Gestion des erreurs
client.on('auth_failure', () => {
    console.error('❌ Échec de l\'authentification');
});

client.on('disconnected', (reason) => {
    console.log('📴 Déconnecté:', reason);
});

// Classe TicTacToe
class TicTacToe {
    constructor() {
        this.board = Array(9).fill(null);
        this.currentPlayer = '⭕';
        this.gameOver = false;
        this.winner = null;
    }

    makeMove(position) {
        if (this.board[position] || this.gameOver) return false;
        
        this.board[position] = this.currentPlayer;
        
        if (this.checkWinner()) {
            this.gameOver = true;
            this.winner = this.currentPlayer;
        } else if (this.board.every(cell => cell !== null)) {
            this.gameOver = true;
            this.winner = 'draw';
        } else {
            this.currentPlayer = this.currentPlayer === '⭕' ? '❌' : '⭕';
        }
        
        return true;
    }

    checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Lignes
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colonnes
            [0, 4, 8], [2, 4, 6] // Diagonales
        ];

        return winPatterns.some(pattern => 
            pattern.every(index => 
                this.board[index] && this.board[index] === this.board[pattern[0]]
            )
        );
    }

    getBoardDisplay() {
        const display = this.board.map((cell, index) => {
            if (cell) return cell;
            return `${index + 1}️⃣`;
        });

        return `${display[0]}${display[1]}${display[2]}\n${display[3]}${display[4]}${display[5]}\n${display[6]}${display[7]}${display[8]}`;
    }

    getStatus() {
        if (this.gameOver) {
            if (this.winner === 'draw') return '🤝 Match nul !';
            return `🎉 ${this.winner} a gagné !`;
        }
        return `🎮 Tour de ${this.currentPlayer}`;
    }
}

// Fonction pour télécharger la musique
async function downloadMusic(query, chatId) {
    return new Promise((resolve, reject) => {
        const timestamp = Date.now();
        const outputPath = path.join(TEMP_DIR, `${chatId}_${timestamp}`);
        const audioFile = `${outputPath}.%(ext)s`;

        // Commande yt-dlp
        const ytdlpCmd = `yt-dlp -x --audio-format mp3 --audio-quality 0 -o "${audioFile}" "ytsearch:${query}" --max-duration ${MAX_AUDIO_DURATION}`;

        console.log(`🔍 Recherche: ${query}`);

        exec(ytdlpCmd, { timeout: 120000 }, (error, stdout, stderr) => {
            if (error) {
                console.error('Erreur yt-dlp:', error);
                reject(`❌ Erreur lors du téléchargement: ${error.message}`);
                return;
            }

            // Trouver le fichier téléchargé
            const files = fs.readdirSync(TEMP_DIR).filter(file => 
                file.startsWith(`${chatId}_${timestamp}`) && file.endsWith('.mp3')
            );

            if (files.length === 0) {
                reject('❌ Aucun fichier audio trouvé');
                return;
            }

            const finalPath = path.join(TEMP_DIR, files[0]);
            resolve(finalPath);
        });
    });
}

// Fonction de nettoyage des fichiers
function cleanupFile(filePath) {
    setTimeout(() => {
        try {
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
                console.log(`🗑️ Fichier supprimé: ${path.basename(filePath)}`);
            }
        } catch (error) {
            console.error('Erreur suppression:', error);
        }
    }, 60000); // Supprimer après 1 minute
}

// Gestionnaire de messages
client.on('message', async (message) => {
    const chat = await message.getChat();
    const chatId = chat.id._serialized;
    const messageBody = message.body.trim();

    // Commande /play
    if (messageBody.startsWith('/play ')) {
        const query = messageBody.substring(6).trim();
        
        if (!query) {
            message.reply('❌ Veuillez spécifier une chanson.\nExemple: /play Despacito');
            return;
        }

        try {
            await message.reply('🔍 Recherche en cours...');
            
            const audioPath = await downloadMusic(query, chatId);
            const media = MessageMedia.fromFilePath(audioPath);
            
            await message.reply(media, undefined, { 
                caption: `🎵 ${query}\n\n📧 Bot créé par jeff_mitsuki` 
            });
            
            cleanupFile(audioPath);
            
        } catch (error) {
            console.error('Erreur téléchargement:', error);
            message.reply(error);
        }
    }

    // Commande TicTacToe
    else if (messageBody === '/ttt') {
        games.set(chatId, new TicTacToe());
        const game = games.get(chatId);
        
        message.reply(`🎮 *TicTacToe démarré !*\n\n${game.getBoardDisplay()}\n\n${game.getStatus()}\n\nTapez un chiffre de 1 à 9 pour jouer !`);
    }

    // Mouvement TicTacToe
    else if (games.has(chatId) && /^[1-9]$/.test(messageBody)) {
        const game = games.get(chatId);
        const position = parseInt(messageBody) - 1;
        
        if (game.makeMove(position)) {
            const response = `🎮 *TicTacToe*\n\n${game.getBoardDisplay()}\n\n${game.getStatus()}`;
            
            if (game.gameOver) {
                games.delete(chatId);
                message.reply(response + '\n\nTapez /ttt pour rejouer !');
            } else {
                message.reply(response);
            }
        } else {
            message.reply('❌ Mouvement invalide ! Choisissez une case libre.');
        }
    }

    // Commande d'aide
    else if (messageBody === '/help') {
        const helpText = `🤖 *Bot WhatsApp - Aide*

🎵 *Musique:*
/play [titre] - Télécharger une chanson
Exemple: /play Despacito

🎮 *Jeux:*
/ttt - Jouer au TicTacToe

ℹ️ *Autres:*
/help - Afficher cette aide

👨‍💻 *Créateur:*
• Nom: jeff_mitsuki
• WhatsApp: 36846133
• Telegram: @jeff_mitsuki
• GitHub: mitsukisegondconpte`;

        message.reply(helpText);
    }
});

// Nettoyage périodique des fichiers temporaires
setInterval(() => {
    try {
        const files = fs.readdirSync(TEMP_DIR);
        const now = Date.now();
        
        files.forEach(file => {
            const filePath = path.join(TEMP_DIR, file);
            const stats = fs.statSync(filePath);
            
            // Supprimer les fichiers de plus de 5 minutes
            if (now - stats.mtime.getTime() > 300000) {
                fs.unlinkSync(filePath);
                console.log(`🗑️ Nettoyage: ${file}`);
            }
        });
    } catch (error) {
        console.error('Erreur nettoyage:', error);
    }
}, 300000); // Toutes les 5 minutes

// Démarrage du bot
console.log('🚀 Démarrage du bot WhatsApp...');
client.initialize();

// Gestion propre de l'arrêt
process.on('SIGINT', () => {
    console.log('\n🛑 Arrêt du bot...');
    client.destroy();
    process.exit();
});