// Pinterest Clone - JavaScript

// ============================================
// UNSPLASH API CONFIGURATION
// ============================================
// To use the Unsplash API:
// 1. Go to https://unsplash.com/developers
// 2. Create a free account and register an application
// 3. Copy your Access Key and paste it below
// ============================================
const UNSPLASH_ACCESS_KEY = 'MkovGsPFoYxHbKRBOBto1aEEcT4nPktJRq2ecfDrhbc';
const UNSPLASH_API_URL = 'https://api.unsplash.com/search/photos';

document.addEventListener('DOMContentLoaded', () => {
    const masonryGrid = document.getElementById('masonryGrid');
    const searchInput = document.getElementById('searchInput');
    const clearSearch = document.getElementById('clearSearch');

    // Explicitly clear search on load
    if (searchInput) {
        searchInput.value = '';
    }

    // Track if we're showing API results or local pins
    let isShowingAPIResults = false;

    // Pin data with tags for filtering
    const pins = [
        {
            id: 1,
            image: 'images/vintage-room.jpg',
            alt: 'Vintage room with record player and floral wallpaper',
            tags: ['aesthetic', 'vintage', 'room', 'pictures', 'summer']
        },
        {
            id: 2,
            image: 'images/sunflower.jpg',
            alt: 'Sunflower with beautiful shadow in golden hour light',
            tags: ['aesthetic', 'summer', 'flowers', 'pictures', 'yellow']
        },
        {
            id: 3,
            image: 'images/daisies-book.jpg',
            alt: 'White daisies scattered on vintage book and white fabric',
            tags: ['aesthetic', 'pictures', 'flowers', 'quotes', 'summer']
        },
        {
            id: 4,
            image: 'images/pressed-flowers.jpg',
            alt: 'Pressed dried flowers botanical art',
            tags: ['aesthetic', 'pink', 'flowers', 'pictures', 'summer']
        },
        {
            id: 5,
            image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&auto=format&fit=crop',
            alt: 'Pink tulips in spring garden',
            tags: ['pink', 'flowers', 'pictures', 'summer', 'aesthetic']
        },
        {
            id: 6,
            image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&auto=format&fit=crop',
            alt: 'Golden hour sunlight through forest',
            tags: ['summer', 'pictures', 'aesthetic', 'nature']
        },
        {
            id: 7,
            image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&auto=format&fit=crop',
            alt: 'Cozy cafe interior aesthetic',
            tags: ['aesthetic', 'pictures', 'quotes']
        },
        {
            id: 8,
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&auto=format&fit=crop',
            alt: 'Mountain landscape at sunrise',
            tags: ['blue', 'pictures', 'summer', 'aesthetic']
        },
        {
            id: 9,
            image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=400&auto=format&fit=crop',
            alt: 'Coffee and pastry flatlay',
            tags: ['aesthetic', 'pictures', 'quotes']
        },
        {
            id: 10,
            image: 'https://images.unsplash.com/photo-1502635385003-ee1e6a1a742d?w=400&auto=format&fit=crop',
            alt: 'Lavender field at sunset',
            tags: ['purple', 'summer', 'pictures', 'aesthetic', 'flowers']
        },
        {
            id: 11,
            image: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6?w=400&auto=format&fit=crop',
            alt: 'Basketball court aesthetic',
            tags: ['pictures', 'aesthetic', 'blue', 'sports']
        },
        {
            id: 12,
            image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&auto=format&fit=crop',
            alt: 'Cozy living room interior',
            tags: ['aesthetic', 'pictures', 'room']
        },
        {
            id: 13,
            image: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=400&auto=format&fit=crop',
            alt: 'Healthy breakfast bowl',
            tags: ['pictures', 'aesthetic', 'pink', 'food']
        },
        {
            id: 14,
            image: 'https://images.unsplash.com/photo-1519985176271-adb1088fa94c?w=400&auto=format&fit=crop',
            alt: 'Colorful balloons celebration',
            tags: ['pink', 'pictures', 'aesthetic', 'summer']
        },
        {
            id: 15,
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop',
            alt: 'Portrait photography pfp',
            tags: ['pfp', 'pictures', 'aesthetic']
        },
        {
            id: 16,
            image: 'https://images.unsplash.com/photo-1468581264429-2548ef9eb732?w=400&auto=format&fit=crop',
            alt: 'Forest path in autumn',
            tags: ['pictures', 'aesthetic', 'summer', 'nature']
        },
        // Additional pins for better filtering
        {
            id: 17,
            image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&auto=format&fit=crop',
            alt: 'Gym workout fitness aesthetic',
            tags: ['gym', 'outfits', 'aesthetic']
        },
        {
            id: 18,
            image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&auto=format&fit=crop',
            alt: 'Fitness girl gym workout',
            tags: ['gym', 'outfits', 'aesthetic', 'pfp']
        },
        {
            id: 19,
            image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&auto=format&fit=crop',
            alt: 'Pink aesthetic room decor',
            tags: ['pink', 'aesthetic', 'room', 'pictures']
        },
        {
            id: 20,
            image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&auto=format&fit=crop',
            alt: 'Fashion outfit street style',
            tags: ['outfits', 'aesthetic', 'pfp', 'pictures']
        },
        {
            id: 21,
            image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&auto=format&fit=crop',
            alt: 'Fashion model outfit aesthetic',
            tags: ['outfits', 'aesthetic', 'pfp']
        },
        {
            id: 22,
            image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop',
            alt: 'Beautiful portrait pfp girl',
            tags: ['pfp', 'aesthetic', 'pictures']
        },
        {
            id: 23,
            image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop',
            alt: 'Portrait aesthetic profile picture',
            tags: ['pfp', 'aesthetic', 'pictures']
        },
        {
            id: 24,
            image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&auto=format&fit=crop',
            alt: 'Motivational quotes aesthetic',
            tags: ['quotes', 'aesthetic', 'pictures']
        },
        {
            id: 25,
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&auto=format&fit=crop',
            alt: 'Blue sky mountains aesthetic',
            tags: ['blue', 'pictures', 'summer', 'aesthetic']
        },
        {
            id: 26,
            image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&auto=format&fit=crop',
            alt: 'Beach summer vibes ocean',
            tags: ['summer', 'blue', 'pictures', 'aesthetic']
        },
        {
            id: 27,
            image: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?w=400&auto=format&fit=crop',
            alt: 'Purple aesthetic sunset',
            tags: ['purple', 'aesthetic', 'pictures', 'summer']
        },
        {
            id: 28,
            image: 'https://images.unsplash.com/photo-1464820453369-31d2c0b651af?w=400&auto=format&fit=crop',
            alt: 'Purple flowers lavender field',
            tags: ['purple', 'flowers', 'pictures', 'aesthetic']
        }
    ];

    // Create pin card HTML
    function createPinCard(pin) {
        const pinCard = document.createElement('div');
        pinCard.className = 'pin-card';
        pinCard.dataset.image = pin.image;
        pinCard.dataset.alt = pin.alt;
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

        // Add click event to open image lightbox
        pinCard.addEventListener('click', (e) => {
            // Don't open lightbox if clicking on buttons
            if (e.target.closest('.save-btn') || e.target.closest('.pin-icon-btn')) {
                return;
            }
            openImageLightbox(pin.image, pin.alt);
        });

        return pinCard;
    }

    // Image Lightbox function - Simple image only view
    function openImageLightbox(imageSrc, imageAlt) {
        const lightbox = document.createElement('div');
        lightbox.className = 'image-lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-backdrop"></div>
            <button class="lightbox-close" title="Close">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
            </button>
            <img src="${imageSrc}" alt="${imageAlt}" class="lightbox-image">
        `;

        // Apply styles
        lightbox.style.cssText = `
            position: fixed;
            inset: 0;
            z-index: 2000;
            display: flex;
            align-items: center;
            justify-content: center;
        `;

        const backdrop = lightbox.querySelector('.lightbox-backdrop');
        backdrop.style.cssText = `
            position: absolute;
            inset: 0;
            background: rgba(0, 0, 0, 0.9);
            animation: fadeIn 0.2s ease;
        `;

        const closeBtn = lightbox.querySelector('.lightbox-close');
        closeBtn.style.cssText = `
            position: absolute;
            top: 20px;
            right: 20px;
            width: 48px;
            height: 48px;
            background: rgba(255, 255, 255, 0.9);
            border: none;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
            transition: transform 0.2s, background 0.2s;
        `;
        closeBtn.querySelector('svg').style.cssText = 'width: 24px; height: 24px;';

        const image = lightbox.querySelector('.lightbox-image');
        image.style.cssText = `
            max-height: 90vh;
            max-width: 90vw;
            object-fit: contain;
            border-radius: 16px;
            z-index: 5;
            animation: scaleIn 0.3s ease;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        `;

        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';

        // Close handlers
        const closeLightbox = () => {
            lightbox.remove();
            document.body.style.overflow = '';
        };

        backdrop.addEventListener('click', closeLightbox);
        closeBtn.addEventListener('click', closeLightbox);

        // Close on Escape
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                closeLightbox();
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
    }

    // Render pins with optional filter
    function renderPins(filterTerm = '') {
        masonryGrid.innerHTML = '';

        const filteredPins = filterTerm
            ? pins.filter(pin => {
                const searchLower = filterTerm.toLowerCase();
                // Check if search term matches tags or alt text
                const matchesTags = pin.tags && pin.tags.some(tag => tag.toLowerCase().includes(searchLower));
                const matchesAlt = pin.alt.toLowerCase().includes(searchLower);
                return matchesTags || matchesAlt;
            })
            : pins;

        if (filteredPins.length === 0) {
            masonryGrid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
                    <h2 style="color: #111; margin-bottom: 8px;">No results found</h2>
                    <p style="color: #767676;">Try searching for something else</p>
                </div>
            `;
            return;
        }

        filteredPins.forEach(pin => {
            const pinCard = createPinCard(pin);
            masonryGrid.appendChild(pinCard);
        });
    }

    // Search functionality - only update UI, don't filter while typing
    searchInput.addEventListener('input', (e) => {
        // Don't filter while typing - wait for Enter key to search API
        // Just update the filter tag highlights
        const searchTerm = e.target.value.trim().toLowerCase();
        document.querySelectorAll('.filter-tag').forEach(tag => {
            const tagText = tag.querySelector('span').textContent.toLowerCase();
            if (tagText === searchTerm) {
                tag.classList.add('active');
            } else {
                tag.classList.remove('active');
            }
        });
    });

    // --- Search Overlay Logic ---
    const searchOverlay = document.getElementById('searchOverlay');
    const recentSearchesGrid = document.getElementById('recentSearchesGrid');

    const recentSearches = [
        { text: 'aesthetic', image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=100&h=100&fit=crop' },
        { text: 'sea blue suit men outfit', image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=100&h=100&fit=crop' },
        { text: 'sea green suit men outfit', image: 'https://images.unsplash.com/photo-1593032465175-481ac7f401a0?w=100&h=100&fit=crop' },
        { text: 'Sea green', color: '#568c7d' },
        { text: 'butterfly haircut', image: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?w=100&h=100&fit=crop' },
        { text: 'kitchen design with island', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=100&h=100&fit=crop' },
        { text: 'kitchen design', image: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=100&h=100&fit=crop' },
        { text: 'Lavender saree', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=100&h=100&fit=crop' }
    ];

    function renderRecentSearches() {
        if (!recentSearchesGrid) return;

        recentSearchesGrid.innerHTML = '';
        recentSearches.forEach(search => {
            const item = document.createElement('div');
            item.className = 'recent-search-item';

            let visualContent = '';
            if (search.image) {
                visualContent = `<img src="${search.image}" alt="${search.text}" class="recent-search-image">`;
            } else if (search.color) {
                visualContent = `<div class="recent-search-image" style="background-color: ${search.color}"></div>`;
            } else {
                visualContent = `
                    <div class="recent-search-icon-wrapper">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                        </svg>
                    </div>`;
            }

            item.innerHTML = `
                ${visualContent}
                <span class="recent-search-text">${search.text}</span>
            `;

            item.addEventListener('click', (e) => {
                e.stopPropagation();
                searchInput.value = search.text;
                searchOverlay.classList.remove('active');

                // Trigger search
                if (UNSPLASH_ACCESS_KEY !== 'YOUR_UNSPLASH_ACCESS_KEY_HERE') {
                    searchUnsplashImages(search.text);
                } else {
                    renderPins(search.text);
                }
            });

            recentSearchesGrid.appendChild(item);
        });
    }

    renderRecentSearches();

    // Show overlay on focus
    searchInput.addEventListener('focus', () => {
        console.log('Search input focused - showing overlay');
        searchOverlay.classList.add('active');
        searchOverlay.style.display = 'block'; // Force display
    });

    // Hide overlay when clicking outside
    document.addEventListener('mousedown', (e) => {
        if (!e.target.closest('.search-container')) {
            console.log('Clicked outside - hiding overlay');
            searchOverlay.classList.remove('active');
            searchOverlay.style.display = 'none'; // Force hide
        }
    });

    // Search Unsplash API on Enter key
    searchInput.addEventListener('keydown', async (e) => {
        if (e.key === 'Enter') {
            const searchTerm = e.target.value.trim();
            searchOverlay.classList.remove('active');
            searchInput.blur(); // Also blur to match common UX

            if (!searchTerm) {
                // If empty, show local pins
                isShowingAPIResults = false;
                renderPins('');
                return;
            }

            // Check if API key is configured
            if (UNSPLASH_ACCESS_KEY === 'YOUR_UNSPLASH_ACCESS_KEY_HERE') {
                showToast('⚠️ Please add your Unsplash API key in script.js');
                // Fall back to local filtering
                renderPins(searchTerm);
                return;
            }

            // Search using Unsplash API
            console.log('Searching Unsplash for:', searchTerm);
            await searchUnsplashImages(searchTerm);
        }
    });

    // Unsplash API Search Function
    async function searchUnsplashImages(query) {
        console.log('searchUnsplashImages called with:', query);

        // Show loading state
        masonryGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
                <div class="loading-spinner"></div>
                <p style="color: #767676; margin-top: 16px;">Searching for "${query}"...</p>
            </div>
        `;

        try {
            const apiUrl = `${UNSPLASH_API_URL}?query=${encodeURIComponent(query)}&per_page=30`;
            console.log('Fetching:', apiUrl);

            const response = await fetch(apiUrl, {
                headers: {
                    'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
                }
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }

            const data = await response.json();

            if (data.results.length === 0) {
                masonryGrid.innerHTML = `
                    <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
                        <h2 style="color: #111; margin-bottom: 8px;">No results found for "${query}"</h2>
                        <p style="color: #767676;">Try searching for something else</p>
                    </div>
                `;
                return;
            }

            // Mark that we're showing API results
            isShowingAPIResults = true;

            // Clear and render API results
            masonryGrid.innerHTML = '';

            data.results.forEach((photo, index) => {
                const pinCard = createAPICard(photo, index);
                masonryGrid.appendChild(pinCard);
            });

            showToast(`Found ${data.results.length} images for "${query}"`);

        } catch (error) {
            console.error('Unsplash API Error:', error);
            masonryGrid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
                    <h2 style="color: #e60023; margin-bottom: 8px;">Failed to fetch images</h2>
                    <p style="color: #767676;">${error.message}</p>
                    <button onclick="location.reload()" style="margin-top: 16px; padding: 12px 24px; background: #e60023; color: white; border: none; border-radius: 24px; cursor: pointer; font-weight: 600;">Try Again</button>
                </div>
            `;
        }
    }

    // Create pin card from Unsplash API result
    function createAPICard(photo, index) {
        const pinCard = document.createElement('div');
        pinCard.className = 'pin-card';
        pinCard.dataset.image = photo.urls.regular;
        pinCard.dataset.alt = photo.alt_description || photo.description || 'Unsplash Photo';

        pinCard.innerHTML = `
            <img src="${photo.urls.small}" alt="${photo.alt_description || 'Unsplash Photo'}" class="pin-image" loading="lazy">
            <div class="pin-overlay">
                <div class="pin-actions-top">
                    <button class="save-btn">Save</button>
                </div>
                <div class="pin-actions-bottom">
                    <div class="pin-source">
                        <div class="pin-source-icon">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                            </svg>
                        </div>
                        <span>unsplash.com</span>
                    </div>
                    <div class="pin-icon-btns">
                        <button class="pin-icon-btn" title="Share">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/>
                            </svg>
                        </button>
                        <button class="pin-icon-btn" title="More">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div class="photo-credit">
                <span>📷 ${photo.user.name}</span>
            </div>
        `;

        // Click to open lightbox
        pinCard.addEventListener('click', (e) => {
            if (e.target.closest('.save-btn') || e.target.closest('.pin-icon-btn')) {
                return;
            }
            openImageLightbox(photo.urls.regular, photo.alt_description || 'Unsplash Photo');
        });

        return pinCard;
    }

    // Clear search functionality
    clearSearch.addEventListener('click', () => {
        searchInput.value = '';
        searchInput.focus();
        isShowingAPIResults = false;
        renderPins(''); // Show all local pins

        // Remove active state from all filter tags
        document.querySelectorAll('.filter-tag').forEach(tag => {
            tag.classList.remove('active');
        });
    });

    // Filter tags click handler
    document.querySelectorAll('.filter-tag').forEach(tag => {
        tag.addEventListener('click', () => {
            const tagText = tag.querySelector('span').textContent;
            searchInput.value = tagText.toLowerCase();

            // Remove active from all tags, add to clicked
            document.querySelectorAll('.filter-tag').forEach(t => t.classList.remove('active'));
            tag.classList.add('active');

            // Filter pins
            renderPins(tagText.toLowerCase());
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

    // Filter settings button (horizontal lines icon) - opens filter panel
    const filterSettingsBtn = document.getElementById('filterSettingsBtn');
    let currentFilter = 'all-pins'; // Track current filter selection

    console.log('Filter button found:', filterSettingsBtn);

    if (filterSettingsBtn) {
        filterSettingsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Filter button clicked!');
            showFilterPanel();
        });
    } else {
        console.error('Filter settings button not found!');
    }

    // Show Filter Panel Modal
    function showFilterPanel() {
        // Remove existing panel if any
        const existingPanel = document.querySelector('.filter-panel-overlay');
        if (existingPanel) {
            existingPanel.remove();
            return;
        }

        const overlay = document.createElement('div');
        overlay.className = 'filter-panel-overlay';
        overlay.innerHTML = `
            <div class="filter-panel">
                <h3 class="filter-panel-title">Filters</h3>
                
                <div class="filter-options">
                    <label class="filter-option">
                        <span>All Pins</span>
                        <input type="radio" name="filter-type" value="all-pins" ${currentFilter === 'all-pins' ? 'checked' : ''}>
                        <span class="radio-custom"></span>
                    </label>
                    
                    <label class="filter-option">
                        <span>Videos</span>
                        <input type="radio" name="filter-type" value="videos" ${currentFilter === 'videos' ? 'checked' : ''}>
                        <span class="radio-custom"></span>
                    </label>
                    
                    <label class="filter-option">
                        <span>Boards</span>
                        <input type="radio" name="filter-type" value="boards" ${currentFilter === 'boards' ? 'checked' : ''}>
                        <span class="radio-custom"></span>
                    </label>
                    
                    <label class="filter-option">
                        <span>Profiles</span>
                        <input type="radio" name="filter-type" value="profiles" ${currentFilter === 'profiles' ? 'checked' : ''}>
                        <span class="radio-custom"></span>
                    </label>
                </div>
                
                <div class="filter-panel-buttons">
                    <button class="filter-reset-btn">Reset</button>
                    <button class="filter-apply-btn">Apply</button>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        // Style the overlay and panel
        Object.assign(overlay.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.4)',
            zIndex: '1000',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingTop: '120px'
        });

        const panel = overlay.querySelector('.filter-panel');
        Object.assign(panel.style, {
            background: 'white',
            borderRadius: '16px',
            padding: '24px',
            width: '320px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            animation: 'slideDown 0.2s ease'
        });

        const title = panel.querySelector('.filter-panel-title');
        Object.assign(title.style, {
            fontSize: '16px',
            fontWeight: '600',
            marginBottom: '20px',
            color: '#111'
        });

        const options = panel.querySelectorAll('.filter-option');
        options.forEach(opt => {
            Object.assign(opt.style, {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 0',
                borderBottom: '1px solid #efefef',
                cursor: 'pointer',
                fontSize: '16px'
            });

            const input = opt.querySelector('input');
            input.style.display = 'none';

            const radioCustom = opt.querySelector('.radio-custom');
            Object.assign(radioCustom.style, {
                width: '24px',
                height: '24px',
                border: '2px solid #cdcdcd',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s'
            });

            if (input.checked) {
                radioCustom.style.borderColor = '#0076d3';
                radioCustom.innerHTML = '<div style="width: 12px; height: 12px; background: #0076d3; border-radius: 50%;"></div>';
            }

            opt.addEventListener('click', () => {
                options.forEach(o => {
                    o.querySelector('input').checked = false;
                    const rc = o.querySelector('.radio-custom');
                    rc.style.borderColor = '#cdcdcd';
                    rc.innerHTML = '';
                });
                input.checked = true;
                radioCustom.style.borderColor = '#0076d3';
                radioCustom.innerHTML = '<div style="width: 12px; height: 12px; background: #0076d3; border-radius: 50%;"></div>';
            });
        });

        const buttonsDiv = panel.querySelector('.filter-panel-buttons');
        Object.assign(buttonsDiv.style, {
            display: 'flex',
            gap: '12px',
            marginTop: '24px',
            justifyContent: 'center'
        });

        const resetBtn = panel.querySelector('.filter-reset-btn');
        Object.assign(resetBtn.style, {
            padding: '12px 24px',
            background: '#efefef',
            border: 'none',
            borderRadius: '24px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            color: '#111'
        });

        const applyBtn = panel.querySelector('.filter-apply-btn');
        Object.assign(applyBtn.style, {
            padding: '12px 24px',
            background: '#e60023',
            border: 'none',
            borderRadius: '24px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            color: 'white'
        });

        // Close on overlay click
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.remove();
            }
        });

        // Reset button
        resetBtn.onclick = () => {
            currentFilter = 'all-pins';
            overlay.remove();
            renderPins('');
            showToast('Filters reset');
        };

        // Apply button
        applyBtn.onclick = async () => {
            console.log('Apply button clicked!');
            const selected = panel.querySelector('input[name="filter-type"]:checked');
            console.log('Selected filter:', selected ? selected.value : 'none');

            if (selected) {
                currentFilter = selected.value;
                overlay.remove();
                console.log('Applying filter:', currentFilter);

                // Apply the filter
                if (currentFilter === 'all-pins') {
                    console.log('Showing all pins');
                    renderPins('');
                    showToast('Showing all pins');
                } else if (currentFilter === 'videos') {
                    console.log('Fetching videos...');
                    // Search for video/film related content
                    await searchFilterContent('cinema film video', '🎬 Videos');
                } else if (currentFilter === 'boards') {
                    console.log('Showing boards...');
                    // Show sample boards layout
                    showBoardsView();
                } else if (currentFilter === 'profiles') {
                    console.log('Showing profiles...');
                    // Show sample profiles
                    showProfilesView();
                }
            } else {
                console.log('No filter selected');
                showToast('Please select a filter');
            }
        };
    }

    // Search content for filter options
    async function searchFilterContent(query, title) {
        masonryGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
                <div class="loading-spinner"></div>
                <p style="color: #767676; margin-top: 16px;">Loading ${title}...</p>
            </div>
        `;

        try {
            const response = await fetch(
                `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=20`,
                {
                    headers: {
                        'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
                    }
                }
            );

            if (!response.ok) throw new Error('API Error');

            const data = await response.json();
            masonryGrid.innerHTML = '';

            data.results.forEach((photo, index) => {
                const pinCard = createAPICard(photo, index);
                masonryGrid.appendChild(pinCard);
            });

            showToast(`${title} loaded!`);
        } catch (error) {
            console.error(error);
            masonryGrid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
                    <h2 style="color: #111;">Failed to load content</h2>
                    <p style="color: #767676;">Please try again later</p>
                </div>
            `;
        }
    }

    // Show Boards View
    function showBoardsView() {
        masonryGrid.innerHTML = `
            <div style="grid-column: 1/-1; padding: 20px;">
                <h2 style="margin-bottom: 24px; color: #111;">📋 Your Boards</h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px;">
                    <div class="board-card" style="background: linear-gradient(135deg, #ff6b6b, #feca57); border-radius: 16px; padding: 24px; color: white; cursor: pointer; transition: transform 0.2s;">
                        <h3 style="margin-bottom: 8px;">💕 Aesthetic</h3>
                        <p style="opacity: 0.9;">24 Pins</p>
                    </div>
                    <div class="board-card" style="background: linear-gradient(135deg, #5f27cd, #a55eea); border-radius: 16px; padding: 24px; color: white; cursor: pointer; transition: transform 0.2s;">
                        <h3 style="margin-bottom: 8px;">� Pink Vibes</h3>
                        <p style="opacity: 0.9;">18 Pins</p>
                    </div>
                    <div class="board-card" style="background: linear-gradient(135deg, #00d2d3, #54a0ff); border-radius: 16px; padding: 24px; color: white; cursor: pointer; transition: transform 0.2s;">
                        <h3 style="margin-bottom: 8px;">🏋️ Fitness Goals</h3>
                        <p style="opacity: 0.9;">32 Pins</p>
                    </div>
                    <div class="board-card" style="background: linear-gradient(135deg, #ff9ff3, #f368e0); border-radius: 16px; padding: 24px; color: white; cursor: pointer; transition: transform 0.2s;">
                        <h3 style="margin-bottom: 8px;">👗 Outfits</h3>
                        <p style="opacity: 0.9;">45 Pins</p>
                    </div>
                    <div class="board-card" style="background: linear-gradient(135deg, #ffeaa7, #fdcb6e); border-radius: 16px; padding: 24px; color: #333; cursor: pointer; transition: transform 0.2s;">
                        <h3 style="margin-bottom: 8px;">☀️ Summer</h3>
                        <p style="opacity: 0.9;">28 Pins</p>
                    </div>
                    <div class="board-card" style="background: linear-gradient(135deg, #636e72, #2d3436); border-radius: 16px; padding: 24px; color: white; cursor: pointer; transition: transform 0.2s;">
                        <h3 style="margin-bottom: 8px;">📝 Quotes</h3>
                        <p style="opacity: 0.9;">56 Pins</p>
                    </div>
                </div>
            </div>
        `;
        showToast('📋 Showing your boards');

        // Add hover effects
        document.querySelectorAll('.board-card').forEach(card => {
            card.addEventListener('mouseenter', () => card.style.transform = 'scale(1.02)');
            card.addEventListener('mouseleave', () => card.style.transform = 'scale(1)');
            card.addEventListener('click', () => {
                const boardName = card.querySelector('h3').textContent;
                showToast(`Opening ${boardName}`);
            });
        });
    }

    // Show Profiles View
    function showProfilesView() {
        masonryGrid.innerHTML = `
            <div style="grid-column: 1/-1; padding: 20px;">
                <h2 style="margin-bottom: 24px; color: #111;">👤 People to Follow</h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px;">
                    <div class="profile-card" style="background: white; border-radius: 16px; padding: 24px; box-shadow: 0 2px 12px rgba(0,0,0,0.1); display: flex; align-items: center; gap: 16px; cursor: pointer; transition: transform 0.2s;">
                        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop" style="width: 60px; height: 60px; border-radius: 50%; object-fit: cover;">
                        <div>
                            <h3 style="margin-bottom: 4px; color: #111;">Sarah Johnson</h3>
                            <p style="color: #767676; font-size: 14px;">12.5k followers • 342 pins</p>
                        </div>
                        <button style="margin-left: auto; padding: 8px 16px; background: #e60023; color: white; border: none; border-radius: 24px; font-weight: 600; cursor: pointer;">Follow</button>
                    </div>
                    <div class="profile-card" style="background: white; border-radius: 16px; padding: 24px; box-shadow: 0 2px 12px rgba(0,0,0,0.1); display: flex; align-items: center; gap: 16px; cursor: pointer; transition: transform 0.2s;">
                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop" style="width: 60px; height: 60px; border-radius: 50%; object-fit: cover;">
                        <div>
                            <h3 style="margin-bottom: 4px; color: #111;">Alex Chen</h3>
                            <p style="color: #767676; font-size: 14px;">8.2k followers • 521 pins</p>
                        </div>
                        <button style="margin-left: auto; padding: 8px 16px; background: #e60023; color: white; border: none; border-radius: 24px; font-weight: 600; cursor: pointer;">Follow</button>
                    </div>
                    <div class="profile-card" style="background: white; border-radius: 16px; padding: 24px; box-shadow: 0 2px 12px rgba(0,0,0,0.1); display: flex; align-items: center; gap: 16px; cursor: pointer; transition: transform 0.2s;">
                        <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop" style="width: 60px; height: 60px; border-radius: 50%; object-fit: cover;">
                        <div>
                            <h3 style="margin-bottom: 4px; color: #111;">Emma Wilson</h3>
                            <p style="color: #767676; font-size: 14px;">25.1k followers • 687 pins</p>
                        </div>
                        <button style="margin-left: auto; padding: 8px 16px; background: #e60023; color: white; border: none; border-radius: 24px; font-weight: 600; cursor: pointer;">Follow</button>
                    </div>
                    <div class="profile-card" style="background: white; border-radius: 16px; padding: 24px; box-shadow: 0 2px 12px rgba(0,0,0,0.1); display: flex; align-items: center; gap: 16px; cursor: pointer; transition: transform 0.2s;">
                        <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop" style="width: 60px; height: 60px; border-radius: 50%; object-fit: cover;">
                        <div>
                            <h3 style="margin-bottom: 4px; color: #111;">James Miller</h3>
                            <p style="color: #767676; font-size: 14px;">5.8k followers • 198 pins</p>
                        </div>
                        <button style="margin-left: auto; padding: 8px 16px; background: #e60023; color: white; border: none; border-radius: 24px; font-weight: 600; cursor: pointer;">Follow</button>
                    </div>
                </div>
            </div>
        `;
        showToast('👤 Showing profiles');

        // Add hover effects and follow button functionality
        document.querySelectorAll('.profile-card').forEach(card => {
            card.addEventListener('mouseenter', () => card.style.transform = 'scale(1.01)');
            card.addEventListener('mouseleave', () => card.style.transform = 'scale(1)');

            const followBtn = card.querySelector('button');
            followBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (followBtn.textContent === 'Follow') {
                    followBtn.textContent = 'Following';
                    followBtn.style.background = '#111';
                    showToast('✅ Following!');
                } else {
                    followBtn.textContent = 'Follow';
                    followBtn.style.background = '#e60023';
                    showToast('Unfollowed');
                }
            });
        });
    }

    // All Pins Dropdown functionality
    const dropdownWrapper = document.getElementById('allPinsDropdown');
    const dropdownBtn = document.getElementById('allPinsBtn');
    const dropdownLabel = document.getElementById('dropdownLabel');
    const dropdownItems = document.querySelectorAll('.dropdown-item');

    // Toggle dropdown
    dropdownBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownWrapper.classList.toggle('open');
    });

    // Handle dropdown item click
    dropdownItems.forEach(item => {
        item.addEventListener('click', () => {
            const filter = item.dataset.filter;
            const label = item.textContent;

            // Update label
            dropdownLabel.textContent = label;

            // Update active state
            dropdownItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            // Close dropdown
            dropdownWrapper.classList.remove('open');

            // Filter pins
            if (filter) {
                searchInput.value = filter;
                renderPins(filter);
            } else {
                searchInput.value = '';
                renderPins('');
            }

            // Update filter tags active state
            document.querySelectorAll('.filter-tag').forEach(tag => {
                const tagText = tag.querySelector('span').textContent.toLowerCase();
                if (tagText === filter.toLowerCase()) {
                    tag.classList.add('active');
                } else {
                    tag.classList.remove('active');
                }
            });
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!dropdownWrapper.contains(e.target)) {
            dropdownWrapper.classList.remove('open');
        }
    });

    // User avatar click - show profile modal
    document.getElementById('userAvatar').addEventListener('click', () => {
        showModal('Profile', 'View and edit your profile settings');
    });

    // More button click
    document.getElementById('moreBtn').addEventListener('click', () => {
        showModal('More Options', 'Additional settings and options');
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

    // Function to show main content (pins grid)
    function showMainContent() {
        const mainContent = document.querySelector('.main-content');
        // Check if we need to restore the original content
        if (!document.getElementById('masonryGrid')) {
            location.reload(); // Simplest way to restore
        }
    }

    // Pinterest Logo - scroll to top and show home
    document.getElementById('nav-logo').addEventListener('click', (e) => {
        e.preventDefault();
        showMainContent();
        searchInput.value = '';
        renderPins('');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        showToast('Pinterest Home');
    });

    // Home button - show all pins
    document.getElementById('nav-home').addEventListener('click', (e) => {
        e.preventDefault();
        setActiveNav(e.currentTarget);
        showMainContent();
        searchInput.value = '';
        renderPins('');
        dropdownLabel.textContent = 'All Pins';
        window.scrollTo({ top: 0, behavior: 'smooth' });
        showToast('Home Feed');
    });

    // Explore button - fetch trending images from Unsplash API
    document.getElementById('nav-explore').addEventListener('click', async (e) => {
        e.preventDefault();
        setActiveNav(e.currentTarget);
        showMainContent();
        searchInput.value = '';
        dropdownLabel.textContent = 'Explore';

        // Fetch trending/popular images from Unsplash
        await fetchTrendingImages();
    });

    // Fetch trending images from Unsplash
    async function fetchTrendingImages() {
        console.log('fetchTrendingImages called');
        console.log('API Key:', UNSPLASH_ACCESS_KEY ? 'Present' : 'Missing');

        masonryGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
                <div class="loading-spinner"></div>
                <p style="color: #767676; margin-top: 16px;">Loading trending ideas...</p>
            </div>
        `;

        try {
            // Search for trending topics instead of random (more reliable)
            const trendingTopics = ['aesthetic', 'minimal', 'nature', 'fashion', 'home decor'];
            const randomTopic = trendingTopics[Math.floor(Math.random() * trendingTopics.length)];

            console.log('Fetching trending for topic:', randomTopic);

            const apiUrl = `https://api.unsplash.com/search/photos?query=${randomTopic}&per_page=20&order_by=popular`;
            console.log('API URL:', apiUrl);

            const response = await fetch(apiUrl, {
                headers: {
                    'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
                }
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }

            const data = await response.json();
            const photos = data.results;

            console.log('Got photos:', photos.length);

            masonryGrid.innerHTML = '';

            photos.forEach((photo, index) => {
                const pinCard = createAPICard(photo, index);
                masonryGrid.appendChild(pinCard);
            });

            window.scrollTo({ top: 0, behavior: 'smooth' });
            showToast(`✨ Trending ${randomTopic} ideas!`);

        } catch (error) {
            console.error('Error fetching trending:', error);
            // Fall back to local pins if API fails
            masonryGrid.innerHTML = '';
            const exploreCategories = ['summer', 'pink', 'blue', 'purple', 'aesthetic'];
            const explorePins = pins.filter(pin =>
                pin.tags && pin.tags.some(tag => exploreCategories.includes(tag))
            );
            explorePins.forEach(pin => {
                const pinCard = createPinCard(pin);
                masonryGrid.appendChild(pinCard);
            });
            window.scrollTo({ top: 0, behavior: 'smooth' });
            showToast('Explore trending ideas');
        }
    }

    // Create button - show create board modal
    document.getElementById('nav-create').addEventListener('click', (e) => {
        e.preventDefault();
        setActiveNav(e.currentTarget);
        showCreateBoardModal();
    });

    // Create Board Modal function
    function showCreateBoardModal() {
        const existingModal = document.querySelector('.modal-overlay');
        if (existingModal) existingModal.remove();

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="create-modal">
                <button class="modal-close-btn">&times;</button>
                <h2>Create board</h2>
                <div class="create-form">
                    <div class="form-group">
                        <label>Name</label>
                        <input type="text" id="boardName" placeholder='Like "Places to go" or "Recipes to make"'>
                    </div>
                    <div class="form-group checkbox-group">
                        <input type="checkbox" id="secretBoard">
                        <label for="secretBoard">Keep this board secret</label>
                    </div>
                    <p class="secret-hint">So only you and collaborators can see it.</p>
                    <button class="create-btn" id="createBoardBtn">Create</button>
                </div>
            </div>
        `;

        // Apply styles
        Object.assign(modal.style, {
            position: 'fixed',
            inset: '0',
            background: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: '2000'
        });

        const createModal = modal.querySelector('.create-modal');
        Object.assign(createModal.style, {
            background: 'white',
            borderRadius: '16px',
            padding: '24px',
            width: '100%',
            maxWidth: '400px',
            position: 'relative'
        });

        const closeBtn = modal.querySelector('.modal-close-btn');
        Object.assign(closeBtn.style, {
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'none',
            border: 'none',
            fontSize: '28px',
            cursor: 'pointer',
            color: '#767676'
        });

        const h2 = modal.querySelector('h2');
        Object.assign(h2.style, {
            textAlign: 'center',
            marginBottom: '24px',
            fontSize: '28px'
        });

        const formGroups = modal.querySelectorAll('.form-group');
        formGroups.forEach(fg => {
            Object.assign(fg.style, { marginBottom: '16px' });
        });

        const labels = modal.querySelectorAll('.form-group > label');
        labels.forEach(l => {
            Object.assign(l.style, {
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500'
            });
        });

        const input = modal.querySelector('input[type="text"]');
        Object.assign(input.style, {
            width: '100%',
            padding: '16px',
            border: '2px solid #cdcdcd',
            borderRadius: '16px',
            fontSize: '16px',
            boxSizing: 'border-box'
        });

        const checkboxGroup = modal.querySelector('.checkbox-group');
        Object.assign(checkboxGroup.style, {
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
        });

        const hint = modal.querySelector('.secret-hint');
        Object.assign(hint.style, {
            color: '#767676',
            fontSize: '12px',
            marginBottom: '24px'
        });

        const createBtn = modal.querySelector('.create-btn');
        Object.assign(createBtn.style, {
            width: '100%',
            padding: '16px',
            background: '#e60023',
            color: 'white',
            border: 'none',
            borderRadius: '24px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer'
        });

        document.body.appendChild(modal);
        input.focus();

        // Event handlers
        closeBtn.onclick = () => modal.remove();
        modal.onclick = (e) => { if (e.target === modal) modal.remove(); };

        createBtn.onclick = () => {
            const boardName = input.value.trim();
            if (boardName) {
                modal.remove();
                showToast(`Board "${boardName}" created! 🎉`);
            } else {
                input.style.borderColor = '#e60023';
                input.placeholder = 'Please enter a board name';
            }
        };
    }

    // Messages button - show messages page
    document.getElementById('nav-messages').addEventListener('click', (e) => {
        e.preventDefault();
        setActiveNav(e.currentTarget);
        showPageView('messages');
    });

    // Notifications button - show notifications page
    document.getElementById('nav-notifications').addEventListener('click', (e) => {
        e.preventDefault();
        setActiveNav(e.currentTarget);
        showPageView('notifications');
    });

    // Updates button - show updates page
    document.getElementById('nav-updates').addEventListener('click', (e) => {
        e.preventDefault();
        setActiveNav(e.currentTarget);
        showPageView('updates');
    });

    // Settings button - show settings page
    document.getElementById('nav-settings').addEventListener('click', (e) => {
        e.preventDefault();
        setActiveNav(e.currentTarget);
        showPageView('settings');
    });

    // Function to show different page views
    function showPageView(page) {
        const mainContent = document.querySelector('.main-content');

        const pageConfig = {
            messages: {
                title: 'Messages',
                icon: '💬',
                content: `
                    <div class="page-empty">
                        <div class="empty-icon">💬</div>
                        <h2>Your messages</h2>
                        <p>Share ideas, get feedback, and stay connected with the people you follow.</p>
                        <div class="message-list">
                            <div class="message-item">
                                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50" alt="User">
                                <div class="message-content">
                                    <strong>Sarah Johnson</strong>
                                    <p>Love your aesthetic boards! 💕</p>
                                    <span class="message-time">2 hours ago</span>
                                </div>
                            </div>
                            <div class="message-item">
                                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50" alt="User">
                                <div class="message-content">
                                    <strong>Mike Chen</strong>
                                    <p>Check out this pin I found!</p>
                                    <span class="message-time">Yesterday</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            },
            notifications: {
                title: 'Notifications',
                icon: '🔔',
                content: `
                    <div class="page-empty">
                        <div class="empty-icon">🔔</div>
                        <h2>Notifications</h2>
                        <p>Stay updated on activity from your pins and boards.</p>
                        <div class="notification-list">
                            <div class="notification-item">
                                <div class="notif-icon" style="background: #e60023;">❤️</div>
                                <div class="notif-content">
                                    <p><strong>Emma</strong> saved your pin to <strong>Aesthetic Ideas</strong></p>
                                    <span class="notif-time">30 minutes ago</span>
                                </div>
                            </div>
                            <div class="notification-item">
                                <div class="notif-icon" style="background: #0076d3;">👤</div>
                                <div class="notif-content">
                                    <p><strong>Alex</strong> started following you</p>
                                    <span class="notif-time">1 hour ago</span>
                                </div>
                            </div>
                            <div class="notification-item">
                                <div class="notif-icon" style="background: #00a67d;">💬</div>
                                <div class="notif-content">
                                    <p><strong>Jordan</strong> commented on your pin: "Beautiful!"</p>
                                    <span class="notif-time">3 hours ago</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            },
            updates: {
                title: 'Updates',
                icon: '🕐',
                content: `
                    <div class="page-empty">
                        <div class="empty-icon">🕐</div>
                        <h2>Updates</h2>
                        <p>See what's new on Pinterest.</p>
                        <div class="updates-list">
                            <div class="update-item">
                                <div class="update-icon">✨</div>
                                <div class="update-content">
                                    <strong>New features available!</strong>
                                    <p>Try our new board organization tools</p>
                                    <span class="update-time">Today</span>
                                </div>
                            </div>
                            <div class="update-item">
                                <div class="update-icon">📌</div>
                                <div class="update-content">
                                    <strong>Your weekly inspiration</strong>
                                    <p>Based on your interests: 50 new ideas to explore</p>
                                    <span class="update-time">2 days ago</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            },
            settings: {
                title: 'Settings',
                icon: '⚙️',
                content: `
                    <div class="page-empty">
                        <div class="empty-icon">⚙️</div>
                        <h2>Settings</h2>
                        <div class="settings-list">
                            <div class="settings-item">
                                <span>👤</span>
                                <div>
                                    <strong>Edit profile</strong>
                                    <p>Change your name, photo, and more</p>
                                </div>
                            </div>
                            <div class="settings-item">
                                <span>🔒</span>
                                <div>
                                    <strong>Privacy and data</strong>
                                    <p>Manage your privacy settings</p>
                                </div>
                            </div>
                            <div class="settings-item">
                                <span>🔔</span>
                                <div>
                                    <strong>Notifications</strong>
                                    <p>Choose what you want to be notified about</p>
                                </div>
                            </div>
                            <div class="settings-item">
                                <span>🎨</span>
                                <div>
                                    <strong>Display</strong>
                                    <p>Appearance and language settings</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            }
        };

        const config = pageConfig[page];

        mainContent.innerHTML = `
            <div class="page-view">
                <div class="page-header">
                    <button class="back-btn" id="backToHome">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                        </svg>
                    </button>
                    <h1>${config.title}</h1>
                </div>
                ${config.content}
            </div>
        `;

        // Apply page view styles
        const pageView = mainContent.querySelector('.page-view');
        Object.assign(pageView.style, {
            padding: '20px',
            maxWidth: '800px',
            margin: '0 auto'
        });

        const pageHeader = mainContent.querySelector('.page-header');
        Object.assign(pageHeader.style, {
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '24px'
        });

        const backBtn = mainContent.querySelector('.back-btn');
        Object.assign(backBtn.style, {
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        });

        const pageEmpty = mainContent.querySelector('.page-empty');
        if (pageEmpty) {
            Object.assign(pageEmpty.style, {
                textAlign: 'center',
                padding: '40px 20px'
            });
        }

        const emptyIcon = mainContent.querySelector('.empty-icon');
        if (emptyIcon) {
            Object.assign(emptyIcon.style, {
                fontSize: '64px',
                marginBottom: '16px'
            });
        }

        // Style list items
        const items = mainContent.querySelectorAll('.message-item, .notification-item, .update-item, .settings-item');
        items.forEach(item => {
            Object.assign(item.style, {
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '16px',
                background: '#f5f5f5',
                borderRadius: '16px',
                marginBottom: '12px',
                cursor: 'pointer',
                textAlign: 'left'
            });
        });

        const itemImages = mainContent.querySelectorAll('.message-item img');
        itemImages.forEach(img => {
            Object.assign(img.style, {
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                objectFit: 'cover'
            });
        });

        const notifIcons = mainContent.querySelectorAll('.notif-icon, .update-icon');
        notifIcons.forEach(icon => {
            Object.assign(icon.style, {
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                background: '#f0f0f0'
            });
        });

        const times = mainContent.querySelectorAll('.message-time, .notif-time, .update-time');
        times.forEach(time => {
            Object.assign(time.style, {
                color: '#767676',
                fontSize: '12px'
            });
        });

        // Back button handler
        backBtn.onclick = () => {
            location.reload();
        };
    }

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
