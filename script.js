document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.container').innerHTML += '<div class="hint">点击屏幕开始</div>';
    
    // 添加音乐控制按钮
    const musicControl = document.createElement('div');
    musicControl.className = 'music-control';
    musicControl.innerHTML = '🔇';
    document.body.appendChild(musicControl);
    
    const audio = document.createElement('audio');
    audio.id = 'bgMusic';
    audio.loop = true;
    audio.preload = 'auto';
    audio.src = 'background-music.mp3';
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
    
    let isMusicPlaying = false;
    
    // 音乐控制按钮点击事件
    musicControl.addEventListener('click', async (e) => {
        e.stopPropagation();
        try {
            if (isMusicPlaying) {
                await audio.pause();
                musicControl.innerHTML = '🔇';
            } else {
                await playAudio();
            }
            isMusicPlaying = !isMusicPlaying;
        } catch (err) {
            console.error('播放失败:', err);
            alert('音乐播放失败，请检查音频文件');
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
        audio.play().then(() => {
            isMusicPlaying = true;
            musicControl.innerHTML = '🔊';
        }).catch(err => {
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
        if (!audio.readyState >= 2) {
            await new Promise((resolve, reject) => {
                audio.addEventListener('canplaythrough', resolve, {once: true});
                audio.addEventListener('error', reject, {once: true});
            });
        }
        await audio.play();
        isMusicPlaying = true;
        musicControl.innerHTML = '🔊';
    } catch (err) {
        console.error('音频播放失败:', err);
        musicControl.style.animation = 'shake 0.5s ease-in-out';
    }
} 
