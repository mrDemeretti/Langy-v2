/* ============================================
   SCREEN: INVENTORY
   ============================================ */

function renderInventory(container) {
    const { inventory, mascot } = LangyState;

    // Group items by slot
    const equipped = {};
    inventory.items.forEach(item => {
        if (item.equipped) equipped[item.slot] = item;
    });

    container.innerHTML = `
        <div class="screen screen--no-pad">
            <div class="nav-header">
                <div class="nav-header__back" id="inventory-back">${LangyIcons.back}</div>
                <div class="nav-header__title">Inventory</div>
                <div style="width:36px;"></div>
            </div>

            <!-- Mascot dress-up area -->
            <div class="inventory__mascot-area">
                <div class="inventory__mascot">
                    <span style="font-size:12px; color:var(--text-tertiary); text-align:center;">GLB Model<br>Placeholder</span>

                    <!-- Equipment slots around mascot -->
                    <div class="inventory__slots">
                        <div class="inventory__slot inventory__slot--hat" title="Hat" data-slot="hat">
                            <div class="equip-slot__default">${LangyIcons.user}</div>
                        </div>
                        <div class="inventory__slot inventory__slot--acc" title="Accessory" data-slot="accessory">
                            <div class="equip-slot__default">${LangyIcons.diamond}</div>
                        </div>
                        <div class="inventory__slot inventory__slot--shirt" title="Top" data-slot="shirt">
                            <div class="equip-slot__default">${LangyIcons.user}</div>
                        </div>
                        <div class="inventory__slot inventory__slot--pants" title="Bottom" data-slot="pants">
                            ${equipped.pants ? equipped.pants.emoji : LangyIcons.user}
                        </div>
                        <div class="inventory__slot inventory__slot--shoes" title="Shoes" data-slot="shoes">
                            ${equipped.shoes ? equipped.shoes.emoji : LangyIcons.user}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Owned items grid -->
            <div class="inventory__items">
                <h4 style="margin-bottom:var(--sp-3);">Your Items (${inventory.items.length})</h4>

                ${inventory.items.length ? `
                    <div class="inventory__items-grid">
                        ${inventory.items.map(item => `
                            <div class="inventory-item ${item.equipped ? 'inventory-item--equipped' : ''}" data-id="${item.id}" title="${item.name}">
                                ${item.emoji}
                            </div>
                        `).join('')}

                        <!-- Empty slots -->
                        ${Array(Math.max(0, 8 - inventory.items.length)).fill('').map(() => `
                            <div class="inventory-item" style="opacity:0.3; cursor:default; border-style:dashed;">
                                ${LangyIcons.plus}
                            </div>
                        `).join('')}
                    </div>
                ` : `
                    <div class="empty-state">
                        <div class="empty-state__icon">${LangyIcons.user}</div>
                        <div class="empty-state__title">No items yet</div>
                        <div class="empty-state__text">Visit the shop to get some items!</div>
                        <button class="btn btn--primary" id="inv-to-shop">Go to Shop</button>
                    </div>
                `}
            </div>
        </div>
    `;

    // Equip/unequip items
    container.querySelectorAll('.inventory-item[data-id]').forEach(el => {
        el.addEventListener('click', () => {
            const id = parseInt(el.dataset.id);
            const item = inventory.items.find(i => i.id === id);
            if (!item) return;

            if (item.equipped) {
                item.equipped = false;
                Anim.showToast(`${item.name} unequipped`);
            } else {
                // Unequip any item in same slot
                inventory.items.forEach(i => {
                    if (i.slot === item.slot) i.equipped = false;
                });
                item.equipped = true;
                Anim.showToast(`${item.name} equipped! ${LangyIcons.sparkles}`);
            }
            renderInventory(container);
        });
    });

    container.querySelector('#inventory-back')?.addEventListener('click', () => Router.navigate('home'));
    container.querySelector('#inv-to-shop')?.addEventListener('click', () => Router.navigate('shop'));

    setTimeout(() => Anim.staggerChildren(container, '.inventory-item'), 50);
}

Router.register('inventory', renderInventory);
