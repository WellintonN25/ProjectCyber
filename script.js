// ===== CONFIGURAÇÕES DO JOGO =====
const CONFIG = {
    VERSION: '2.4.7',
    BUILD: '7842',
    SAVE_KEY: 'cyberpunk_game_save',
    AUTO_SAVE_INTERVAL: 30000 // 30 segundos
};

// ===== ESTADO DO JOGO =====
const gameState = {
    // Informações básicas
    playerName: 'NEXUS_ONE',
    credits: 12450,
    level: 24,
    experience: 18500,
    nextLevelExp: 24000,
    
    // Atributos vitais
    health: 85,
    maxHealth: 100,
    energy: 72,
    maxEnergy: 100,
    
    // Atributos do personagem
    attributes: {
        strength: { value: 68, level: 7 },
        hacking: { value: 94, level: 9 },
        agility: { value: 76, level: 6 },
        intelligence: { value: 88, level: 8 }
    },
    
    // Inventário
    inventory: [
        { id: 1, name: "Pistola Laser", type: "weapon", icon: "fas fa-gun", value: 1200 },
        { id: 2, name: "Armadura Tática", type: "armor", icon: "fas fa-shield-alt", value: 800 },
        { id: 3, name: "Kit Médico Avançado", type: "health", icon: "fas fa-first-aid", value: 500 },
        { id: 4, name: "Hack Tool Mk.III", type: "tool", icon: "fas fa-screwdriver-wrench", value: 1500 },
        { id: 5, name: "Bateria de Energia", type: "energy", icon: "fas fa-battery-full", value: 300 },
        { id: 6, name: "Dados Confidenciais", type: "data", icon: "fas fa-database", value: 2000 },
        { id: 7, name: "Chave de Acesso", type: "key", icon: "fas fa-key", value: 400 },
        { id: 8, name: "Chip Neural", type: "chip", icon: "fas fa-microchip", value: 1800 },
        { id: 9, name: "Óculos de Visão Noturna", type: "vision", icon: "fas fa-glasses", value: 900 },
        { id: 10, name: "Comms Encrypted", type: "comms", icon: "fas fa-walkie-talkie", value: 600 },
        { id: 11, name: "Munição Laser", type: "ammo", icon: "fas fa-bullseye", value: 100 },
        { id: 12, name: "Criptomoedas", type: "money", icon: "fas fa-money-bill-wave", value: 2500 }
    ],
    
    // Sistema de missões
    missions: [
        { 
            id: 1, 
            name: "Infiltrar a Corporação", 
            description: "Entre na Megacorp sem ser detectado pelos sistemas de segurança",
            reward: 1500, 
            xpReward: 500,
            completed: true, 
            active: false,
            difficulty: "Média",
            location: "downtown"
        },
        { 
            id: 2, 
            name: "Roubar Dados Confidenciais", 
            description: "Acesse o servidor principal e copie os dados da nova tecnologia",
            reward: 2500, 
            xpReward: 800,
            completed: false, 
            active: true,
            difficulty: "Alta",
            location: "cybercore"
        },
        { 
            id: 3, 
            name: "Desativar Sistema de Segurança", 
            description: "Encontre e desative o sistema de segurança do prédio principal",
            reward: 1800, 
            xpReward: 600,
            completed: false, 
            active: false,
            difficulty: "Média",
            location: "downtown"
        },
        { 
            id: 4, 
            name: "Encontrar o Informante", 
            description: "Encontre o informante no setor 7 para obter informações cruciais",
            reward: 1200, 
            xpReward: 400,
            completed: false, 
            active: false,
            difficulty: "Baixa",
            location: "residential"
        },
        { 
            id: 5, 
            name: "Hackear Terminal Principal", 
            description: "Use suas habilidades de hacking para acessar o terminal central",
            reward: 3000, 
            xpReward: 1000,
            completed: false, 
            active: false,
            difficulty: "Muito Alta",
            location: "cybercore"
        },
        { 
            id: 6, 
            name: "Eliminar Guardas da Área", 
            description: "Neutralize os guardas da área sem alertar reforços",
            reward: 2000, 
            xpReward: 700,
            completed: false, 
            active: false,
            difficulty: "Alta",
            location: "docks"
        }
    ],
    
    // Progresso do jogo
    currentLocation: "downtown",
    gameTime: 0, // Em segundos
    alerts: [
        { id: 1, text: "Novo update disponível para sistema", type: "warning", timestamp: Date.now() },
        { id: 2, text: "Conexão segura estabelecida com servidor", type: "success", timestamp: Date.now() },
        { id: 3, text: "Alerta: Servidor 03 sob ataque", type: "error", timestamp: Date.now() }
    ],
    
    // Configurações
    settings: {
        volume: 80,
        sfxEnabled: true,
        theme: "neon",
        effectsEnabled: true,
        difficulty: "normal",
        autosave: true
    }
};

