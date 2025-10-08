// 画像ファイルのリストを自動取得
let imageFiles = [];

// ページネーション設定
const IMAGES_PER_PAGE = 15; // 1ページあたりの画像数（3列×5行）
let currentPage = 1;

// ページ読み込み時に実行
document.addEventListener('DOMContentLoaded', function() {
    console.log('ページ読み込み完了');
    animateTitle();
    loadImageList();
    loadEvents();
    initScrollAnimations();
    addParticles();
});

// タイトルの文字を分割してアニメーション
function animateTitle() {
    const titleText = document.querySelector('.title-text');
    if (!titleText) return;
    
    const text = titleText.textContent;
    titleText.textContent = '';
    titleText.style.display = 'inline-flex';
    titleText.style.gap = '0';
    
    // 各文字をspanで囲む
    text.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.className = 'char';
        span.style.animationDelay = `${index * 0.1}s`;
        
        // ランダムな開始位置を設定
        const randomX = (Math.random() - 0.5) * 2000;
        const randomY = (Math.random() - 0.5) * 2000;
        const randomRotate = (Math.random() - 0.5) * 720;
        
        span.style.setProperty('--start-x', `${randomX}px`);
        span.style.setProperty('--start-y', `${randomY}px`);
        span.style.setProperty('--start-rotate', `${randomRotate}deg`);
        
        titleText.appendChild(span);
    });
}

// 画像リストを読み込む
async function loadImageList() {
    try {
        const response = await fetch('get_images.php');
        const images = await response.json();
        imageFiles = images;
        console.log('PHPから画像を読み込み:', imageFiles.length, '枚');
    } catch (error) {
        console.log('PHPが利用できません。固定リストを使用します。');
        // 新しい画像を先頭に配置した固定リスト
        imageFiles = [
            'ACFJ6231.JPEG', 'AFAK9890.JPEG', 'BPGY6232.JPEG', 'BUDK6260.JPEG',
            'BXFF1829.JPEG', 'CMNT9202.JPEG', 'CMVH1159.JPEG', 'CNFM4768.JPEG',
            'CPWA6779.JPEG', 'DMNK0369.JPEG', 'DVVN4947.JPEG', 'DWJI9531.JPEG',
            'DXKO2269.JPEG', 'EAWD9151.JPEG', 'ECNM8327.JPEG', 'EJTY4646.JPEG',
            'ESOE0513.JPEG', 'FEMN2222.JPEG', 'FFDY9767.JPEG', 'GBQT7632.JPEG',
            'GCRQ3223.JPEG', 'GOSW4624.JPEG', 'GQJM4397.JPEG', 'HGLF6274.JPEG',
            'HHQA0080.JPEG', 'IDYF6618.JPEG', 'IIGT4149.JPEG', 'ITOU9080.JPEG',
            'IWXH5389.JPEG', 'JDEK2410.JPEG', 'JHWT1953.JPEG', 'JKMO9612.JPEG',
            'KAOX8627.JPEG', 'KEXV3780.JPEG', 'KJAE6038.JPEG', 'KRPD6227.JPEG',
            'LBKC3715.JPEG', 'LQNI5327.JPEG', 'LVHR2384.JPEG', 'LYSO9529.JPEG',
            'MCVB7477.JPEG', 'MFDW3811.JPEG', 'MKYM8185.JPEG', 'MMED5224.JPEG',
            'NXAY2921.JPEG', 'OHCE7781.JPEG', 'PIGL4823.JPEG', 'PTWY0210.JPEG',
            'QWBE0166.JPEG', 'QXAO8685.JPEG', 'QZGW9418.JPEG', 'RALP0771.JPEG',
            'SMJJ0991.JPEG', 'SOOR2647.JPEG', 'SPEG0995.JPEG', 'SQAI2803.JPEG',
            'SXWZ2000.JPEG', 'UNIS7873.JPEG', 'UNMI4902.JPEG', 'VASI5713.JPEG',
            'VDRC9679.JPEG', 'VECR5018.JPEG', 'VKMF9190.JPEG', 'VRQF0685.JPEG',
            'VTWK9040.JPEG', 'VVLN5273.JPEG', 'WVLG1876.JPEG', 'WXQF0762.JPEG',
            'XDQJ8177.JPEG', 'XLEO6765.JPEG', 'XRPQ5092.JPEG', 'XXAN2961.JPEG',
            'XXOQ9065.JPEG', 'XZVK4072.JPEG', 'YBWT8933.JPEG', 'YJTD6571.JPEG'
        ];
        console.log('固定リストから画像を読み込み:', imageFiles.length, '枚');
    }
    
    loadGalleryWithPagination();
}

