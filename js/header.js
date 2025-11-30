// header.js - With Theme Persistence
console.log("🔧 header.js loading...");

document.addEventListener('DOMContentLoaded', function() {
    console.log("✅ DOM loaded");
    
    // Load saved theme immediately
    loadSavedTheme();
    
    fetch('./header.html')
        .then(response => {
            if (!response.ok) throw new Error('Header file not found');
            return response.text();
        })
        .then(data => {
            const placeholder = document.getElementById('header-placeholder');
            if (placeholder) {
                placeholder.innerHTML = data;
                console.log("✅ Header loaded");
                initializeHeader();
            }
        })
        .catch(error => {
            console.error('❌ Header error:', error);
            createSimpleHeader();
        });
});

// ✅ THEME PERSISTENCE FUNCTIONS
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light-mode') {
        document.body.classList.add('light-mode');
        console.log("🌞 Light theme loaded from storage");
    } else {
        document.body.classList.remove('light-mode');
        console.log("🌙 Dark theme loaded from storage");
    }
}

function saveTheme() {
    const isLight = document.body.classList.contains('light-mode');
    localStorage.setItem('theme', isLight ? 'light-mode' : 'dark-mode');
    console.log("💾 Theme saved:", isLight ? "light" : "dark");
}

function initializeHeader() {
    // Wait for Lucide to load
    setTimeout(() => {
        if (window.lucide) {
            lucide.createIcons();
        }
        setupThemeToggle();
    }, 100);
}

function setupThemeToggle() {
    const toggleBtn = document.getElementById('headerThemeToggle');
    if (!toggleBtn) {
        console.log("❌ Toggle button not found");
        return;
    }

    // Set initial icon based on saved theme
    updateToggleIcon();
    
    toggleBtn.addEventListener('click', function() {
        console.log("🌓 Toggle clicked");
        document.body.classList.toggle('light-mode');
        
        // ✅ SAVE THEME TO LOCALSTORAGE
        saveTheme();
        updateToggleIcon();
        
        // Add animation
        toggleBtn.style.transform = 'rotate(180deg)';
        setTimeout(() => {
            toggleBtn.style.transform = 'rotate(0deg)';
        }, 300);
    });
    
    function updateToggleIcon() {
        const isLight = document.body.classList.contains('light-mode');
        toggleBtn.innerHTML = `<i data-lucide="${isLight ? 'moon' : 'sun'}"></i>`;
        if (window.lucide) {
            lucide.createIcons();
        }
        console.log("🎨 Theme updated:", isLight ? "light" : "dark");
    }
}

function createSimpleHeader() {
    const placeholder = document.getElementById('header-placeholder');
    if (placeholder) {
        placeholder.innerHTML = `
            <header style="background: #0b0b0b; padding: 15px 40px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid gold;">
                <div style="color: gold; font-size: 24px; font-weight: bold;">Maru Dry Fruits</div>
                <button style="background: gold; border: none; padding: 8px; border-radius: 50%;">☀️</button>
            </header>
        `;
    }
}