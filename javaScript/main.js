const pageLeft = document.querySelector(".book-page.page-left");
const coverRight = document.querySelector(".cover.cover-right");
const coverLeft = document.querySelector(".cover.cover-left");

// Add loaded class to wrapper after page loads to enable transitions
window.addEventListener('load', () => {
    document.querySelector('.wrapper').classList.add('loaded');

    // Flip the left cover on load
    setTimeout(() => {
        if (coverLeft && !coverLeft.classList.contains('turn')) {
            coverLeft.classList.add('turn');
            setTimeout(() => {
                coverLeft.style.zIndex = 100;
            }, 500);
        }
    }, 2100);

    // Delay the first page flip so its back side only shows after load
    setTimeout(() => {
        if (pageLeft && !pageLeft.classList.contains('turn')) {
            pageLeft.classList.add('turn');
            setTimeout(() => {
                pageLeft.style.zIndex = 20;
            }, 500);
        }
    }, 2100);
});

const pageTurnBtn = document.querySelectorAll(".nextprev-btn");

pageTurnBtn.forEach((el, index) => {
    el.onclick = () => {
        const pageTurnId = el.getAttribute("data-page");
        const pageTurn = document.getElementById(pageTurnId);

        if (pageTurn.classList.contains("turn")) {
            pageTurn.classList.remove("turn");
            setTimeout(() => {
                pageTurn.style.zIndex = 20 - index;
            }, 500);
        } else {
            pageTurn.classList.add("turn");
            setTimeout(() => {
                pageTurn.style.zIndex = 20 + index;
            }, 500);
        }
    };
});

// Add click event for left cover
coverLeft.onclick = () => {
    if (coverLeft.classList.contains("turn")) {
        coverLeft.classList.remove("turn");
        setTimeout(() => {
            coverLeft.style.zIndex = -1;
        }, 500);
    } else {
        coverLeft.classList.add("turn");
        setTimeout(() => {
            coverLeft.style.zIndex = 100;
        }, 500);
    }
};

// Add click event for "Open Portfolio" button
const openPortfolioBtn = document.querySelector(".btn.open-portfolio");

if (openPortfolioBtn) {
    openPortfolioBtn.onclick = (e) => {
        e.stopPropagation(); // Prevent triggering the cover click

        // Flip the left cover back to show the front
        if (coverLeft.classList.contains("turn")) {
            coverLeft.classList.remove("turn");
            setTimeout(() => {
                coverLeft.style.zIndex = -1;
            }, 500);
        }

        // Then flip the first page to show About Me
        setTimeout(() => {
            if (!pageLeft.classList.contains('turn')) {
                pageLeft.classList.add('turn');
                setTimeout(() => {
                    pageLeft.style.zIndex = 20;
                }, 500);
            }
        }, 600);
    };
}

const pages = document.querySelectorAll(".book-page.page-right");

// Add click event for "Close Portfolio" button
const closePortfolioBtn = document.querySelector(".btn.close-portfolio");

if (closePortfolioBtn) {
    closePortfolioBtn.onclick = (e) => {
        e.stopPropagation(); // Prevent triggering the cover click

        // Close all pages in reverse order
        pages.forEach((page, index) => {
            if (page.classList.contains("turn")) {
                setTimeout(() => {
                    page.classList.remove("turn");
                    setTimeout(() => {
                        page.style.zIndex = 20 - index;
                    }, 500);
                }, index * 200);
            }
        });

        // Close the first page (page-left)
        setTimeout(() => {
            if (pageLeft.classList.contains('turn')) {
                pageLeft.classList.remove('turn');
                setTimeout(() => {
                    pageLeft.style.zIndex = 20;
                }, 500);
            }
        }, pages.length * 200);

        // Close the right cover
        setTimeout(() => {
            if (coverRight.classList.contains("turn")) {
                coverRight.classList.remove("turn");
                setTimeout(() => {
                    coverRight.style.zIndex = 0;
                }, 500);
            }
        }, (pages.length + 1) * 200);

        // Keep the left cover open to show welcome message
        // The left cover should already be flipped open from the initial animation
    };
}

const contactMeBtn = document.querySelector(".btn.contact-me");

contactMeBtn.onclick = () => {
    pages.forEach((page, index) => {
        setTimeout(() => {
            page.classList.add("turn");

            setTimeout(() => {
                page.style.zIndex = 20 + index;
            }, 500);
        }, (index + 1) * 200 + 100);
    });
};

let totalPages = pages.length;
let pageNumber = 0;

const backProfileButton = document.querySelector(".back-profile");

backProfileButton.onclick = () => {
    pages.forEach((_, index) => {
        setTimeout(() => {
            reverseIndex();
            pages[pageNumber].classList.remove("turn");

            setTimeout(() => {
                reverseIndex();
                pages[pageNumber].style.zIndex = 10 + index;
            }, 500);
        }, (index + 1) * 200 + 100);
    });
};

function reverseIndex() {
    pageNumber--;
    if (pageNumber < 0) {
        pageNumber = totalPages - 1;
    }
}

// Set initial z-index for page-left
pageLeft.style.zIndex = 20;

setTimeout(() => {
    coverRight.classList.add("turn");
}, 2100);

setTimeout(() => {
    coverRight.style.zIndex = -1;
}, 2800);

pages.forEach((_, index) => {
    setTimeout(() => {
        reverseIndex();
        pages[pageNumber].classList.remove("turn");

        setTimeout(() => {
            reverseIndex();
            pages[pageNumber].style.zIndex = 10 + index;
        }, 500);
    }, (index + 1) * 200 + 2100);
});
