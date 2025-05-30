import React from 'react';
import './Gallery.css';

const images = [
  { id: 1, src: '/gallery/image1.jpg', alt: 'image', caption: 'Leadership Workshop' },
  { id: 2, src: '/gallery/image2.jpg', alt: 'Meditation Session', caption: 'Healing through Meditation' },
  { id: 3, src: '/gallery/image3.jpg', alt: 'Startup Bootcamp', caption: 'Entrepreneurship Bootcamp' },
  // Add more later
];

function Gallery() {
  return (
    <section className="gallery">
      <h1>Gallery</h1>
      <p>Explore snapshots from our events, workshops, and community moments.</p>
      <div className="gallery-grid">
        {images.map(image => (
          <div key={image.id} className="gallery-card">
            <img src={image.src} alt={image.alt} />
            <div className="caption">{image.caption}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Gallery;
