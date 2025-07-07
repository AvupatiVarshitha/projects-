import React, { useState } from 'react';
import './Gallery.css';

const folders = [
  {
    id: 'confidencebuilding',
    name: 'Confidence Building',
    cover: '/Gallery/covers/confidencebuilding.jpg',
    images: [
      { id: 1, src: '/Gallery/confidencebuilding/image1.jpg', alt: 'Leadership Workshop', caption: 'Confidence Building' },
      { id: 2, src: '/Gallery/confidencebuilding/image2.jpg', alt: 'Team Building', caption: 'Confidence Building' },
      { id: 3, src: '/Gallery/confidencebuilding/image3.jpg', alt: 'Team Building', caption: 'Confidence Building' },
      { id: 4, src: '/Gallery/confidencebuilding/image4.jpg', alt: 'Team Building', caption: 'Confidence Building' },
      { id: 5, src: '/Gallery/confidencebuilding/image5.jpg', alt: 'Team Building', caption: 'Confidence Building' },
      { id: 6, src: '/Gallery/confidencebuilding/image6.jpg', alt: 'Team Building', caption: 'Confidence Building' },
    ],
  },
  
  {
    id: 'entrepreneurship',
    name: 'Kickstart your startup journey',
    cover: '/Gallery/covers/entreprenuership.jpg',
    images: [
      { id: 5, src: '/Gallery/entrepreneurship/image1.jpg', alt: 'Bootcamp Day', caption: 'Bootcamp Kickoff' },
      { id: 6, src: '/Gallery/entrepreneurship/image2.jpg', alt: 'Pitching', caption: 'Startup Pitching' },
    ],
  },
];

function Gallery() {
  const [selectedFolderId, setSelectedFolderId] = useState(null);

  const handleFolderClick = (folderId) => {
    setSelectedFolderId(folderId === selectedFolderId ? null : folderId); // Toggle
  };

  return (
    <section className="gallery">
      <h1>Gallery</h1>
      <p>Click a folder to view photos from that category.</p>

      <div className="gallery-grid">
        {folders.map(folder => (
          <div key={folder.id} className="gallery-folder-cover" onClick={() => handleFolderClick(folder.id)}>
            <img src={folder.cover} alt={folder.name} />
            <div className="folder-caption">{folder.name}</div>
          </div>
        ))}
      </div>

      {/* Show images inside the selected folder */}
      {selectedFolderId && (
        <div className="folder-images">
          <h2>{folders.find(f => f.id === selectedFolderId).name}</h2>
          <div className="gallery-grid">
            {folders.find(f => f.id === selectedFolderId).images.map(image => (
              <div key={image.id} className="gallery-card">
                <img src={image.src} alt={image.alt} />
                <div className="caption">{image.caption}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default Gallery;