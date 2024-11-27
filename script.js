let audio;
let musicControl;
let isMusicPlaying = false;

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.container').innerHTML += '<div class="hint">点击屏幕开始</div>';
    
    // 初始化音频和控制按钮
    musicControl = document.createElement('div');
    musicControl.className = 'music-control';
    musicControl.innerHTML = '🔇';
    document.body.appendChild(musicControl);
    
    audio = new Audio('background-music.mp3');
    audio.id = 'bgMusic';
    audio.loop = true;
    
    // 监听音频加载状态
    audio.addEventListener('loadeddata', () => {
        console.log('音频加载完成');
        musicControl.style.opacity = '1'; // 显示控制按钮
    });
    
    audio.addEventListener('playing', () => {
        console.log('音频开始播放');
        isMusicPlaying = true;
        musicControl.innerHTML = '🔊';
    });
    
    audio.addEventListener('pause', () => {
        console.log('音频暂停');
        isMusicPlaying = false;
        musicControl.innerHTML = '🔇';
    });
    
    audio.addEventListener('error', (e) => {
        console.error('音频错误:', e);
        alert('音频加载失败，请刷新页面重试');
    });
    
    // 音乐控制按钮点击事件
    musicControl.addEventListener('click', async (e) => {
        e.stopPropagation();
        try {
            if (isMusicPlaying) {
                audio.pause();
            } else {
                await audio.play();
            }
        } catch (err) {
            console.error('音乐控制失败:', err);
            musicControl.style.animation = 'shake 0.5s ease-in-out';
        }
    });
    
    // 添加情话数组
    const loveMessages = [
        "遇见你是我最大的幸运",
        "你的笑容是我最爱的风景",
        "我想牵着你的手，走过春夏秋冬",
        "你是我最想珍惜的人",
        "我愿意为你付出所有",
        "你的快乐就是我的快乐",
        "我会一直陪在你身边",
        "你是我生命中最美好的礼物",
        "我希望未来的每一天都有你",
        "我爱你胜过爱自己"
    ];
    
    // 添加打字机效果
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
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
        
        function preventScroll(e) {
            e.preventDefault();
        }
        
        heart.addEventListener('touchstart', (e) => {
            heart.addEventListener('touchmove', preventScroll, { passive: false });
        });
        
        heart.addEventListener('touchend', () => {
            heart.removeEventListener('touchmove', preventScroll);
        });
        
        document.body.appendChild(heart);
    }
    
    // 修改开始体验函数
    const startExperience = (e) => {
        e.preventDefault();
        document.querySelector('.hint')?.remove();
        
        // 尝试请求全屏
        if (!document.fullscreenElement) {
            const docElm = document.documentElement;
            if (docElm.requestFullscreen) {
                docElm.requestFullscreen();
            } else if (docElm.webkitRequestFullscreen) { // Safari
                docElm.webkitRequestFullscreen();
            } else if (docElm.mozRequestFullScreen) { // Firefox
                docElm.mozRequestFullScreen();
            } else if (docElm.msRequestFullscreen) { // IE/Edge
                docElm.msRequestFullscreen();
            }
        }
        
        showPetals();
        document.querySelector('.message').style.opacity = '1';
        document.querySelector('.message').classList.add('message-animation');
        
        // 尝试播放音乐
        playAudio().catch(err => {
            console.log('需要用户手动点击播放音乐:', err);
            musicControl.style.animation = 'shake 0.5s ease-in-out';
        });
        
        // 添加打字机效果
        const message = document.querySelector('.message');
        typeWriter(message, "我永远爱你", 200);
        
        // 创建多个可拖动的爱心
        for (let i = 0; i < 5; i++) {
            setTimeout(() => createDraggableHeart(), i * 500);
        }
        
        // 定时切换情话
        setInterval(() => {
            const randomMessage = loveMessages[Math.floor(Math.random() * loveMessages.length)];
            typeWriter(message, randomMessage, 100);
        }, 5000);
        
        // 显示照片墙
        const photoWall = document.querySelector('.photo-wall');
        if (photoWall) {
            photoWall.style.display = 'flex';
        } else {
            createPhotoWall();
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
    
    // 在DOMContentLoaded事件开始时添加
    const petalsContainer = document.createElement('div');
    petalsContainer.id = 'petals';
    document.body.appendChild(petalsContainer);
    
    // 在 DOMContentLoaded 事件中添加
    function addLoveDaysCounter() {
        const startDate = new Date('2024-01-01'); // 设置你们相识/相爱的开始日期
        const counter = document.createElement('div');
        counter.className = 'love-counter';
        
        function updateCounter() {
            const now = new Date();
            const days = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
            counter.innerHTML = `我们已经相爱 ${days} 天啦 ❤️`;
        }
        
        updateCounter();
        setInterval(updateCounter, 1000 * 60); // 每分钟更新一次
        document.body.appendChild(counter);
    }
    
    addLoveDaysCounter();
    
    createPhotoWall();
    
    // 监听用户首次交互
    const handleFirstInteraction = () => {
        playAudio().catch(() => {
            console.log('首次播放尝试失败');
        });
        // 移除首次交互监听
        document.removeEventListener('click', handleFirstInteraction);
        document.removeEventListener('touchstart', handleFirstInteraction);
    };
    
    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);
    
    // 添加许愿功能
    createWishingWell();
    
    // 创建心跳动画
    createHeartbeat();
});

