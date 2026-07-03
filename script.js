document.addEventListener('DOMContentLoaded', () => {
    
    // === 髪型切り替え処理 ===
    const hairBtns = document.querySelectorAll('.hair-btn');
    const bustupImg = document.getElementById('bustup-image');
    
    // 用意する画像ファイル名を設定
    const hairImages = {
        long: 'bustup_long.png',       // ロングの画像
        bob: 'bustup_bob.png',         // ボブの画像
        sidetail: 'bustup_sidetail.png' // ルーズサイドテールの画像
    };

    // 画像がない場合のエラー表示用（ダミー画像）
    const fallbacks = {
        long: 'https://placehold.jp/e0f2fe/5CADCE/300x300.png?text=Long',
        bob: 'https://placehold.jp/e0f2fe/5CADCE/300x300.png?text=Bob',
        sidetail: 'https://placehold.jp/e0f2fe/5CADCE/300x300.png?text=Side+Tail'
    };

    hairBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 他のボタンのactiveクラスを外す
            hairBtns.forEach(b => b.classList.remove('active'));
            // クリックされたボタンにactiveクラスを付ける
            btn.classList.add('active');
            
            // 一瞬画像を薄くして切り替えを滑らかにする演出
            bustupImg.style.opacity = 0.5;
            
            setTimeout(() => {
                const hairType = btn.dataset.hair;
                bustupImg.src = hairImages[hairType];
                
                // もし画像ファイルが存在しない場合はダミー画像を表示
                bustupImg.onerror = () => {
                    bustupImg.src = fallbacks[hairType];
                };
                
                bustupImg.style.opacity = 1;
            }, 150);
        });
    });

    // === Works モーダル（ポップアップ）の開閉処理 ===
    const worksBtn = document.getElementById('works-btn');
    const worksModal = document.getElementById('works-modal');
    const closeModalBtn = document.getElementById('close-modal');

    // ボタンを押したら表示
    worksBtn.addEventListener('click', () => {
        worksModal.classList.remove('hidden');
    });

    // ×ボタンを押したら非表示
    closeModalBtn.addEventListener('click', () => {
        worksModal.classList.add('hidden');
    });

    // ポップアップの背景（黒い部分）をクリックしても閉じる
    worksModal.addEventListener('click', (e) => {
        if (e.target === worksModal) {
            worksModal.classList.add('hidden');
        }
    });

    // === 雪のアニメーション処理 ===
    const snowContainer = document.getElementById('snow-container');
    const snowflakeCount = 40; // 降らせる雪の数

    for (let i = 0; i < snowflakeCount; i++) {
        createSnowflake();
    }

    function createSnowflake() {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');

        // 雪のサイズ (2px 〜 6px)
        const size = Math.random() * 4 + 2;
        snowflake.style.width = `${size}px`;
        snowflake.style.height = `${size}px`;

        // 開始位置 (0% 〜 100%)
        snowflake.style.left = `${Math.random() * 100}vw`;

        // 落ちるスピード (6秒 〜 15秒)
        const duration = Math.random() * 9 + 6;
        snowflake.style.animationDuration = `${duration}s`;

        // 降り始めるタイミングのズレ
        snowflake.style.animationDelay = `${Math.random() * 5}s`;

        // アニメーション終了後に要素を作り直して無限ループさせる
        snowflake.addEventListener('animationend', () => {
            snowflake.remove();
            createSnowflake();
        });

        snowContainer.appendChild(snowflake);
    }
});