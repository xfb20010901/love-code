document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.container').innerHTML += '<div class="hint">点击屏幕开始</div>';
    
    // 添加音乐控制按钮
    const musicControl = document.createElement('div');
    musicControl.className = 'music-control';
    musicControl.innerHTML = '🔇';
    musicControl.style.opacity = '1';
    document.body.appendChild(musicControl);
    
    // 初始化音频
    const audio = new Audio('background-music.mp3');
    audio.id = 'bgMusic';
    audio.loop = true;
    
    let isMusicPlaying = false;
    
    // 音乐控制按钮点击事件
    musicControl.addEventListener('click', async (e) => {
        e.stopPropagation();
        try {
            if (isMusicPlaying) {
                audio.pause();
                musicControl.innerHTML = '🔇';
            } else {
                await audio.play();
                musicControl.innerHTML = '🔊';
            }
            isMusicPlaying = !isMusicPlaying;
        } catch (err) {
            console.error('播放失败:', err);
            musicControl.style.animation = 'shake 0.5s ease-in-out';
        }
    });
    
    // 添加情话数组
    const loveMessages = [
        "我最喜欢你了",
        "你就是我的唯一",
        "余生请多指教",
        "我要一直陪在你身边",
        "你是我最重要的人",
        "遇见你是我最大的幸福"
    ];
    
    // 添加打字机效果
    function typeWriter(element, text, speed = 100) {
        if (!element) return;
        
        element.style.opacity = '0';
        element.innerHTML = '';
        
        setTimeout(() => {
            element.style.opacity = '1';
            let i = 0;
            function type() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            }
            type();
        }, 100);
    }
    
    // 创建可拖动的爱心
    function createDraggableHeart() {
        const heart = document.createElement('div');
        heart.className = 'draggable-heart';
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 80 + 10 + 'vw';
        heart.style.top = Math.random() * 80 + 10 + 'vh';
        
        let isDragging = false;
        let currentX;
        let currentY;
        let initialX;
        let initialY;
        
        heart.addEventListener('mousedown', dragStart);
        heart.addEventListener('touchstart', dragStart);
        document.addEventListener('mousemove', drag);
        document.addEventListener('touchmove', drag);
        document.addEventListener('mouseup', dragEnd);
        document.addEventListener('touchend', dragEnd);
        
        function dragStart(e) {
            if (e.type === 'mousedown') {
                initialX = e.clientX - heart.offsetLeft;
                initialY = e.clientY - heart.offsetTop;
            } else {
                initialX = e.touches[0].clientX - heart.offsetLeft;
                initialY = e.touches[0].clientY - heart.offsetTop;
            }
            isDragging = true;
            heart.style.animation = 'none';
            heart.style.transform = 'scale(1.2)';
        }
        
        function drag(e) {
            if (!isDragging) return;
            e.preventDefault();
            
            if (e.type === 'mousemove') {
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
            } else {
                currentX = e.touches[0].clientX - initialX;
                currentY = e.touches[0].clientY - initialY;
            }
            
            heart.style.left = currentX + 'px';
            heart.style.top = currentY + 'px';
        }
        
        function dragEnd() {
            isDragging = false;
            heart.style.transform = 'scale(1)';
            heart.style.animation = 'floating 3s ease-in-out infinite';
        }
        
        document.body.appendChild(heart);
    }
    
    // 开始体验函数
    const startExperience = (e) => {
        e.preventDefault();
        document.querySelector('.hint')?.remove();
        
        // 创建主消息
        const mainMessage = document.querySelector('.main-message');
        mainMessage.style.opacity = '1';
        typeWriter(mainMessage, "我永远爱你", 200);
        
        // 尝试请求全屏
        if (!document.fullscreenElement) {
            const docElm = document.documentElement;
            if (docElm.requestFullscreen) {
                docElm.requestFullscreen();
            } else if (docElm.webkitRequestFullscreen) {
                docElm.webkitRequestFullscreen();
            } else if (docElm.mozRequestFullScreen) {
                docElm.mozRequestFullScreen();
            } else if (docElm.msRequestFullscreen) {
                docElm.msRequestFullscreen();
            }
        }
        
        // 初始化场景管理器
        const sceneManager = new SceneManager();
        
        // 添加导航按钮
        const navContainer = document.querySelector('.global-nav');
        navContainer.innerHTML = `
            <button class="nav-btn scene-btn" data-scene="0">首页</button>
            <button class="nav-btn scene-btn" data-scene="1">回忆</button>
            <button class="nav-btn scene-btn" data-scene="2">情书</button>
            <button class="nav-btn scene-btn" data-scene="3">互动</button>
        `;
        
        // 绑定导航按钮事件
        document.querySelectorAll('.scene-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const sceneIndex = parseInt(e.target.dataset.scene);
                sceneManager.showScene(sceneIndex);
            });
        });
        
        // 显示第一个场景
        sceneManager.showScene(0);
        
        // 创建多个可拖动的爱心
        for (let i = 0; i < 5; i++) {
            setTimeout(() => createDraggableHeart(), i * 500);
        }
        
        // 移除事件监听
        document.removeEventListener('click', startExperience);
        document.removeEventListener('touchstart', startExperience);
    };
    
    // 添加触摸和点击事件
    document.addEventListener('click', startExperience);
    document.addEventListener('touchstart', startExperience);
    
    // 添加点击特效
    document.addEventListener('click', (e) => {
        const colors = ['#ff6b6b', '#f06595', '#cc5de8', '#845ef7'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        ripple.style.left = e.clientX + 'px';
        ripple.style.top = e.clientY + 'px';
        ripple.style.borderColor = randomColor;
        document.body.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 1000);
    });
});