function showPetals() {
    const petalsContainer = document.getElementById('petals');
    // 确保容器是空的
    petalsContainer.innerHTML = '';
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

async function playAudio() {
    try {
        if (!audio) return;
        
        // 检查音频是否已加载
        if (audio.readyState < 2) {
            console.log('等待音频加载...');
            await new Promise((resolve, reject) => {
                audio.addEventListener('canplay', resolve, {once: true});
                audio.addEventListener('error', reject, {once: true});
                // 5秒超时
                setTimeout(reject, 5000);
            });
        }
        
        // 尝试播放
        if (!isMusicPlaying) {
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                await playPromise;
                console.log('播放成功');
            }
        }
    } catch (err) {
        console.error('播放失败:', err);
        if (err.name === 'NotAllowedError') {
            console.log('需要用户交互才能播放');
            // 不显示弹窗，只显示音乐控制按钮的动画效果
            musicControl.style.animation = 'shake 0.5s ease-in-out';
        }
    }
}

function createPhotoWall() {
    console.log('Creating photo wall...');
    const memories = [
        { date: '2024-01-01', text: '我们的第一次见面', image: 'images/memory1.jpg' },
        { date: '2024-02-14', text: '第一个情人节', image: 'images/memory2.jpg' }
    ];
    
    const wall = document.createElement('div');
    wall.className = 'photo-wall';
    
    memories.forEach(memory => {
        console.log('Adding memory:', memory);
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.innerHTML = `
            <img src="${memory.image}" alt="${memory.text}" 
                 onerror="console.error('Failed to load image:', this.src);this.src='images/default.jpg';this.onerror=null;">
            <div class="memory-text">
                <div class="memory-date">${memory.date}</div>
                <div class="memory-description">${memory.text}</div>
            </div>
        `;
        wall.appendChild(card);
    });
    
    document.body.appendChild(wall);
    console.log('Photo wall created');
}

// 添加许愿功能
function createWishingWell() {
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
    
    document.body.appendChild(wishingWell);
    
    const wishInput = wishingWell.querySelector('.wish-input');
    const wishButton = wishingWell.querySelector('.wish-button');
    const wishesContainer = wishingWell.querySelector('.wishes-container');
    
    wishButton.addEventListener('click', () => {
        if (wishInput.value.trim()) {
            const wish = document.createElement('div');
            wish.className = 'wish';
            wish.innerHTML = `${wishInput.value} <span class="wish-date">${new Date().toLocaleDateString()}</span>`;
            wish.style.transform = `rotate(${Math.random() * 10 - 5}deg)`;
            wishesContainer.appendChild(wish);
            
            // 创建星星动画
            createStars(wishButton);
            
            wishInput.value = '';
            
            // 保存愿望到localStorage
            const wishes = JSON.parse(localStorage.getItem('wishes') || '[]');
            wishes.push({
                text: wish.textContent,
                date: new Date().toISOString()
            });
            localStorage.setItem('wishes', JSON.stringify(wishes));
        }
    });
    
    // 加载已保存的愿望
    const savedWishes = JSON.parse(localStorage.getItem('wishes') || '[]');
    savedWishes.forEach(savedWish => {
        const wish = document.createElement('div');
        wish.className = 'wish';
        wish.innerHTML = `${savedWish.text} <span class="wish-date">${new Date(savedWish.date).toLocaleDateString()}</span>`;
        wish.style.transform = `rotate(${Math.random() * 10 - 5}deg)`;
        wishesContainer.appendChild(wish);
    });
}

function createStars(element) {
    const starCount = 5;
    const starTypes = ['⭐', '✨', '💫'];
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.textContent = starTypes[Math.floor(Math.random() * starTypes.length)];
        
        const rect = element.getBoundingClientRect();
        star.style.left = rect.left + rect.width/2 + 'px';
        star.style.top = rect.top + rect.height/2 + 'px';
        
        const angle = (i / starCount) * Math.PI * 2;
        const distance = 50;
        star.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`;
        
        document.body.appendChild(star);
        setTimeout(() => star.remove(), 1000);
    }
}

// 添加心跳动画函数
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
        
        // 添加脉冲环效果
        const pulseRing = document.createElement('div');
        pulseRing.className = 'pulse-ring';
        heart.appendChild(pulseRing);
        
        // 添加点击效果
        heart.addEventListener('click', (e) => {
            e.stopPropagation();
            // 创建爱心爆炸效果
            createHeartBurst(e.clientX, e.clientY);
            // 播放心跳声音
            playHeartbeatSound();
        });
        
        document.body.appendChild(heart);
    });
}

// 添加爱心爆炸效果
function createHeartBurst(x, y) {
    const burstCount = 10;
    const colors = ['#ff6b6b', '#f06595', '#cc5de8'];
    
    for (let i = 0; i < burstCount; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'fixed';
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        heart.style.fontSize = '20px';
        heart.style.color = colors[Math.floor(Math.random() * colors.length)];
        heart.style.pointerEvents = 'none';
        
        const angle = (i / burstCount) * Math.PI * 2;
        const velocity = 10;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        document.body.appendChild(heart);
        
        let frame = 0;
        const animate = () => {
            frame++;
            const x = parseFloat(heart.style.left) + vx;
            const y = parseFloat(heart.style.top) + vy + frame * 0.5; // 添加重力效果
            const opacity = 1 - frame / 50;
            
            heart.style.left = x + 'px';
            heart.style.top = y + 'px';
            heart.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                heart.remove();
            }
        };
        
        requestAnimationFrame(animate);
    }
}

// 添加心跳声音效果
function playHeartbeatSound() {
    const heartbeatSound = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU');
    heartbeatSound.volume = 0.3;
    heartbeatSound.play().catch(err => console.log('无法播放心跳声音:', err));
} 
