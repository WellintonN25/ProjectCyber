// ===== CONFIGURAÇÃO DO JOGO =====
const CONFIG = {
    VERSION: '1.0',
    SAVE_KEY: 'neon_dash_save'
};

// ===== ESTADO DO JOGO =====
const gameState = {
    credits: 12450,
    level: 24,
    health: 85,
    attributes: {
        str: { value: 68, level: 7 },
        hack: { value: 94, level: 9 },
        agi: { value: 76, level: 6 }
    },
    inventory: [
        { id: 1, name: "Pistola", icon: "fas fa-gun" },
        { id: 2, name: "Armadura", icon: "fas fa-shield-alt" },
        { id: 3, name: "Kit Médico", icon: "fas fa-first-aid" },
        { id: 4, name: "Hack Tool", icon: "fas fa-screwdriver" },
        { id: 5, name: "Chave", icon: "fas fa-key" },
        { id: 6, name: "Chip", icon: "fas fa-microchip" }
    ],
    missions: [
        { id: 1, name: "Infiltrar Base", desc: "Entre na base inimiga", reward: 1500, completed: false },
        { id: 2, name: "Roubar Dados", desc: "Obtenha dados confidenciais", reward: 2500, completed: false },
        { id: 3, name: "Desativar Sistema", desc: "Desative o sistema de segurança", reward: 1800, completed: true }
    ],
    location: "downtown"
};

// ===== ELEMENTOS DOM =====
const DOM = {
    credits: document.getElementById('credits'),
    level: document.getElementById('level'),
    health: document.getElementById('health'),
    
    // Status bars
    strValue: document.getElementById('strValue'),
    strBar: document.getElementById('strBar'),
    hackValue: document.getElementById('hackValue'),
    hackBar: document.getElementById('hackBar'),
    agiValue: document.getElementById('agiValue'),
    agiBar: document.getElementById('agiBar'),
    
    // Level displays
    strLvl: document.getElementById('strLvl'),
    hackLvl: document.getElementById('hackLvl'),
    agiLvl: document.getElementById('agiLvl'),
    
    // Lists
    missionsList: document.getElementById('missionsList'),
    inventoryGrid: document.getElementById('inventoryGrid'),
    
    // Modal
    modal: document.getElementById('modal'),
    modalTitle: document.getElementById('modalTitle'),
    modalText: document.getElementById('modalText'),
    modalCancel: document.getElementById('modalCancel'),
    modalConfirm: document.getElementById('modalConfirm'),
    
    // Console
    console: document.getElementById('console'),
    commandInput: document.getElementById('commandInput'),
    clearConsole: document.getElementById('clearConsole')
};

// ===== INICIALIZAÇÃO =====
class Game {
    constructor() {
        this.init();
    }
    
    init() {
        this.createParticles();
        this.setupEventListeners();
        this.updateUI();
        this.setupModal();
        this.setupConsole();
        
        this.log('Sistema inicializado', 'system');
        this.log('Bem-vindo ao NEON DASH', 'success');
    }
    
