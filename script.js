document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.container').innerHTML += '<div class="hint">双击屏幕开始</div>';
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
});

function showPetals() {
    const petalsContainer = document.getElementById('petals');
    const petalCount = 50;

    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.style.left = Math.random() * 100 + 'vw';
        petal.style.animationDelay = Math.random() * 5 + 's';
        petalsContainer.appendChild(petal);
    }
} 
