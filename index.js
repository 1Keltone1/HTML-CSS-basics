// Select all necessary elements
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.querySelector('.lightbox');
const closeBtn = document.getElementById('close-btn');
const lightboxImage = document.getElementById('lightbox-image');

galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
        openLightbox(item.src);
    });
});

closeBtn.addEventListener("click", () => {
    closeLightbox();
});

lightbox.addEventListener("click", () => {
    closeLightbox();
});

function openLightbox(source) {
    lightbox.style.display = "flex";
    lightbox.style["align-items"] = "center";
    lightboxImage.src = source.replace("-thumbnail", "");
};

function closeLightbox() {
    lightbox.style.display = "none";
};