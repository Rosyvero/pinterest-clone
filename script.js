// Pinterest Clone - JavaScript

document.addEventListener('DOMContentLoaded', () => {
    const masonryGrid = document.getElementById('masonryGrid');
    const searchInput = document.getElementById('searchInput');
    const clearSearch = document.getElementById('clearSearch');

    // Pin data with unique aesthetic images (no duplicates)
    const pins = [
        {
            id: 1,
            image: 'images/vintage-room.jpg',
            alt: 'Vintage room with record player and floral wallpaper'
        },
        {
            id: 2,
            image: 'images/sunflower.jpg',
            alt: 'Sunflower with beautiful shadow in golden hour light'
        },
        {
            id: 3,
            image: 'images/daisies-book.jpg',
            alt: 'White daisies scattered on vintage book and white fabric'
        },
        {
            id: 4,
            image: 'images/pressed-flowers.jpg',
            alt: 'Pressed dried flowers botanical art'
        },
        {
            id: 5,
            image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&auto=format&fit=crop',
            alt: 'Pink tulips in spring garden'
        },
        {
            id: 6,
            image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&auto=format&fit=crop',
            alt: 'Golden hour sunlight through forest'
        },
        {
            id: 7,
            image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&auto=format&fit=crop',
            alt: 'Cozy cafe interior aesthetic'
        },
        {
            id: 8,
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&auto=format&fit=crop',
            alt: 'Mountain landscape at sunrise'
        },
        {
            id: 9,
            image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=400&auto=format&fit=crop',
            alt: 'Coffee and pastry flatlay'
        },
        {
            id: 10,
            image: 'https://images.unsplash.com/photo-1502635385003-ee1e6a1a742d?w=400&auto=format&fit=crop',
            alt: 'Lavender field at sunset'
        },
        {
            id: 11,
            image: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6?w=400&auto=format&fit=crop',
            alt: 'Basketball court aesthetic'
        },
        {
            id: 12,
            image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&auto=format&fit=crop',
            alt: 'Cozy living room interior'
        },
        {
            id: 13,
            image: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=400&auto=format&fit=crop',
            alt: 'Healthy breakfast bowl'
        },
        {
            id: 14,
            image: 'https://images.unsplash.com/photo-1519985176271-adb1088fa94c?w=400&auto=format&fit=crop',
            alt: 'Colorful balloons celebration'
        },
        {
            id: 15,
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop',
            alt: 'Portrait photography'
        },
        {
            id: 16,
            image: 'https://images.unsplash.com/photo-1468581264429-2548ef9eb732?w=400&auto=format&fit=crop',
            alt: 'Forest path in autumn'
        }
    ];

    // Create pin card HTML
    function createPinCard(pin) {
        const pinCard = document.createElement('div');
        pinCard.className = 'pin-card';
        pinCard.innerHTML = `
            <img src="${pin.image}" alt="${pin.alt}" class="pin-image" loading="lazy">
            <div class="pin-overlay">
                <div class="pin-actions-top">
                    <button class="save-btn">Save</button>
                </div>
                <div class="pin-actions-bottom">
                    <div class="pin-source">
                        <div class="pin-source-icon">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm0 22C6.5 22 2 17.5 2 12S6.5 2 12 2s10 4.5 10 10-4.5 10-10 10z"/>
                                <path d="M12 6c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6z"/>
                            </svg>
                        </div>
                    </div>
                    <div class="pin-actions-right" style="display: flex; gap: 8px;">
                        <button class="pin-icon-btn" title="Share">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M21 12l-7-7v4C7 10 4 15 3 20c2.5-3.5 6-5.1 11-5.1V19l7-7z"/>
                            </svg>
                        </button>
                        <button class="pin-icon-btn" title="More">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <circle cx="12" cy="12" r="2"/>
                                <circle cx="12" cy="5" r="2"/>
                                <circle cx="12" cy="19" r="2"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `;
        return pinCard;
    }

    // Render all pins
    function renderPins() {
        masonryGrid.innerHTML = '';
        pins.forEach(pin => {
            const pinCard = createPinCard(pin);
            masonryGrid.appendChild(pinCard);
        });
    }

    // Clear search functionality
    clearSearch.addEventListener('click', () => {
        searchInput.value = '';
        searchInput.focus();
    });

    // Filter tags click handler
    document.querySelectorAll('.filter-tag').forEach(tag => {
        tag.addEventListener('click', () => {
            const tagText = tag.querySelector('span').textContent;
            searchInput.value = tagText.toLowerCase();
        });
    });

    // Save button click handler
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('save-btn')) {
            const btn = e.target;
            if (btn.textContent === 'Save') {
                btn.textContent = 'Saved';
                btn.style.backgroundColor = '#111';
            } else {
                btn.textContent = 'Save';
                btn.style.backgroundColor = '#e60023';
            }
        }
    });

    // Sidebar Navigation Click Handlers
    const sidebarIcons = document.querySelectorAll('.sidebar-icon');

    // Function to set active navigation item
    function setActiveNav(clickedIcon) {
        sidebarIcons.forEach(icon => {
            icon.classList.remove('active');
        });
        clickedIcon.classList.add('active');
    }

    // Pinterest Logo - scroll to top
    document.getElementById('nav-logo').addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        showToast('Pinterest Home');
    });

    // Home button
    document.getElementById('nav-home').addEventListener('click', (e) => {
        e.preventDefault();
        setActiveNav(e.currentTarget);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        showToast('Home Feed');
    });

    // Explore button
    document.getElementById('nav-explore').addEventListener('click', (e) => {
        e.preventDefault();
        setActiveNav(e.currentTarget);
        searchInput.value = 'explore';
        showToast('Explore Ideas');
    });

    // Create button - show create modal
    document.getElementById('nav-create').addEventListener('click', (e) => {
        e.preventDefault();
        setActiveNav(e.currentTarget);
        showModal('Create', 'Create a new Pin or Board');
    });

    // Messages button
    document.getElementById('nav-messages').addEventListener('click', (e) => {
        e.preventDefault();
        setActiveNav(e.currentTarget);
        showModal('Messages', 'You have no new messages');
    });

    // Notifications button
    document.getElementById('nav-notifications').addEventListener('click', (e) => {
        e.preventDefault();
        setActiveNav(e.currentTarget);
        showModal('Notifications', 'You\'re all caught up! 🎉');
    });

    // Updates button
    document.getElementById('nav-updates').addEventListener('click', (e) => {
        e.preventDefault();
        setActiveNav(e.currentTarget);
        showModal('Updates', 'No new updates');
    });

    // Settings button
    document.getElementById('nav-settings').addEventListener('click', (e) => {
        e.preventDefault();
        showModal('Settings', 'Manage your account settings');
    });

    // Toast notification function
    function showToast(message) {
        // Remove existing toast
        const existingToast = document.querySelector('.toast');
        if (existingToast) existingToast.remove();

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 24px;
            left: 50%;
            transform: translateX(-50%);
            background-color: #111;
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            z-index: 1000;
            animation: slideUp 0.3s ease;
        `;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    }

    // Modal function
    function showModal(title, content) {
        // Remove existing modal
        const existingModal = document.querySelector('.modal-overlay');
        if (existingModal) existingModal.remove();

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${title}</h2>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <p>${content}</p>
                </div>
            </div>
        `;
        modal.style.cssText = `
            position: fixed;
            inset: 0;
            background-color: rgba(0, 0, 0, 0.6);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            animation: fadeIn 0.2s ease;
        `;

        const modalContent = modal.querySelector('.modal-content');
        modalContent.style.cssText = `
            background: white;
            border-radius: 16px;
            padding: 24px;
            min-width: 320px;
            max-width: 480px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
            animation: scaleIn 0.2s ease;
        `;

        const modalHeader = modal.querySelector('.modal-header');
        modalHeader.style.cssText = `
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 16px;
        `;

        const modalClose = modal.querySelector('.modal-close');
        modalClose.style.cssText = `
            background: none;
            border: none;
            font-size: 28px;
            cursor: pointer;
            color: #767676;
            line-height: 1;
            padding: 0 8px;
            border-radius: 50%;
            transition: background-color 0.2s;
        `;

        const modalBody = modal.querySelector('.modal-body');
        modalBody.style.cssText = `
            color: #767676;
            font-size: 16px;
        `;

        document.body.appendChild(modal);

        // Close modal on click outside or close button
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.classList.contains('modal-close')) {
                modal.remove();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape') {
                modal.remove();
                document.removeEventListener('keydown', escHandler);
            }
        });
    }

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideUp {
            from { transform: translateX(-50%) translateY(20px); opacity: 0; }
            to { transform: translateX(-50%) translateY(0); opacity: 1; }
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes scaleIn {
            from { transform: scale(0.9); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
    `;
    document.head.appendChild(style);

    // Initialize
    renderPins();
});