// 场景管理类
class SceneManager {
    constructor() {
        this.scenes = document.querySelectorAll('.scene');
        this.currentScene = 0;
        this.messages = {
            0: "我永远爱你",
            1: "回忆我们的点点滴滴",
            2: "想对你说的话",
            3: "许下我们的愿望"
        };
        
        // 初始化场景状态
        this.scenes.forEach(scene => {
            const message = scene.querySelector('.message');
            if (message) {
                message.style.opacity = '0';
            }
        });
        
        // 添加场景状态管理
        this.sceneStates = {
            petalsCreated: false,
            heartbeatsCreated: false,
            memoryInitialized: false,
            letterInitialized: false,
            wishingWellCreated: false
        };
        
        // 添加场景元素缓存
        this.elements = {
            petals: null,
            hearts: [],
            wishes: [],
            memories: []
        };
    }
    
    showScene(index) {
        // 更新主消息
        const mainMessage = document.querySelector('.main-message');
        typeWriter(mainMessage, this.messages[index], 200);
        
        // 场景切换
        this.scenes.forEach(scene => {
            scene.classList.remove('active');
        });
        this.scenes[index].classList.add('active');
        
        // 更新导航按钮状态
        document.querySelectorAll('.scene-btn').forEach(btn => {
            btn.classList.remove('active');
            if (parseInt(btn.dataset.scene) === index) {
                btn.classList.add('active');
            }
        });
        
        // 根据场景执行特定初始化
        switch(index) {
            case 0:
                if (!this.sceneStates.petalsCreated) {
                    showPetals();
                    this.sceneStates.petalsCreated = true;
                }
                if (!this.sceneStates.heartbeatsCreated) {
                    createHeartbeat();
                    this.sceneStates.heartbeatsCreated = true;
                }
                break;
            case 1:
                if (!this.sceneStates.memoryInitialized) {
                    this.initMemoryScene();
                    this.sceneStates.memoryInitialized = true;
                }
                break;
            case 2:
                if (!this.sceneStates.letterInitialized) {
                    this.initLetterScene();
                    this.sceneStates.letterInitialized = true;
                }
                break;
            case 3:
                if (!this.sceneStates.wishingWellCreated) {
                    createWishingWell();
                    this.sceneStates.wishingWellCreated = true;
                }
                break;
        }
        
        this.currentScene = index;
    }
    
    cleanupCurrentScene() {
        // 清理不需要的元素
        if (this.currentScene !== 0) {
            document.querySelectorAll('.petal').forEach(petal => {
                petal.style.opacity = '0';
                setTimeout(() => petal.remove(), 500);
            });
        }
    }
    
    initMemoryScene() {
        const timeline = document.querySelector('.photo-timeline');
        if (!timeline.children.length) {
            const memories = [
                { date: '2024-01-01', text: '我们的初遇', image: 'images/memory1.jpg' },
                { date: '2024-02-14', text: '第一个情人节', image: 'images/memory2.jpg' },
                // 添加更多回忆...
            ];
            
            memories.forEach(memory => {
                const card = document.createElement('div');
                card.className = 'memory-card';
                card.innerHTML = `
                    <div class="memory-image">
                        <img src="${memory.image}" alt="${memory.text}" 
                             onerror="this.src='images/default.jpg'">
                    </div>
                    <div class="memory-text">
                        <div class="memory-date">${memory.date}</div>
                        <div class="memory-description">${memory.text}</div>
                    </div>
                `;
                timeline.appendChild(card);
            });
        }
    }
    
