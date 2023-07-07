import { galleryItems } from './gallery-items.js';

const galleryEl = document.querySelector('.gallery');
const galleryMarkup = createGalleryMarkup(galleryItems);

function createGalleryMarkup(galleryItems) {
    return galleryItems.map(({preview, original, description}) => {
        return `
        <li class="gallery__item">
            <a class="gallery__link" href="${original}">
                <img
                    class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    alt="Image description"
        />
    </a>
</li>`
    })
    .join('');
}

galleryEl.insertAdjacentHTML('beforeend', galleryMarkup);

galleryEl.addEventListener('click', onImgClick);


function onImgClick(event) {
    event.preventDefault();
    if (event.target.tagName !== 'IMG') {
        return;
    }

    window.addEventListener('keyup', onEscKeyPress);

    const currentImg = basicLightbox.create(`
    <img src="${event.target.dataset.source}" width="800" height="600">
`)
    currentImg.show()

    function onEscKeyPress(event) {
        if (event.code === 'Escape') {
            currentImg.close();
            window.removeEventListener('keyup', onEscKeyPress);
    }
    }
}