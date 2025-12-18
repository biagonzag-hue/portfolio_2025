// Inspection 
document.addEventListener('DOMContentLoaded', () => {
    const inspectionBtn = document.getElementById('toggle-inspection');

    if (inspectionBtn) {

        const isInspectedPage = window.location.pathname.includes('index-inspecionado.html');

        inspectionBtn.textContent = isInspectedPage ? 'Disable Inspection' : 'Enable Inspection';

        inspectionBtn.addEventListener('click', () => {
            if (isInspectedPage) {
                window.location.href = 'index.html';
            } else {
                window.location.href = 'index-inspecionado.html';
            }
        });
    } else {
        console.warn('Inspection button not found!');
    }

    function clearInspection() {
        document.querySelectorAll('.inspect-active').forEach(el => {
            el.classList.remove('inspect-active');

            el.removeAttribute('data-class-name');
            el.removeAttribute('data-width');
            el.removeAttribute('data-height');
            el.removeAttribute('data-padding');
            el.removeAttribute('data-margin');
            el.removeAttribute('data-border');
            el.removeAttribute('data-radius');
            el.removeAttribute('data-gap');
        });
    }

    function getElementName(el) {
        let name = el.tagName.toLowerCase();

        if (el.id) name += `#${el.id}`;

        if (el.classList.length) {
            name += '.' + [...el.classList].join('.');
        }

        return name;
    }

    function inspectElement(el) {

        if (['SCRIPT', 'STYLE', 'META', 'HEAD', 'HTML', 'LINK'].includes(el.tagName)) return;

        const style = getComputedStyle(el);
        const rect = el.getBoundingClientRect();

        const width = Math.round(rect.width);
        const height = Math.round(rect.height);

        const padding = `${style.paddingTop} ${style.paddingRight} ${style.paddingBottom} ${style.paddingLeft}`;
        const margin = `${style.marginTop} ${style.marginRight} ${style.marginBottom} ${style.marginLeft}`;

        const border = `${style.borderTopWidth} ${style.borderTopStyle} ${style.borderTopColor}`;

        const radius = style.borderRadius !== '0px' ? style.borderRadius : '—';

        let gap = '—';
        if (style.display === 'flex' || style.display === 'grid') {
            gap = style.gap !== 'normal' ? style.gap : '—';
        }

        const name = getElementName(el);

        el.setAttribute('data-class-name', name);
        el.setAttribute('data-width', width);
        el.setAttribute('data-height', height);
        el.setAttribute('data-padding', padding);
        el.setAttribute('data-margin', margin);
        el.setAttribute('data-border', border);
        el.setAttribute('data-radius', radius);
        el.setAttribute('data-gap', gap);

        el.classList.add('inspect-active');
    }

    document.addEventListener('mouseover', (e) => {
        clearInspection();
        inspectElement(e.target);
        e.stopPropagation();
    });

    document.addEventListener('mouseout', (e) => {
        if (e.relatedTarget === null) {
            clearInspection();
        }
    });



    // Mobile Menu
    const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuIcon) {
        mobileMenuIcon.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuIcon.classList.toggle('active');
        });
    }

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks && mobileMenuIcon) {
                navLinks.classList.remove('active');
                mobileMenuIcon.classList.remove('active');
            }
        });
    });



    // Scroll
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1
    });

    revealElements.forEach(el => revealObserver.observe(el));
});