// スクロールアニメーションの初期化
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.intro, .events, .gallery, .contact');
    animatedElements.forEach(el => observer.observe(el));
}

// パーティクル効果を追加
function addParticles() {
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        
        const flowers = ['✿', '❀', '❁', '✾', '✻', '♡', '♥', '★', '☆'];
        particle.textContent = flowers[Math.floor(Math.random() * flowers.length)];
        
        document.body.appendChild(particle);
    }
}

// イベント情報を読み込む関数
function loadEvents() {
    console.log('イベント読み込み開始');
    const eventsContainer = document.getElementById('eventsContainer');
    
    if (!eventsContainer) {
        console.error('eventsContainerが見つかりません');
        return;
    }
    
    // イベント情報を直接埋め込み
    const events = [
        {
            "month": "11月",
            "day": "10日",
            "name": "秋のハンドメイドフェスタ",
            "location": "中央市民センター 2F ホール",
            "time": "10:00 - 17:00"
        },
        {
            "month": "11月",
            "day": "23日",
            "name": "クラフトマーケット",
            "location": "駅前商店街 特設会場",
            "time": "11:00 - 18:00"
        },
        {
            "month": "12月",
            "day": "15日",
            "name": "クリスマスハンドメイドマルシェ",
            "location": "〇〇公園 イベント広場",
            "time": "10:00 - 16:00"
        }
    ];
    
    console.log('取得したイベント:', events);
    
    eventsContainer.innerHTML = '';
    
    if (events.length === 0) {
        console.log('イベントが0件です');
        eventsContainer.innerHTML = '<p class="no-events-message">現在、予定されているイベントはありません。</p>';
        return;
    }
    
    console.log(events.length + '件のイベントを表示します');
    events.forEach((event, index) => {
        console.log(`イベント${index + 1}:`, event);
        const eventItem = document.createElement('div');
        eventItem.className = 'event-item';
        eventItem.style.animationDelay = `${index * 0.1}s`;
        
        eventItem.innerHTML = `
            <div>
                <span class="event-date-inline">${event.month} ${event.day}</span>
                <h3 class="event-name">${event.name}</h3>
            </div>
            <div class="event-details">
                <p class="event-location">${event.location}</p>
                <p class="event-time">時間: ${event.time}</p>
            </div>
        `;
        
        eventsContainer.appendChild(eventItem);
        console.log(`イベント${index + 1}を追加しました`);
    });
    console.log('すべてのイベントの追加が完了');
}

// ページネーション付きギャラリーを読み込む
function loadGalleryWithPagination() {
    const gallerySection = document.querySelector('.gallery');
    
    if (!gallerySection) {
        return;
    }
    
    let paginationContainer = document.getElementById('paginationContainer');
    if (!paginationContainer) {
        paginationContainer = document.createElement('div');
        paginationContainer.id = 'paginationContainer';
        paginationContainer.className = 'pagination-container';
        
        const galleryNote = gallerySection.querySelector('.gallery-note');
        if (galleryNote) {
            gallerySection.insertBefore(paginationContainer, galleryNote);
        } else {
            gallerySection.appendChild(paginationContainer);
        }
    }
    
    displayGalleryPage(currentPage);
    createPagination();
}

