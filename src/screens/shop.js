/* ============================================
   SCREEN: SHOP
   ============================================ */

function renderShop(container) {
    const { shop, currencies } = LangyState;
    const activeTab = window._shopTab || 'all';
    const freezeCount = LangyState.streakData.streakFreezes || 0;

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

            <!-- Streak Freeze Banner -->
            <div style="padding:0 var(--sp-6) var(--sp-3);">
                <div style="display:flex; align-items:center; gap:var(--sp-3); padding:var(--sp-3) var(--sp-4); background:linear-gradient(135deg, rgba(59,130,246,0.08), rgba(99,102,241,0.08)); border-radius:var(--radius-lg); border:1px solid rgba(59,130,246,0.15);">
                    <div style="width:40px; height:40px; border-radius:50%; background:linear-gradient(135deg, #3B82F6, #6366F1); display:flex; align-items:center; justify-content:center; color:white; flex-shrink:0;">${LangyIcons.shield}</div>
                    <div style="flex:1;">
                        <div style="font-weight:var(--fw-bold); font-size:var(--fs-sm);">Streak Freezes</div>
                        <div style="font-size:var(--fs-xs); color:var(--text-secondary);">Protects your streak for 1 missed day</div>
                    </div>
                    <div style="font-weight:var(--fw-black); font-size:var(--fs-xl); color:#3B82F6;">${freezeCount}<span style="font-size:var(--fs-xs); font-weight:var(--fw-medium); color:var(--text-tertiary);">/${LangyState.streakData.maxFreezes || 3}</span></div>
                </div>
            </div>

            <div style="padding: 0 var(--sp-6) var(--sp-3);">
                <div class="tabs">
                    <button class="tabs__tab ${activeTab === 'all' ? 'tabs__tab--active' : ''}" data-tab="all">All</button>
                    <button class="tabs__tab ${activeTab === 'premium' ? 'tabs__tab--active' : ''}" data-tab="premium">Premium ${LangyIcons.sparkles}</button>
                    <button class="tabs__tab ${activeTab === 'owned' ? 'tabs__tab--active' : ''}" data-tab="owned">Owned</button>
                </div>
            </div>

            <div class="shop__grid" id="shop-grid">
                ${filteredItems.map(item => {
                    const owned = shop.owned.includes(item.id);
                    const isFreeze = item.category === 'consumable';
                    return `
                        <div class="shop-item ${item.premium ? 'shop-item--premium' : ''} ${isFreeze ? 'shop-item--freeze' : ''}" data-id="${item.id}">
                            <div class="shop-item__preview" style="color:${isFreeze ? '#3B82F6' : item.premium ? '#F59E0B' : 'var(--primary)'}">${item.emoji}</div>
                            <div class="shop-item__name">${item.name}</div>
                            ${isFreeze
                                ? `<div class="shop-item__price" style="color:#3B82F6;">
                                    <span>${LangyIcons.diamond}</span>
                                    <span>${item.price} Dangy</span>
                                </div>`
                                : owned
                                ? '<div class="badge badge--accent">Owned</div>'
                                : `<div class="shop-item__price">
                                    <span>${item.currency === 'langy' ? LangyIcons.coins : LangyIcons.diamond}</span>
                                    <span>${item.price}</span>
                                </div>`
                            }
                        </div>
                    `;
                }).join('')}
            </div>

            ${!filteredItems.length ? `
                <div class="empty-state">
                    <div class="empty-state__icon">${LangyIcons.shoppingCart}</div>
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

            // Consumable (Streak Freeze) — can buy multiple
            if (shopItem.category === 'consumable') {
                showBuyFreezeDialog(shopItem);
                return;
            }

            if (shop.owned.includes(id)) {
                Anim.showToast(`You already own this item! ${LangyIcons.check}`);
                return;
            }

            showBuyDialog(shopItem);
        });
    });

    container.querySelector('#shop-back')?.addEventListener('click', () => Router.navigate('home'));

    setTimeout(() => Anim.staggerChildren(container, '.shop-item'), 60);
}

function showBuyFreezeDialog(item) {
    const freezeCount = LangyState.streakData.streakFreezes || 0;
    const maxFreezes = LangyState.streakData.maxFreezes || 3;
    const canBuy = freezeCount < maxFreezes;

    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.innerHTML = `
        <div class="overlay__sheet" style="text-align:center;">
            <div class="overlay__handle"></div>
            <div style="width:80px; height:80px; border-radius:50%; background:linear-gradient(135deg, #3B82F6, #6366F1); display:flex; align-items:center; justify-content:center; color:white; margin:var(--sp-4) auto; font-size:32px;">${LangyIcons.shield}</div>
            <h3>${item.name}</h3>
            <p class="text-secondary text-sm" style="margin:var(--sp-2) 0;">${item.desc || 'Protects your streak for 1 missed day'}</p>
            <div style="display:flex; justify-content:center; gap:var(--sp-6); margin:var(--sp-4) 0;">
                <div class="stat">
                    <div class="stat__value" style="color:#3B82F6;">${freezeCount}</div>
                    <div class="stat__label">Current</div>
                </div>
                <div class="stat">
                    <div class="stat__value">${maxFreezes}</div>
                    <div class="stat__label">Max</div>
                </div>
            </div>
            <div style="font-size:var(--fs-xl); font-weight:var(--fw-black); margin:var(--sp-3) 0; display:flex; align-items:center; justify-content:center; gap:var(--sp-2);">
                <span style="color:#EC4899;">${LangyIcons.diamond}</span>
                <span>${item.price} Dangy</span>
            </div>
            <div style="display:flex; gap:var(--sp-3);">
                <button class="btn btn--ghost btn--full" id="buy-cancel">Cancel</button>
                <button class="btn btn--primary btn--full" id="buy-confirm" ${!canBuy ? 'disabled style="opacity:0.5;"' : ''}>
                    ${canBuy ? 'Buy Freeze' : 'Max Reached'}
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
    overlay.querySelector('#buy-cancel')?.addEventListener('click', () => overlay.remove());
    overlay.querySelector('#buy-confirm')?.addEventListener('click', () => {
        if (!canBuy) return;
        if (LangyState.currencies.dangy >= item.price) {
            LangyState.currencies.dangy -= item.price;
            LangyState.streakData.streakFreezes = (LangyState.streakData.streakFreezes || 0) + 1;
            if (typeof LangyDB !== 'undefined') LangyDB.saveProgress().catch(() => {});
            overlay.remove();
            if (typeof AudioUtils !== 'undefined') AudioUtils.playCorrect?.();
            Anim.showToast(`${LangyIcons.shield} Streak Freeze purchased! (${LangyState.streakData.streakFreezes}/${maxFreezes})`);
            renderShop(document.getElementById('screen-container'));
        } else {
            Anim.showToast(`Not enough Dangy! ${LangyIcons.alertCircle}`);
        }
    });
}

function showBuyDialog(item) {
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.innerHTML = `
        <div class="overlay__sheet" style="text-align:center;">
            <div class="overlay__handle"></div>
            <div style="font-size:64px; margin:var(--sp-4) 0; color:${item.premium ? '#F59E0B' : 'var(--primary)'}">${item.emoji}</div>
            <h3>${item.name}</h3>
            <p class="text-secondary text-sm" style="margin:var(--sp-2) 0;">Category: ${item.category}</p>
            <div style="font-size:var(--fs-xl); font-weight:var(--fw-black); margin:var(--sp-4) 0; display:flex; align-items:center; justify-content:center; gap:var(--sp-2);">
                <span>${item.currency === 'langy' ? LangyIcons.coins : LangyIcons.diamond}</span>
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
            Anim.showToast(`${item.name} purchased! ${LangyIcons.sparkles}`);
            renderShop(document.getElementById('screen-container'));
        } else {
            Anim.showToast(`Not enough currency! ${LangyIcons.alertCircle}`);
        }
    });
}

Router.register('shop', renderShop);

