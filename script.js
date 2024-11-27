document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.container').innerHTML += '<div class="hint">双击屏幕开始</div>';
    const audio = document.createElement('audio');
    audio.id = 'bgMusic';
    audio.loop = true;
    audio.src = 'background-music.mp3';
    document.body.appendChild(audio);
    
    // 添加点击爱心效果
    document.addEventListener('click', (e) => {
        createHeart(e.clientX, e.clientY);
    });
});

document.addEventListener('dblclick', () => {
    document.querySelector('.hint')?.remove();
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.log(`Error: ${err.message}`);
        });
    }
    showPetals();
    document.querySelector('.message').style.opacity = '1';
    document.querySelector('.message').classList.add('message-animation');
    document.getElementById('bgMusic').play();
});

// 添加点击爱心效果函数
function createHeart(x, y) {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    document.body.appendChild(heart);
    
    // 动画结束后移除元素
    setTimeout(() => heart.remove(), 1000);
}

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
        
        // 添加鼠标悬停效果
        petal.addEventListener('mouseover', () => {
            petal.style.transform = 'scale(1.5)';
            petal.style.transition = 'transform 0.3s';
        });
        petal.addEventListener('mouseout', () => {
            petal.style.transform = 'scale(1)';
        });
    }
} 
