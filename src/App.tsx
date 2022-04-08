import React, { useState } from 'react';
import GalleryGrid from './components/GalleryGrid';
import Header from './components/Header';
import Modal from './components/Modal';
import PhotoUploadForm from './components/PhotoUploadForm';

function App() {
  const [selectedPhoto, setSelectedPhoto] = useState<string>("");

  return (
    <div className="App">
      <Header />
      <PhotoUploadForm />
      <GalleryGrid setSelectedPhoto={setSelectedPhoto}/>
      {selectedPhoto && <Modal selectedPhoto={selectedPhoto} setSelectedPhoto={setSelectedPhoto}/>}
    </div>
  );
}

export default App;