// ===== ELEMENTOS DO DOM =====
const DOM = {
    // Header
    creditsValue: document.getElementById('creditsValue'),
    levelValue: document.getElementById('levelValue'),
    healthValue: document.getElementById('healthValue'),
    energyValue: document.getElementById('energyValue'),
    
    // Side panel stats
    strengthValue: document.getElementById('strengthValue'),
    hackingValue: document.getElementById('hackingValue'),
    agilityValue: document.getElementById('agilityValue'),
    intelligenceValue: document.getElementById('intelligenceValue'),
    strengthBar: document.getElementById('strengthBar'),
    hackingBar: document.getElementById('hackingBar'),
    agilityBar: document.getElementById('agilityBar'),
    intelligenceBar: document.getElementById('intelligenceBar'),
    
    // Lists and grids
    missionsList: document.getElementById('missionsList'),
    missionsGrid: document.getElementById('missionsGrid'),
    inventoryGrid: document.getElementById('inventoryGrid'),
    alertsContainer: document.getElementById('alertsContainer'),
    
    // Content areas
    contentAreas: document.querySelectorAll('.content-area'),
    
    // Modal
    modal: document.getElementById('confirmationModal'),
    modalTitle: document.getElementById('modalTitle'),
    modalMessage: document.getElementById('modalMessage'),
    modalConfirm: document.getElementById('modalConfirm'),
    modalCancel: document.getElementById('modalCancel'),
    
    // Console
    consoleOutput: document.getElementById('consoleOutput'),
    consoleInput: document.getElementById('consoleInput'),
    
    // Buttons
    menuButtons: document.querySelectorAll('.menu-btn'),
    upgradeButtons: document.querySelectorAll('.upgrade-btn'),
    buyItemBtn: document.getElementById('buyItemBtn'),
    sellItemBtn: document.getElementById('sellItemBtn'),
    travelBtn: document.getElementById('travelBtn'),
    clearConsoleBtn: document.getElementById('clearConsoleBtn'),
    
    // Footer buttons
    saveGameBtn: document.getElementById('saveGameBtn'),
    loadGameBtn: document.getElementById('loadGameBtn'),
    helpBtn: document.getElementById('helpBtn'),
    aboutBtn: document.getElementById('aboutBtn')
};

// ===== SISTEMA DE INICIALIZAÇÃO =====
class GameSystem {
    constructor() {
        this.particlesCreated = false;
        this.gameTimer = null;
        this.autoSaveTimer = null;
        this.currentModalCallback = null;
    }
    
    init() {
        console.log(`🚀 Inicializando NEON DASH v${CONFIG.VERSION}`);
        
        this.createParticles();
        this.setupEventListeners();
        this.loadGame(); // Tenta carregar jogo salvo
        this.updateAllUI();
        this.setupConsole();
        this.setupModal();
        this.startGameTimer();
        this.startAutoSave();
        
        this.addConsoleMessage("Sistema inicializado com sucesso", "system");
        this.addConsoleMessage(`Bem-vindo, ${gameState.playerName}`, "user");
        this.addConsoleMessage("Digite 'help' para ver comandos disponíveis", "system");
        
        // Mostrar área inicial
        this.showContentArea('missions');
    }
    
