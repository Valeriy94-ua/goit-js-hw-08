import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

const galleryList = document.querySelector('.gallery');

const makeGalleryList = ({ original, preview, description }) => {
  return `<li class="gallery__item">
            <a class="gallery__link" href="${original}">
            <img
                class="gallery__image"
                src="${preview}"
                alt="${description}"
                title="${description}"
                />
            </a>
        </li>`;
};

const makeGalleryArr = galleryItems.map(imageInfo => {
  return makeGalleryList(imageInfo);
});

galleryList.innerHTML = makeGalleryArr.join('');

const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  overlay: true,
  overlayOpacity: 0.9,
  captionDelay: 250,
});
