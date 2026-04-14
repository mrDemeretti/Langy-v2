/* ============================================
   SCREEN: SHOP
   ============================================ */

function renderShop(container) {
    const { shop, currencies } = LangyState;
    const activeTab = window._shopTab || 'all';

    const filteredItems = activeTab === 'premium'
        ? shop.items.filter(i => i.premium)
        : activeTab === 'owned'
        ? shop.items.filter(i => shop.owned.includes(i.id))
        : shop.items;

    container.innerHTML = `
        <div class="screen screen--no-pad">
            <div class="nav-header">
                <div class="nav-header__back" id="shop-back">←</div>
                <div class="nav-header__title">Shop</div>
                <div style="display:flex; gap:var(--sp-2);">
                    <div class="coin" style="font-size:var(--fs-xs);">
                        <div class="coin__icon coin__icon--gold" style="width:16px;height:16px;font-size:8px;">L</div>
                        <span>${currencies.langy}</span>
                    </div>
                </div>
            </div>

            <div style="padding: 0 var(--sp-6) var(--sp-3);">
                <div class="tabs">
                    <button class="tabs__tab ${activeTab === 'all' ? 'tabs__tab--active' : ''}" data-tab="all">All</button>
                    <button class="tabs__tab ${activeTab === 'premium' ? 'tabs__tab--active' : ''}" data-tab="premium">Premium ✨</button>
                    <button class="tabs__tab ${activeTab === 'owned' ? 'tabs__tab--active' : ''}" data-tab="owned">Owned</button>
                </div>
            </div>

            <div class="shop__grid" id="shop-grid">
                ${filteredItems.map(item => {
                    const owned = shop.owned.includes(item.id);
                    return `
                        <div class="shop-item ${item.premium ? 'shop-item--premium' : ''}" data-id="${item.id}">
                            <div class="shop-item__preview">${item.emoji}</div>
                            <div class="shop-item__name">${item.name}</div>
                            ${owned
                                ? '<div class="badge badge--accent">Owned</div>'
                                : `<div class="shop-item__price">
                                    <span>${item.currency === 'langy' ? '🪙' : '🔮'}</span>
                                    <span>${item.price}</span>
                                </div>`
                            }
                        </div>
                    `;
                }).join('')}
            </div>

            ${!filteredItems.length ? `
                <div class="empty-state">
                    <div class="empty-state__icon">🛒</div>
                    <div class="empty-state__title">Nothing here yet</div>
                </div>
            ` : ''}
        </div>
    `;

    // Tab switching
    container.querySelectorAll('.tabs__tab').forEach(tab => {
        tab.addEventListener('click', () => {
            window._shopTab = tab.dataset.tab;
            renderShop(container);
        });
    });

    // Buy item
    container.querySelectorAll('.shop-item').forEach(item => {
        item.addEventListener('click', () => {
            const id = parseInt(item.dataset.id);
            const shopItem = shop.items.find(i => i.id === id);
            if (!shopItem) return;

            if (shop.owned.includes(id)) {
                Anim.showToast('You already own this item! 😊');
                return;
            }

            showBuyDialog(shopItem);
        });
    });

    container.querySelector('#shop-back')?.addEventListener('click', () => Router.navigate('home'));

    setTimeout(() => Anim.staggerChildren(container, '.shop-item'), 60);
}

function showBuyDialog(item) {
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.innerHTML = `
        <div class="overlay__sheet" style="text-align:center;">
            <div class="overlay__handle"></div>
            <div style="font-size:64px; margin:var(--sp-4) 0;">${item.emoji}</div>
            <h3>${item.name}</h3>
            <p class="text-secondary text-sm" style="margin:var(--sp-2) 0;">Category: ${item.category}</p>
            <div style="font-size:var(--fs-xl); font-weight:var(--fw-black); margin:var(--sp-4) 0; display:flex; align-items:center; justify-content:center; gap:var(--sp-2);">
                <span>${item.currency === 'langy' ? '🪙' : '🔮'}</span>
                <span>${item.price} ${item.currency === 'langy' ? 'Langy' : 'Dangy'}</span>
            </div>
            <div style="display:flex; gap:var(--sp-3);">
                <button class="btn btn--ghost btn--full" id="buy-cancel">Cancel</button>
                <button class="btn btn--primary btn--full" id="buy-confirm">Buy Now</button>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
    overlay.querySelector('#buy-cancel')?.addEventListener('click', () => overlay.remove());
    overlay.querySelector('#buy-confirm')?.addEventListener('click', () => {
        const curr = item.currency === 'langy' ? 'langy' : 'dangy';
        if (LangyState.currencies[curr] >= item.price) {
            LangyState.currencies[curr] -= item.price;
            LangyState.shop.owned.push(item.id);
            LangyState.inventory.items.push({ id: item.id, name: item.name, emoji: item.emoji, slot: item.category, equipped: false });
            if (typeof LangyDB !== 'undefined') LangyDB.saveProgress().catch(() => {});
            overlay.remove();
            Anim.showToast(`${item.name} purchased! 🎉`);
            renderShop(document.getElementById('screen-container'));
        } else {
            Anim.showToast('Not enough currency! 😢');
        }
    });
}

Router.register('shop', renderShop);
