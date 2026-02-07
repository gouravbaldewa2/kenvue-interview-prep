// ==================== DAY TILE ACCORDION ====================
document.querySelectorAll('.day-tile-header').forEach(header => {
    header.addEventListener('click', () => {
        const tile = header.parentElement;
        const wasActive = tile.classList.contains('active');

        // Close all tiles
        document.querySelectorAll('.day-tile').forEach(t => t.classList.remove('active'));

        // Open clicked tile (if it wasn't already open)
        if (!wasActive) {
            tile.classList.add('active');
            // Smooth scroll to tile
            setTimeout(() => {
                tile.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    });
});

// ==================== Q&A FILTER ====================
document.querySelectorAll('.qa-filter').forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        document.querySelectorAll('.qa-filter').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        document.querySelectorAll('.qa-item').forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    });
});

// ==================== CHECKLIST PROGRESS ====================
function updateProgress() {
    const checks = document.querySelectorAll('.checklist-grid input[type="checkbox"]');
    const total = checks.length;
    const checked = Array.from(checks).filter(c => c.checked).length;
    const pct = Math.round((checked / total) * 100);

    document.getElementById('progressFill').style.width = pct + '%';
    document.getElementById('progressText').textContent = checked + ' / ' + total;

    // Save to localStorage
    const state = Array.from(checks).map(c => c.checked);
    localStorage.setItem('kenvue-prep-checklist', JSON.stringify(state));
}

// Restore checklist from localStorage
function restoreChecklist() {
    const saved = localStorage.getItem('kenvue-prep-checklist');
    if (saved) {
        const state = JSON.parse(saved);
        const checks = document.querySelectorAll('.checklist-grid input[type="checkbox"]');
        checks.forEach((c, i) => {
            if (state[i] !== undefined) c.checked = state[i];
        });
        updateProgress();
    }
}

// ==================== SCROLL REVEAL ====================
function revealSections() {
    const sections = document.querySelectorAll('.section');
    const windowHeight = window.innerHeight;

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < windowHeight - 80) {
            section.classList.add('visible');
        }
    });
}

// ==================== SMOOTH NAV SCROLL ====================
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        // Close mobile menu if open
        document.querySelector('.nav-links').classList.remove('open');
    });
});

// ==================== KEYBOARD NAVIGATION ====================
document.addEventListener('keydown', (e) => {
    // Escape closes all open day tiles and Q&A items
    if (e.key === 'Escape') {
        document.querySelectorAll('.day-tile').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.qa-item').forEach(q => q.classList.remove('open'));
    }
});

// ==================== INIT ====================
document.addEventListener('DOMContentLoaded', () => {
    restoreChecklist();
    revealSections();

    // Make hero section visible immediately
    document.querySelector('.hero')?.classList.add('visible');
});

window.addEventListener('scroll', revealSections);
window.addEventListener('resize', revealSections);