    // ===== SISTEMA DE PARTÍCULAS =====
    createParticles() {
        if (this.particlesCreated) return;
        
        const container = document.getElementById('particles');
        const count = 30;
        
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Tamanho aleatório
            const size = Math.random() * 4 + 1;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Posição aleatória
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            // Cor aleatória
            const colors = ['#0ff0fc', '#ff00ff', '#9d00ff', '#00ff9d'];
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            // Animação
            const duration = Math.random() * 30 + 20;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${Math.random() * 5}s`;
            
            container.appendChild(particle);
        }
        
        this.particlesCreated = true;
    }
    
    // ===== ATUALIZAÇÃO DA UI =====
    updateAllUI() {
        this.updateHeader();
        this.updateAttributes();
        this.updateMissionList();
        this.updateMissionsGrid();
        this.updateInventory();
        this.updateAlerts();
        this.updateSettingsUI();
    }
    
    updateHeader() {
        DOM.creditsValue.textContent = gameState.credits.toLocaleString();
        DOM.levelValue.textContent = gameState.level;
        DOM.healthValue.textContent = `${gameState.health}%`;
        DOM.energyValue.textContent = `${gameState.energy}%`;
        
        // Atualizar tempo de jogo
        const hours = Math.floor(gameState.gameTime / 3600);
        const minutes = Math.floor((gameState.gameTime % 3600) / 60);
        const seconds = gameState.gameTime % 60;
        document.getElementById('gameTime').textContent = 
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    updateAttributes() {
        const attrs = gameState.attributes;
        
        DOM.strengthValue.textContent = `${attrs.strength.value}%`;
        DOM.hackingValue.textContent = `${attrs.hacking.value}%`;
        DOM.agilityValue.textContent = `${attrs.agility.value}%`;
        DOM.intelligenceValue.textContent = `${attrs.intelligence.value}%`;
        
        DOM.strengthBar.style.width = `${attrs.strength.value}%`;
        DOM.hackingBar.style.width = `${attrs.hacking.value}%`;
        DOM.agilityBar.style.width = `${attrs.agility.value}%`;
        DOM.intelligenceBar.style.width = `${attrs.intelligence.value}%`;
        
        // Atualizar níveis nas cartas
        document.getElementById('strengthLevel').textContent = attrs.strength.level;
        document.getElementById('hackingLevel').textContent = attrs.hacking.level;
        document.getElementById('agilityLevel').textContent = attrs.agility.level;
        document.getElementById('intelligenceLevel').textContent = attrs.intelligence.level;
        
        // Atualizar barras de progresso
        document.querySelectorAll('.progress-fill').forEach((bar, i) => {
            const values = Object.values(attrs);
            if (values[i]) {
                bar.style.width = `${values[i].value}%`;
            }
        });
    }
    
    updateMissionList() {
        DOM.missionsList.innerHTML = '';
        
        gameState.missions.forEach(mission => {
            if (mission.completed || mission.active) {
                const li = document.createElement('li');
                li.className = `mission-item ${mission.completed ? 'completed' : ''} ${mission.active ? 'active' : ''}`;
                li.innerHTML = `
                    <strong>MISSÃO ${mission.id}:</strong> ${mission.name}
                    ${mission.completed ? ' ✓' : ''}
                `;
                li.addEventListener('click', () => this.selectMission(mission.id));
                DOM.missionsList.appendChild(li);
            }
        });
    }
    
    updateMissionsGrid() {
        DOM.missionsGrid.innerHTML = '';
        
        const availableMissions = gameState.missions.filter(m => !m.completed);
        
        if (availableMissions.length === 0) {
            DOM.missionsGrid.innerHTML = `
                <div class="content-card" style="grid-column: 1/-1; text-align: center;">
                    <h3 class="card-title">TODAS AS MISSÕES CONCLUÍDAS</h3>
                    <p class="card-desc">Novas missões serão disponibilizadas em breve...</p>
                </div>
            `;
            return;
        }
        
        availableMissions.forEach(mission => {
            const card = document.createElement('div');
            card.className = 'content-card';
            card.innerHTML = `
                <div class="mission-header">
                    <span class="mission-difficulty ${mission.difficulty.toLowerCase()}">${mission.difficulty}</span>
                    <span class="mission-location">${mission.location.toUpperCase()}</span>
                </div>
                <h3 class="card-title">${mission.name}</h3>
                <p class="card-desc">${mission.description}</p>
                <div class="mission-rewards">
                    <span class="reward-credits"><i class="fas fa-coins"></i> ${mission.reward}cr</span>
                    <span class="reward-xp"><i class="fas fa-star"></i> ${mission.xpReward}XP</span>
                </div>
                <button class="card-button mission-start-btn" data-mission-id="${mission.id}">
                    ${mission.active ? 'CONTINUAR MISSÃO' : 'INICIAR MISSÃO'}
                </button>
            `;
            DOM.missionsGrid.appendChild(card);
        });
        
        // Adicionar eventos aos botões de missão
        document.querySelectorAll('.mission-start-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const missionId = parseInt(e.target.dataset.missionId);
                this.startMission(missionId);
            });
        });
    }
    
    updateInventory() {
        DOM.inventoryGrid.innerHTML = '';
        const capacity = gameState.inventory.length;
        
        // Atualizar capacidade
        document.getElementById('inventoryCapacity').textContent = `${capacity}/24`;
        
        // Slots ocupados
        gameState.inventory.forEach(item => {
            const slot = this.createInventorySlot(item, false);
            DOM.inventoryGrid.appendChild(slot);
        });
        
        // Slots vazios
        for (let i = capacity; i < 24; i++) {
            const slot = this.createInventorySlot(null, true);
            DOM.inventoryGrid.appendChild(slot);
        }
    }
    
    createInventorySlot(item, isEmpty) {
        const slot = document.createElement('div');
        slot.className = `inventory-slot ${isEmpty ? 'empty' : ''}`;
        
        if (isEmpty) {
            slot.innerHTML = `
                <div class="slot-icon"><i class="fas fa-plus"></i></div>
                <div class="slot-name">VAZIO</div>
            `;
            slot.addEventListener('click', () => {
                this.addConsoleMessage("Slot vazio. Compre itens para preencher.", "info");
            });
        } else {
            slot.innerHTML = `
                <div class="slot-icon"><i class="${item.icon}"></i></div>
                <div class="slot-name">${item.name}</div>
            `;
            slot.addEventListener('click', () => {
                this.showItemDetails(item);
            });
        }
        
        return slot;
    }
    
    showItemDetails(item) {
        this.showModal(
            "DETALHES DO ITEM",
            `<strong>${item.name}</strong><br>
            Tipo: ${item.type.toUpperCase()}<br>
            Valor: ${item.value}cr<br><br>
            <small>ID: ${item.id}</small>`,
            null,
            false
        );
    }
    
    updateAlerts() {
        DOM.alertsContainer.innerHTML = '';
        
        gameState.alerts.forEach(alert => {
            const p = document.createElement('p');
            let icon = 'fas fa-info-circle';
            let color = '#0ff0fc';
            
            switch(alert.type) {
                case 'warning': icon = 'fas fa-exclamation-triangle'; color = '#ffff00'; break;
                case 'error': icon = 'fas fa-times-circle'; color = '#ff0033'; break;
                case 'success': icon = 'fas fa-check-circle'; color = '#00ff00'; break;
            }
            
            p.innerHTML = `<i class="${icon}" style="color: ${color};"></i> <span>${alert.text}</span>`;
            p.style.cursor = 'pointer';
            p.addEventListener('click', () => {
                this.removeAlert(alert.id);
            });
            DOM.alertsContainer.appendChild(p);
        });
    }
    
    removeAlert(alertId) {
        const index = gameState.alerts.findIndex(a => a.id === alertId);
        if (index > -1) {
            gameState.alerts.splice(index, 1);
            this.updateAlerts();
        }
    }
    
    updateSettingsUI() {
        // Atualizar sliders e toggles baseados no gameState.settings
        const settings = gameState.settings;
        
        if (document.getElementById('volumeSlider')) {
            document.getElementById('volumeSlider').value = settings.volume;
            document.getElementById('volumeValue').textContent = `${settings.volume}%`;
        }
        
        if (document.getElementById('sfxToggle')) {
            document.getElementById('sfxToggle').checked = settings.sfxEnabled;
        }
        
        if (document.getElementById('effectsToggle')) {
            document.getElementById('effectsToggle').checked = settings.effectsEnabled;
        }
        
        if (document.getElementById('autosaveToggle')) {
            document.getElementById('autosaveToggle').checked = settings.autosave;
        }
        
        if (document.getElementById('themeSelect')) {
            document.getElementById('themeSelect').value = settings.theme;
        }
        
        if (document.getElementById('difficultySelect')) {
            document.getElementById('difficultySelect').value = settings.difficulty;
        }
    }
    
    // ===== SISTEMA DE MISSÕES =====
    selectMission(missionId) {
        const mission = gameState.missions.find(m => m.id === missionId);
        if (!mission) return;
        
        // Desselecionar todas as missões
        gameState.missions.forEach(m => m.active = false);
        
        // Selecionar esta missão
        mission.active = true;
        
        this.updateMissionList();
        this.updateMissionsGrid();
        
        this.addConsoleMessage(`Missão "${mission.name}" selecionada`, "system");
    }
    
    startMission(missionId) {
        const mission = gameState.missions.find(m => m.id === missionId);
        if (!mission) {
            this.addConsoleMessage("Missão não encontrada", "error");
            return;
        }
        
        this.showModal(
            "INICIAR MISSÃO",
            `<strong>${mission.name}</strong><br>
            Local: ${mission.location.toUpperCase()}<br>
            Dificuldade: ${mission.difficulty}<br><br>
            Recompensa: ${mission.reward}cr + ${mission.xpReward}XP<br><br>
            <em>${mission.description}</em>`,
            () => {
                this.executeMission(mission);
            }
        );
    }
    
    executeMission(mission) {
        this.addConsoleMessage(`Iniciando missão: ${mission.name}`, "system");
        this.addConsoleMessage("Infiltração em andamento...", "info");
        
        // Simular progresso
        mission.active = true;
        this.updateMissionList();
        
        // Timer p