    initLetterScene() {
        const content = document.querySelector('.letter-content');
        if (!content.textContent) {
            const letter = `亲爱的：

在这特别的时刻，我想对你说一些话。

还记得我们第一次相遇的场景吗？那一刻，我就知道你是我一直在等的人。

和你在一起的每一天都很特别，你的笑容让我的世界充满阳光，你的温柔让我感到无比幸福。

我想要和你一起经历生活中的每一个瞬间，分享每一份快乐，共同面对每一个挑战。

余生很长，请让我一直陪在你身边。

永远爱你的我`;
            typeWriter(content, letter, 50);
        }
    }
    
    saveSceneState(index) {
        switch(index) {
            case 0:
                this.elements.petals = document.querySelectorAll('.petal');
                this.elements.hearts = document.querySelectorAll('.heartbeat');
                break;
            case 3:
                this.elements.wishes = document.querySelectorAll('.wish');
                break;
        }
    }
    
    restoreSceneState(index) {
        switch(index) {
            case 0:
                if (this.elements.petals) {
                    this.elements.petals.forEach(petal => petal.style.opacity = '1');
                }
                if (this.elements.hearts.length) {
                    this.elements.hearts.forEach(heart => heart.style.opacity = '1');
                }
                break;
            case 3:
                if (this.elements.wishes.length) {
                    this.elements.wishes.forEach(wish => wish.style.opacity = '1');
                }
                break;
        }
    }
}

// 显示花瓣效果
function showPetals() {
    const petalsContainer = document.getElementById('petals');
    const petalCount = 100;
    const petalTypes = ['🌸', '🌺', '💮', '🏵️', '❤️'];

    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.textContent = petalTypes[Math.floor(Math.random() * petalTypes.length)];
        petal.style.left = Math.random() * 100 + 'vw';
        petal.style.animationDelay = Math.random() * 5 + 's';
        petal.style.fontSize = (Math.random() * 20 + 10) + 'px';
        petal.style.opacity = Math.random() * 0.5 + 0.5;
        petalsContainer.appendChild(petal);
    }
}

// 创建心跳动画
function createHeartbeat() {
    const positions = [
        { left: '10%', top: '20%' },
        { left: '85%', top: '15%' },
        { left: '75%', top: '75%' },
        { left: '15%', top: '80%' }
    ];
    
    positions.forEach(pos => {
        const heart = document.createElement('div');
        heart.className = 'heartbeat';
        heart.style.left = pos.left;
        heart.style.top = pos.top;
        
        const pulseRing = document.createElement('div');
        pulseRing.className = 'pulse-ring';
        heart.appendChild(pulseRing);
        
        document.body.appendChild(heart);
    });
}

// 添加许愿功能
function createWishingWell() {
    // 检查是否已存在
    if (document.querySelector('.wishing-well')) {
        return;
    }
    
    const wishingWell = document.createElement('div');
    wishingWell.className = 'wishing-well';
    wishingWell.innerHTML = `
        <div class="well-title">💝 许下你的愿望</div>
        <div class="wish-input-container">
            <input type="text" class="wish-input" placeholder="写下你的愿望...">
            <button class="wish-button">💫</button>
        </div>
        <div class="wishes-container"></div>
    `;
    
    const container = document.querySelector('#interactive-scene .container');
    if (!container) {
        console.error('找不到互动场景容器');
        return;
    }
    
    container.appendChild(wishingWell);
    
    const wishInput = wishingWell.querySelector('.wish-input');
    const wishButton = wishingWell.querySelector('.wish-button');
    const wishesContainer = wishingWell.querySelector('.wishes-container');
    
    // 防抖处理
    let isProcessing = false;
    
    wishButton.addEventListener('click', async () => {
        if (isProcessing) return;
        
        const wishText = wishInput.value.trim();
        if (!wishText) return;
        
        isProcessing = true;
        
        try {
            // 保存愿望
            const wishes = JSON.parse(localStorage.getItem('wishes') || '[]');
            const newWish = { text: wishText, date: new Date().toISOString() };
            wishes.push(newWish);
            localStorage.setItem('wishes', JSON.stringify(wishes));
            
            // 显示愿望
            addWishToContainer(newWish.text, newWish.date, wishesContainer);
            
            // 动画效果
            createStars(wishButton);
            showWishMessage();
            
            wishInput.value = '';
        } catch (err) {
            console.error('保存愿望失败:', err);
        } finally {
            isProcessing = false;
        }
    });
    
    // 加载已保存的愿望
    loadSavedWishes(wishesContainer);
}

function loadSavedWishes(container) {
    try {
        const wishes = JSON.parse(localStorage.getItem('wishes') || '[]');
        wishes.reverse().forEach(wish => {
            addWishToContainer(wish.text, wish.date, container);
        });
    } catch (err) {
        console.error('加载愿望失败:', err);
    }
}

