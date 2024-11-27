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
    
    audio = document.createElement('audio');
    audio.id = 'bgMusic';
    audio.loop = true;
    audio.preload = 'auto';
    audio.innerHTML = `
        <source src="background-music.mp3" type="audio/mpeg">
        <source src="background-music.ogg" type="audio/ogg">
        <source src="background-music.wav" type="audio/wav">
    `;
    document.body.appendChild(audio);
    
    audio.addEventListener('loadeddata', () => {
        console.log('音频已加载完成');
    });
    
    audio.addEventListener('error', (e) => {
        console.error('音频加载失败:', e);
    });
    
    audio.addEventListener('canplaythrough', () => {
        console.log('音频已缓冲完成，可以播放');
    });
    
    // 音乐控制按钮点击事件
    musicControl.addEventListener('click', async (e) => {
        e.stopPropagation();
        try {
            if (isMusicPlaying) {
                audio.pause();
                musicControl.innerHTML = '🔇';
                isMusicPlaying = false;
            } else {
                await playAudio();
            }
        } catch (err) {
            console.error('音乐控制失败:', err);
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
        if (!audio || !musicControl) {
            console.error('Audio elements not initialized');
            return;
        }
        
        // 用户交互后再播放
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                isMusicPlaying = true;
                musicControl.innerHTML = '🔊';
                console.log('音频播放成功');
            }).catch(error => {
                console.error('播放失败:', error);
                // 如果是自动播放策略导致的失败，提示用户点击播放
                if (error.name === 'NotAllowedError') {
                    alert('请点击页面任意位置来播放音乐');
                }
                throw error;
            });
        }
        
    } catch (err) {
        console.error('音频播放失败:', err);
        if (musicControl) {
            musicControl.style.animation = 'shake 0.5s ease-in-out';
        }
        throw err;
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
