// Game configuration
const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;
const COLORS = [
    'transparent',
    '#ff6b6b', // Red - I
    '#4ecdc4', // Cyan - O
    '#ffe66d', // Yellow - T
    '#a8e6cf', // Green - S
    '#ff8b94', // Pink - Z
    '#95e1d3', // Light Blue - J
    '#f38181'  // Coral - L
];

// Tetromino shapes
const SHAPES = [
    [],
    // I piece
    [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ],
    // O piece
    [
        [1, 1],
        [1, 1]
    ],
    // T piece
    [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0]
    ],
    // S piece
    [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0]
    ],
    // Z piece
    [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]
    ],
    // J piece
    [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0]
    ],
    // L piece
    [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0]
    ]
];

class Tetris {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.nextCanvas = document.getElementById('nextCanvas');
        this.nextCtx = this.nextCanvas.getContext('2d');
        
        this.board = [];
        this.currentPiece = null;
        this.nextPiece = null;
        this.score = 0;
        this.lines = 0;
        this.level = 1;
        this.dropCounter = 0;
        this.dropInterval = 1000;
        this.lastTime = 0;
        this.isPaused = false;
        this.isGameOver = false;
        
        this.init();
    }
    
    init() {
        // Initialize empty board
        this.board = Array(ROWS).fill(0).map(() => Array(COLS).fill(0));
        
        // Create first pieces
        this.currentPiece = this.createPiece();
        this.nextPiece = this.createPiece();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Start game loop
        this.gameLoop();
    }
    
    createPiece() {
        const type = Math.floor(Math.random() * 7) + 1;
        return {
            x: Math.floor(COLS / 2) - 1,
            y: 0,
            type: type,
            shape: SHAPES[type]
        };
    }
    
    setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            if (this.isGameOver || this.isPaused) {
                if (e.key === 'p' || e.key === 'P') {
                    this.togglePause();
                }
                return;
            }
            
            switch(e.key) {
                case 'a':
                case 'A':
                case 'ArrowLeft':
                    this.movePiece(-1, 0);
                    break;
                case 'd':
                case 'D':
                case 'ArrowRight':
                    this.movePiece(1, 0);
                    break;
                case 's':
                case 'S':
                case 'ArrowDown':
                    this.movePiece(0, 1);
                    break;
                case 'w':
                case 'W':
                case 'ArrowUp':
                    this.rotatePiece();
                    break;
                case ' ':
                    this.hardDrop();
                    break;
                case 'p':
                case 'P':
                    this.togglePause();
                    break;
            }
        });
        
        document.getElementById('pauseBtn').addEventListener('click', () => {
            this.togglePause();
        });
        
        document.getElementById('restartBtn').addEventListener('click', () => {
            this.restart();
        });
    }
    
    movePiece(dx, dy) {
        if (this.isCollision(this.currentPiece, dx, dy)) {
            if (dy > 0) {
                this.placePiece();
                return;
            }
            return;
        }
        
        this.currentPiece.x += dx;
        this.currentPiece.y += dy;
    }
    
    rotatePiece() {
        const rotated = this.rotate(this.currentPiece.shape);
        const original = this.currentPiece.shape;
        
        this.currentPiece.shape = rotated;
        
        if (this.isCollision(this.currentPiece, 0, 0)) {
            // Try wall kick
            if (!this.isCollision(this.currentPiece, -1, 0)) {
                this.currentPiece.x -= 1;
            } else if (!this.isCollision(this.currentPiece, 1, 0)) {
                this.currentPiece.x += 1;
            } else {
                this.currentPiece.shape = original;
            }
        }
    }
    
    rotate(matrix) {
        const N = matrix.length;
        const rotated = Array(N).fill(0).map(() => Array(N).fill(0));
        
        for (let i = 0; i < N; i++) {
            for (let j = 0; j < N; j++) {
                rotated[j][N - 1 - i] = matrix[i][j];
            }
        }
        
        return rotated;
    }
    
    hardDrop() {
        while (!this.isCollision(this.currentPiece, 0, 1)) {
            this.currentPiece.y++;
        }
        this.placePiece();
    }
    
    isCollision(piece, dx = 0, dy = 0) {
        const shape = piece.shape;
        
        for (let y = 0; y < shape.length; y++) {
            for (let x = 0; x < shape[y].length; x++) {
                if (shape[y][x]) {
                    const newX = piece.x + x + dx;
                    const newY = piece.y + y + dy;
                    
                    if (newX < 0 || newX >= COLS || newY >= ROWS) {
                        return true;
                    }
                    
                    if (newY >= 0 && this.board[newY][newX]) {
                        return true;
                    }
                }
            }
        }
        
        return false;
    }
    
    placePiece() {
        const shape = this.currentPiece.shape;
        
        for (let y = 0; y < shape.length; y++) {
            for (let x = 0; x < shape[y].length; x++) {
                if (shape[y][x]) {
                    const boardY = this.currentPiece.y + y;
                    const boardX = this.currentPiece.x + x;
                    
                    if (boardY >= 0) {
                        this.board[boardY][boardX] = this.currentPiece.type;
                    } else {
                        this.gameOver();
                        return;
                    }
                }
            }
        }
        
        this.clearLines();
        this.currentPiece = this.nextPiece;
        this.nextPiece = this.createPiece();
    }
    
    clearLines() {
        let linesCleared = 0;
        
        for (let y = ROWS - 1; y >= 0; y--) {
            if (this.board[y].every(cell => cell !== 0)) {
                this.board.splice(y, 1);
                this.board.unshift(Array(COLS).fill(0));
                linesCleared++;
                y++;
            }
        }
        
        if (linesCleared > 0) {
            this.lines += linesCleared;
            this.score += [0, 40, 100, 300, 1200][linesCleared] * (this.level + 1);
            this.level = Math.floor(this.lines / 10) + 1;
            this.dropInterval = Math.max(100, 1000 - (this.level - 1) * 100);
            
            this.updateScore();
        }
    }
    
    updateScore() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('lines').textContent = this.lines;
        document.getElementById('level').textContent = this.level;
    }
    
    draw() {
        // Clear canvas
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw board
        this.drawBoard();
        
        // Draw current piece
        if (this.currentPiece && !this.isGameOver) {
            this.drawPiece(this.currentPiece, this.ctx);
        }
        
        // Draw next piece
        this.drawNextPiece();
    }
    
    drawBoard() {
        for (let y = 0; y < ROWS; y++) {
            for (let x = 0; x < COLS; x++) {
                if (this.board[y][x]) {
                    this.ctx.fillStyle = COLORS[this.board[y][x]];
                    this.ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                    this.ctx.strokeStyle = '#fff';
                    this.ctx.lineWidth = 2;
                    this.ctx.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                }
            }
        }
    }
    
    drawPiece(piece, ctx) {
        ctx.fillStyle = COLORS[piece.type];
        const shape = piece.shape;
        
        for (let y = 0; y < shape.length; y++) {
            for (let x = 0; x < shape[y].length; x++) {
                if (shape[y][x]) {
                    const drawX = (piece.x + x) * BLOCK_SIZE;
                    const drawY = (piece.y + y) * BLOCK_SIZE;
                    ctx.fillRect(drawX, drawY, BLOCK_SIZE, BLOCK_SIZE);
                    ctx.strokeStyle = '#fff';
                    ctx.lineWidth = 2;
                    ctx.strokeRect(drawX, drawY, BLOCK_SIZE, BLOCK_SIZE);
                }
            }
        }
    }
    
    drawNextPiece() {
        this.nextCtx.fillStyle = '#000';
        this.nextCtx.fillRect(0, 0, this.nextCanvas.width, this.nextCanvas.height);
        
        if (this.nextPiece) {
            const shape = this.nextPiece.shape;
            const startX = (this.nextCanvas.width - shape[0].length * 20) / 2;
            const startY = (this.nextCanvas.height - shape.length * 20) / 2;
            
            this.nextCtx.fillStyle = COLORS[this.nextPiece.type];
            
            for (let y = 0; y < shape.length; y++) {
                for (let x = 0; x < shape[y].length; x++) {
                    if (shape[y][x]) {
                        this.nextCtx.fillRect(startX + x * 20, startY + y * 20, 20, 20);
                        this.nextCtx.strokeStyle = '#fff';
                        this.nextCtx.lineWidth = 1;
                        this.nextCtx.strokeRect(startX + x * 20, startY + y * 20, 20, 20);
                    }
                }
            }
        }
    }
    
    gameLoop(time = 0) {
        const deltaTime = time - this.lastTime;
        this.lastTime = time;
        
        if (!this.isPaused && !this.isGameOver) {
            this.dropCounter += deltaTime;
            
            if (this.dropCounter > this.dropInterval) {
                this.movePiece(0, 1);
                this.dropCounter = 0;
            }
        }
        
        this.draw();
        requestAnimationFrame((time) => this.gameLoop(time));
    }
    
    togglePause() {
        if (this.isGameOver) return;
        
        this.isPaused = !this.isPaused;
        const btn = document.getElementById('pauseBtn');
        btn.textContent = this.isPaused ? 'Продолжить' : 'Пауза';
    }
    
    gameOver() {
        this.isGameOver = true;
        document.getElementById('gameOver').style.display = 'block';
    }
    
    restart() {
        this.board = Array(ROWS).fill(0).map(() => Array(COLS).fill(0));
        this.currentPiece = this.createPiece();
        this.nextPiece = this.createPiece();
        this.score = 0;
        this.lines = 0;
        this.level = 1;
        this.dropCounter = 0;
        this.dropInterval = 1000;
        this.isPaused = false;
        this.isGameOver = false;
        
        document.getElementById('gameOver').style.display = 'none';
        document.getElementById('pauseBtn').textContent = 'Пауза';
        this.updateScore();
    }
}

// Start the game
const game = new Tetris();

