document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.container').innerHTML += '<div class="hint">点击屏幕开始</div>';
    const audio = document.createElement('audio');
    audio.id = 'bgMusic';
    audio.loop = true;
    audio.src = 'background-music.mp3';
    document.body.appendChild(audio);
    
    // 统一处理点击/触摸事件
    const startExperience = (e) => {
        e.preventDefault(); // 阻止默认行为
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
        const music = document.getElementById('bgMusic');
        music.play().catch(err => console.log('无法自动播放音乐:', err));
        
        // 移除事件监听
        document.removeEventListener('click', startExperience);
        document.removeEventListener('touchstart', startExperience);
    };

    // 添加触摸和点击事件
    document.addEventListener('click', startExperience);
    document.addEventListener('touchstart', startExperience);
    
    // 处理爱心效果
    const createHeartAtPoint = (x, y) => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '❤️'; // 使用emoji替代CSS样式
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 1000);
    };

    // 同时支持点击和触摸创建爱心
    document.addEventListener('click', (e) => {
        createHeartAtPoint(e.clientX, e.clientY);
    });
    
    document.addEventListener('touchstart', (e) => {
        Array.from(e.touches).forEach(touch => {
            createHeartAtPoint(touch.clientX, touch.clientY);
        });
    });
});

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