// 添加愿望到容器
function addWishToContainer(text, date, container) {
    const wish = document.createElement('div');
    wish.className = 'wish';
    wish.innerHTML = `
        <div class="wish-text">${text}</div>
        <div class="wish-date">${new Date(date).toLocaleDateString()}</div>
    `;
    wish.style.transform = `rotate(${Math.random() * 6 - 3}deg)`;
    container.insertBefore(wish, container.firstChild);
}

// 创建星星动画
function createStars(element) {
    const starCount = 8;
    const starTypes = ['⭐', '✨', '💫'];
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.textContent = starTypes[Math.floor(Math.random() * starTypes.length)];
        
        const angle = (i / starCount) * Math.PI * 2;
        const distance = 50;
        
        star.style.left = element.offsetLeft + element.offsetWidth/2 + 'px';
        star.style.top = element.offsetTop + element.offsetHeight/2 + 'px';
        star.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`;
        
        document.body.appendChild(star);
        setTimeout(() => star.remove(), 1000);
    }
}

// 显示祝福消息
function showWishMessage() {
    const messages = [
        "愿望已被记录在星空中 ✨",
        "愿你的心愿成真 💫",
        "让爱永远陪伴着你 💝",
        "愿我们的爱情永恒 ❤️"
    ];
    
    const message = document.createElement('div');
    message.className = 'wish-message';
    message.textContent = messages[Math.floor(Math.random() * messages.length)];
    document.body.appendChild(message);
    
    // 淡出动画
    setTimeout(() => {
        message.style.opacity = '0';
        setTimeout(() => message.remove(), 500);
    }, 2000);
}

// 修改音乐控制初始化
function initMusicControl() {
    const musicControl = document.createElement('div');
    musicControl.className = 'music-control';
    musicControl.innerHTML = '🔇';
    musicControl.style.opacity = '1';
    
    const audio = new Audio();
    audio.id = 'bgMusic';
    audio.loop = true;
    
    let loadAttempts = 0;
    const maxAttempts = 3;
    
    function loadAudio() {
        try {
            audio.src = 'background-music.mp3';
            audio.load();
            
            audio.addEventListener('canplaythrough', () => {
                console.log('音频加载完成');
                musicControl.style.animation = '';
                musicControl.style.opacity = '1';
            });
            
            audio.addEventListener('error', (e) => {
                console.error('音频加载失败:', e);
                if (loadAttempts < maxAttempts) {
                    loadAttempts++;
                    console.log(`重试加载音频 (${loadAttempts}/${maxAttempts})`);
                    setTimeout(loadAudio, 1000);
                } else {
                    musicControl.style.animation = 'shake 0.5s ease-in-out';
                    musicControl.title = '音频加载失败';
                }
            });
        } catch (err) {
            console.error('音频初始化失败:', err);
        }
    }
    
    loadAudio();
    return { audio, musicControl };
}

// 在 DOMContentLoaded 中使用
document.addEventListener('DOMContentLoaded', () => {
    const { audio, musicControl } = initMusicControl();
    let isMusicPlaying = false;
    
    // ... 其他代码保持不变 ...
});

// 添加全局错误处理
window.onerror = function(msg, url, lineNo, columnNo, error) {
    console.error('全局错误:', {
        message: msg,
        url: url,
        line: lineNo,
        column: columnNo,
        error: error
    });
    return false;
};

// 添加日志函数
function log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    console[type](`[${timestamp}] ${message}`);
}

// 添加错误恢复机制
class ErrorRecovery {
    static async retryOperation(operation, maxAttempts = 3, delay = 1000) {
        let attempts = 0;
        while (attempts < maxAttempts) {
            try {
                return await operation();
            } catch (error) {
                attempts++;
                console.error(`操作失败 (${attempts}/${maxAttempts}):`, error);
                if (attempts === maxAttempts) throw error;
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }
}

// 使用示例
async function loadResources() {
    await ErrorRecovery.retryOperation(async () => {
        // 加载资源的代码
    });
}

// 添加性能监控
const Performance = {
    marks: {},
    
    start(label) {
        this.marks[label] = performance.now();
    },
    
    end(label) {
        if (this.marks[label]) {
            const duration = performance.now() - this.marks[label];
            console.log(`${label} 耗时: ${duration.toFixed(2)}ms`);
            delete this.marks[label];
        }
    }
};

// 使用示例
Performance.start('场景切换');
// 场景切换代码
Performance.end('场景切换');

class MemoryManager {
    static cleanup() {
        // 清理不再使用的DOM元素
        document.querySelectorAll('.removed').forEach(el => el.remove());
        
        // 清理事件监听器
        document.querySelectorAll('[data-has-listeners]').forEach(el => {
            el.replaceWith(el.cloneNode(true));
        });
    }
}

// 定期清理
setInterval(() => MemoryManager.cleanup(), 60000);