    // ===== PARTÍCULAS =====
    createParticles() {
        const container = document.getElementById('particles');
        for (let i = 0; i < 20; i++) {
            const p = document.createElement('div');
            p.style.cssText = `
                position: absolute;
                width: ${Math.random() * 3 + 1}px;
                height: ${Math.random() * 3 + 1}px;
                background: #0ff0fc;
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                opacity: 0.5;
                animation: float ${Math.random() * 20 + 10}s infinite linear;
            `;
            container.appendChild(p);
        }
        
        // Adicionar animação CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0% { transform: translateY(0) translateX(0); }
                100% { transform: translateY(-100vh) translateX(100px); }
            }
        `;
        document.head.appendChild(style);
    }
    
    // ===== EVENT LISTENERS =====
    setupEventListeners() {
        // Menu buttons
        document.querySelectorAll('.menu-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Remove active from all
                document.querySelectorAll('.menu-btn').forEach(b => b.classList.remove('active'));
                // Add active to clicked
                e.target.classList.add('active');
                
                // Show corresponding tab
                const tab = e.target.dataset.tab;
                document.querySelectorAll('.tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                document.getElementById(`${tab}Tab`).classList.add('active');
            });
        });
        
        // Upgrade buttons
        document.querySelectorAll('.btn-upgrade').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const stat = e.target.dataset.stat;
                this.upgradeAttribute(stat);
            });
        });
        
        // Mission button
        document.getElementById('newMissionBtn')?.addEventListener('click', () => {
            this.generateMission();
        });
        
        // Inventory buttons
        document.getElementById('buyBtn')?.addEventListener('click', () => {
            this.buyItem();
        });
        
        document.getElementById('sellBtn')?.addEventListener('click', () => {
            this.sellItem();
        });
        
        // Travel button
        document.getElementById('travelBtn')?.addEventListener('click', () => {
            this.travel();
        });
        
        // Settings buttons
        document.getElementById('saveBtn')?.addEventListener('click', () => {
            this.saveGame();
        });
        
        document.getElementById('loadBtn')?.addEventListener('click', () => {
            this.loadGame();
        });
        
        // Volume slider
        document.getElementById('volume')?.addEventListener('input', (e) => {
            document.getElementById('volumeValue').textContent = `${e.target.value}%`;
        });
        
        // Effects toggle
        document.getElementById('effects')?.addEventListener('change', (e) => {
            const particles = document.getElementById('particles');
            particles.style.display = e.target.checked ? 'block' : 'none';
        });
        
        // Click missions
        document.addEventListener('click', (e) => {
            if (e.target.closest('.mission')) {
                const mission = e.target.closest('.mission');
                const missionId = parseInt(mission.dataset.id);
                this.startMission(missionId);
            }
            
            if (e.target.closest('.location')) {
                document.querySelectorAll('.location').forEach(loc => {
                    loc.classList.remove('active');
                });
                e.target.closest('.location').classList.add('active');
            }
        });
        
        // Logo click effect
        document.getElementById('logo').addEventListener('click', () => {
            this.log('Sistema NEON DASH v1.0', 'system');
            const logo = document.getElementById('logo');
            logo.style.animation = 'none';
            setTimeout(() => logo.style.animation = '', 100);
        });
    }
    
    // ===== ATUALIZAÇÃO DA UI =====
    updateUI() {
        // Credits, level, health
        DOM.credits.textContent = gameState.credits.toLocaleString();
        DOM.level.textContent = gameState.level;
        DOM.health.textContent = gameState.health;
        
        // Attribute values
        DOM.strValue.textContent = `${gameState.attributes.str.value}%`;
        DOM.hackValue.textContent = `${gameState.attributes.hack.value}%`;
        DOM.agiValue.textContent = `${gameState.attributes.agi.value}%`;
        
        // Attribute bars
        DOM.strBar.style.width = `${gameState.attributes.str.value}%`;
        DOM.hackBar.style.width = `${gameState.attributes.hack.value}%`;
        DOM.agiBar.style.width = `${gameState.attributes.agi.value}%`;
        
        // Levels
        DOM.strLvl.textContent = gameState.attributes.str.level;
        DOM.hackLvl.textContent = gameState.attributes.hack.level;
        DOM.agiLvl.textContent = gameState.attributes.agi.level;
        
        // Update missions list
        this.updateMissionsList();
        
        // Update inventory
        this.updateInventory();
    }
    
    updateMissionsList() {
        if (!DOM.missionsList) return;
        
        DOM.missionsList.innerHTML = '';
        gameState.missions.forEach(mission => {
            const div = document.createElement('div');
            div.className = `mission ${mission.completed ? 'completed' : ''}`;
            div.dataset.id = mission.id;
            div.innerHTML = `
                <h4>${mission.name}</h4>
                <p>${mission.desc}</p>
                <div class="reward">${mission.reward}cr</div>
            `;
            DOM.missionsList.appendChild(div);
        });
    }
    
    updateInventory() {
        if (!DOM.inventoryGrid) return;
        
        DOM.inventoryGrid.innerHTML = '';
        gameState.inventory.forEach(item => {
            const div = document.createElement('div');
            div.className = 'item';
            div.innerHTML = `
                <i class="${item.icon}"></i>
                <span>${item.name}</span>
            `;
            DOM.inventoryGrid.appendChild(div);
        });
        
        // Add empty slots
        const emptySlots = 12 - gameState.inventory.length;
        for (let i = 0; i < emptySlots; i++) {
            const div = document.createElement('div');
            div.className = 'item';
            div.innerHTML = `
                <i class="fas fa-plus"></i>
                <span>Vazio</span>
            `;
            DOM.inventoryGrid.appendChild(div);
        }
    }
    
    // ===== SISTEMA DE MISSÕES =====
    generateMission() {
        const missions = [
            { name: "Proteger VIP", desc: "Escolte o VIP até o local seguro", reward: 1200 },
            { name: "Hackear Sistema", desc: "Invada o sistema de segurança", reward: 2000 },
            { name: "Coletar Amostra", desc: "Obtenha a amostra biológica", reward: 800 },
            { name: "Eliminar Alvo", desc: "Neutralize o alvo especificado", reward: 3000 }
        ];
        
        const mission = missions[Math.floor(Math.random() * missions.length)];
        mission.id = Date.now();
        mission.completed = false;
        
        gameState.missions.push(mission);
        this.updateMissionsList();
        
        this.log(`Nova missão disponível: ${mission.name}`, 'success');
    }
    
    startMission(missionId) {
        const mission = gameState.missions.find(m => m.id === missionId);
        if (!mission || mission.completed) return;
        
        this.showModal(
            'INICIAR MISSÃO',
            `Iniciar missão "${mission.name}"?<br>Recompensa: ${mission.reward}cr`,
            () => {
                this.log(`Iniciando missão: ${mission.name}`, 'system');
                
                // Simulate mission completion after delay
                setTimeout(() => {
                    mission.completed = true;
                    gameState.credits += mission.reward;
                    
                    this.updateUI();
                    this.log(`Missão concluída! +${mission.reward}cr`, 'success');
                }, 2000);
            }
        );
    }
    
    // ===== SISTEMA DE ATRIBUTOS =====
    upgradeAttribute(stat) {
        const attr = gameState.attributes[stat];
        if (!attr) return;
        
        if (attr.value >= 100) {
            this.log('Este atributo já está no máximo!', 'error');
            return;
        }
        
        const cost = this.getUpgradeCost(stat);
        
        if (gameState.credits < cost) {
            this.log(`Créditos insuficientes. Necessário: ${cost}cr`, 'error');
            return;
        }
        
        this.showModal(
            'MELHORAR ATRIBUTO',
            `Melhorar ${stat.toUpperCase()}?<br>Custo: ${cost}cr`,
            () => {
                gameState.credits -= cost;
                attr.value = Math.min(100, attr.value + 5);
                attr.level++;
                
                this.updateUI();
                this.log(`${stat.toUpperCase()} melhorado para ${attr.value}%`, 'success');
            }
        );
    }
    
    getUpgradeCost(stat) {
        const base = {
            str: 500,
            hack: 750,
            agi: 450
        };
        return Math.floor(base[stat] * (1 + gameState.attributes[stat].level * 0.1));
    }
    
    // ===== INVENTÁRIO =====
    buyItem() {
        if (gameState.credits < 1000) {
            this.log('Créditos insuficientes para comprar item', 'error');
            return;
        }
        
        if (gameState.inventory.length >= 12) {
            this.log('Inventário cheio!', 'error');
            return;
        }
        
        this.showModal(
            'COMPRAR ITEM',
            'Comprar item aleatório por 1000cr?',
            () => {
                const items = [
                    { name: "Visão Noturna", icon: "fas fa-eye" },
                    { name: "Drone", icon: "fas fa-robot" },
                    { name: "Implante", icon: "fas fa-microchip" },
                    { name: "Nanites", icon: "fas fa-atom" }
                ];
                
                const item = items[Math.floor(Math.random() * items.length)];
                item.id = Date.now();
                
                gameState.inventory.push(item);
                gameState.credits -= 1000;
                
                this.updateUI();
                this.log(`Item comprado: ${item.name}`, 'success');
            }
        );
    }
    
    sellItem() {
        if (gameState.inventory.length === 0) {
            this.log('Inventário vazio!', 'error');
            return;
        }
        
        this.showModal(
            'VENDER ITEM',
            'Vender item aleatório por 500cr?',
            () => {
                const index = Math.floor(Math.random() * gameState.inventory.length);
                const item = gameState.inventory.splice(index, 1)[0];
                
                gameState.credits += 500;
                
                this.updateUI();
                this.log(`Item vendido: ${item.name}`, 'success');
            }
        );
    }
    
    // ===== SISTEMA DE VIAGENS =====
    travel() {
        const activeLoc = document.querySelector('.location.active');
        if (!activeLoc) return;
        
        const location = activeLoc.dataset.loc;
        const costText = activeLoc.querySelector('span').textContent;
        const cost = parseInt(costText.match(/\d+/)[0]);
        
        if (gameState.credits < cost) {
            this.log(`Créditos insuficientes para viajar. Necessário: ${cost}cr`, 'error');
            return;
        }
        
        this.showModal(
            'VIAJAR',
            `Viajar para ${location.toUpperCase()} por ${cost}cr?`,
            () => {
                gameState.credits -= cost;
                gameState.location = location;
                
                this.updateUI();
                this.log(`Viajando para ${location}...`, 'system');
                
                setTimeout(() => {
                    this.log(`Chegou em ${location.toUpperCase()}!`, 'success');
                }, 1000);
            }
        );
    }
    
    // ===== MODAL SYSTEM =====
    setupModal() {
        if (!DOM.modal) return;
        
        DOM.modalCancel.addEventListener('click', () => this.hideModal());
        DOM.modalConfirm.addEventListener('click', () => {
            if (this.modalCallback) {
                this.modalCallback();
                this.modalCallback = null;
            }
            this.hideModal();
        });
        
        // Close on outside click
        DOM.modal.addEventListener('click', (e) => {
            if (e.target === DOM.modal) {
                this.hideModal();
            }
        });
        
        // Close on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && DOM.modal.classList.contains('active')) {
                this.hideModal();
            }
        });
    }
    
    showModal(title, text, callback) {
        if (!DOM.modal) return;
        
        DOM.modalTitle.textContent = title;
        DOM.modalText.innerHTML = text;
        this.modalCallback = callback;
        DOM.modal.classList.add('active');
    }
    
    hideModal() {
        if (!DOM.modal) return;
        DOM.modal.classList.remove('active');
        this.modalCallback = null;
    }
    
    // ===== CONSOLE SYSTEM =====
    setupConsole() {
        if (!DOM.commandInput) return;
        
        // Enter command
        DOM.commandInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const cmd = DOM.commandInput.value.trim().toLowerCase();
                DOM.commandInput.value = '';
                
                if (cmd) {
                    this.log(`> ${cmd}`, 'user');
                    this.processCommand(cmd);
                }
            }
        });
        
        // Clear console
        if (DOM.clearConsole) {
            DOM.clearConsole.addEventListener('click', () => {
                DOM.console.innerHTML = '';
                this.log('Console limpo', 'system');
            });
        }
    }
    
    log(message, type = 'system') {
        if (!DOM.console) return;
        
        const div = document.createElement('div');
        div.className = `log ${type}`;
        div.textContent = message;
        DOM.console.appendChild(div);
        
        // Auto scroll
        DOM.console.scrollTop = DOM.console.scrollHeight;
    }
    
    processCommand(cmd) {
        switch(cmd) {
            case 'help':
                this.log('Comandos: help, credits, level, missions, inventory, clear, save, load', 'system');
                break;
                
            case 'credits':
                this.log(`Créditos: ${gameState.credits}cr`, 'system');
                break;
                
            case 'level':
                this.log(`Nível: ${gameState.level}`, 'system');
                break;
                
            case 'missions':
                this.log('Missões ativas:', 'system');
                gameState.missions.forEach(m => {
                    if (!m.completed) {
                        this.log(`  ${m.name}: ${m.reward}cr`, 'system');
                    }
                });
                break;
                
            case 'inventory':
                this.log(`Inventário: ${gameState.inventory.length} itens`, 'system');
                gameState.inventory.forEach(item => {
                    this.log(`  ${item.name}`, 'system');
                });
                break;
                
            case 'clear':
                DOM.console.innerHTML = '';
                break;
                
            case 'save':
                this.saveGame();
                break;
                
            case 'load':
                this.loadGame();
                break;
                
            default:
                this.log(`Comando desconhecido: ${cmd}`, 'error');
        }
    }
    
    // ===== SAVE/LOAD SYSTEM =====
    saveGame() {
        try {
            const saveData = {
                ...gameState,
                saveTime: Date.now(),
                version: CONFIG.VERSION
            };
            
            localStorage.setItem(CONFIG.SAVE_KEY, JSON.stringify(saveData));
            this.log('Jogo salvo com sucesso!', 'success');
            return true;
        } catch (e) {
            this.log(`Erro ao salvar: ${e.message}`, 'error');
            return