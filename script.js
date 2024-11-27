document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.container').innerHTML += '<div class="hint">双击屏幕开始</div>';
    const audio = document.createElement('audio');
    audio.id = 'bgMusic';
    audio.loop = true;
    audio.src = 'background-music.mp3';
    document.body.appendChild(audio);
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

function showPetals() {
    const petalsContainer = document.getElementById('petals');
    const petalCount = 100;
    const petalTypes = ['🌸', '🌺', '💮', '🏵️'];

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
