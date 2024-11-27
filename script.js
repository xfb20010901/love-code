class SceneManager {
    // ... 其他代码保持不变 ...
    
    showScene(index) {
        // 更新场景显示
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
        
        this.currentScene = index;
        
        // 根据场景执行特定初始化
        switch(index) {
            case 0: // 开场
                const openingMessage = document.querySelector('#opening-scene .message');
                if (openingMessage) {
                    openingMessage.style.opacity = '1';
                    typeWriter(openingMessage, "我永远爱你", 200);
                }
                showPetals();
                if (!document.querySelector('.heartbeat')) {
                    createHeartbeat();
                }
                break;
                
            case 1: // 回忆
                const memoryMessage = document.querySelector('#memory-scene .memory-title');
                if (memoryMessage) {
                    memoryMessage.style.opacity = '1';
                    typeWriter(memoryMessage, "我们的美好回忆", 200);
                }
                this.initMemoryScene();
                break;
                
            case 2: // 情书
                const letterContent = document.querySelector('.letter-content');
                if (letterContent) {
                    const letter = `亲爱的：

在这特别的时刻，我想对你说一些话。

还记得我们第一次相遇的场景吗？那一刻，我就知道你是我一直在等的人。

和你在一起的每一天都很特别，你的笑容让我的世界充满阳光，你的温柔让我感到无比幸福。

我想要和你一起经历生活中的每一个瞬间，分享每一份快乐，共同面对每一个挑战。

余生很长，请让我一直陪在你身边。

永远爱你的我`;
                    typeWriter(letterContent, letter, 50);
                }
                break;
                
            case 3: // 互动
                const interactiveMessage = document.createElement('div');
                interactiveMessage.className = 'message interactive-message';
                interactiveMessage.style.position = 'absolute';
                interactiveMessage.style.top = '20%';
                interactiveMessage.style.width = '100%';
                interactiveMessage.style.textAlign = 'center';
                
                const interactiveScene = document.querySelector('#interactive-scene');
                if (!interactiveScene.querySelector('.interactive-message')) {
                    interactiveScene.appendChild(interactiveMessage);
                }
                
                typeWriter(interactiveMessage, "在这里许下你的愿望", 200);
                
                if (!document.querySelector('.wishing-well')) {
                    createWishingWell();
                }
                break;
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
}