// 指定ページの画像を表示
function displayGalleryPage(page) {
    const galleryGrid = document.getElementById('galleryGrid');
    
    if (!galleryGrid) {
        return;
    }
    
    galleryGrid.innerHTML = '';
    
    if (imageFiles.length === 0) {
        galleryGrid.innerHTML = '<p class="no-images-message">imageフォルダに画像を追加してください。</p>';
        return;
    }
    
    const startIndex = (page - 1) * IMAGES_PER_PAGE;
    const endIndex = Math.min(startIndex + IMAGES_PER_PAGE, imageFiles.length);
    const pageImages = imageFiles.slice(startIndex, endIndex);
    
    pageImages.forEach((filename, index) => {
        const itemNumber = startIndex + index + 1;
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.style.animationDelay = `${index * 0.08}s`;
        
        // 作品番号を追加
        const itemNo = document.createElement('div');
        itemNo.className = 'item-no';
        itemNo.textContent = `No.${itemNumber}`;
        
        const imageContainer = document.createElement('div');
        imageContainer.className = 'image-container';
        
        const img = document.createElement('img');
        img.src = `image/${filename}`;
        img.alt = `作品 No.${itemNumber}`;
        img.className = 'gallery-image';
        
        img.onerror = function() {
            imageContainer.innerHTML = `
                <div class="image-error">
                    <span class="error-icon">📷</span>
                    <p class="error-text">画像が見つかりません</p>
                    <p class="error-filename">${filename}</p>
                </div>
            `;
        };
        
        img.onload = function() {
            galleryItem.classList.add('loaded');
        };
        
        imageContainer.appendChild(img);
        galleryItem.appendChild(itemNo);
        galleryItem.appendChild(imageContainer);
        galleryGrid.appendChild(galleryItem);
    });
    
    currentPage = page;
}

// ページネーションボタンを作成
function createPagination() {
    const paginationContainer = document.getElementById('paginationContainer');
    
    if (!paginationContainer) {
        return;
    }
    
    const totalPages = Math.ceil(imageFiles.length / IMAGES_PER_PAGE);
    
    paginationContainer.innerHTML = '';
    
    if (totalPages <= 1) {
        return;
    }
    
    const pagination = document.createElement('div');
    pagination.className = 'pagination';
    
    // 最初のページへ
    if (currentPage > 1) {
        const firstBtn = createPageButton('⟪', 1);
        firstBtn.className = 'page-btn first-btn';
        pagination.appendChild(firstBtn);
        
        const prevBtn = createPageButton('‹', currentPage - 1);
        prevBtn.className = 'page-btn prev-btn';
        pagination.appendChild(prevBtn);
    }
    
    // ページ番号
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
            const pageBtn = createPageButton(i, i);
            if (i === currentPage) {
                pageBtn.classList.add('active');
            }
            pagination.appendChild(pageBtn);
        } else if (i === currentPage - 3 || i === currentPage + 3) {
            const dots = document.createElement('span');
            dots.className = 'page-dots';
            dots.textContent = '⋯';
            pagination.appendChild(dots);
        }
    }
    
    // 最後のページへ
    if (currentPage < totalPages) {
        const nextBtn = createPageButton('›', currentPage + 1);
        nextBtn.className = 'page-btn next-btn';
        pagination.appendChild(nextBtn);
        
        const lastBtn = createPageButton('⟫', totalPages);
        lastBtn.className = 'page-btn last-btn';
        pagination.appendChild(lastBtn);
    }
    
    // ページ情報を追加
    const pageInfo = document.createElement('div');
    pageInfo.className = 'page-info';
    pageInfo.textContent = `${currentPage} / ${totalPages} ページ`;
    paginationContainer.appendChild(pagination);
    paginationContainer.appendChild(pageInfo);
}

// ページボタンを作成
function createPageButton(label, page) {
    const btn = document.createElement('button');
    btn.className = 'page-btn';
    btn.textContent = label;
    btn.addEventListener('click', () => {
        displayGalleryPage(page);
        createPagination();
        
        const gallerySection = document.querySelector('.gallery');
        if (gallerySection) {
            gallerySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
    return btn;
}

// 画像クリック時に拡大表示
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('gallery-image')) {
        openImageModal(e.target.src, e.target.alt);
    }
});

// モーダルで画像を拡大表示
function openImageModal(src, alt) {
    const existingModal = document.querySelector('.image-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-backdrop"></div>
        <div class="modal-content">
            <button class="modal-close">✕</button>
            <img src="${src}" alt="${alt}" class="modal-image">
        </div>
    `;
    
    document.body.appendChild(modal);
    
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    modal.querySelector('.modal-close').addEventListener('click', closeImageModal);
    modal.querySelector('.modal-backdrop').addEventListener('click', closeImageModal);
    
    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            closeImageModal();
            document.removeEventListener('keydown', escHandler);
        }
    });
}

// モーダルを閉じる
function closeImageModal() {
    const modal = document.querySelector('.image-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}
