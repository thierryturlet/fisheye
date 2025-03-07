/*global createHeartButton*/
/*global  createLikesStyle*/
/*global addLikeEventListener*/
/*global openModal*/
// ========================= FACTORY PATTERN =========================

// Interface Media

class MediaItem {
    constructor(mediaItem) {
        this.mediaItem = mediaItem;
    }
 
    createLikeContainer() {
        const divLikeContainer = document.createElement("div");
        divLikeContainer.classList.add("container-likes");
        
        const titleParagraph = document.createElement("p");
        titleParagraph.textContent = this.mediaItem.title;
        divLikeContainer.appendChild(titleParagraph);
        
        const likesParagraph = document.createElement("p");
        likesParagraph.textContent = this.mediaItem.likes;
        divLikeContainer.appendChild(likesParagraph);
        
        const heartLikes = createHeartButton();
        divLikeContainer.appendChild(heartLikes);
        
        const likesStyle = createLikesStyle(likesParagraph, heartLikes);
        divLikeContainer.appendChild(likesStyle);
        
        addLikeEventListener(heartLikes, this.mediaItem, likesParagraph);
        
        return divLikeContainer;
    }
  }
  
  // Classe concrète pour les images
   class ImageMediaItem extends MediaItem {
    createMediaElement(index) {
        const article = document.createElement('article');
        const img = document.createElement('img');
        img.src = `./photos/imagesetvideos/${this.mediaItem.photographerId}/${this.mediaItem.image}`;
        img.alt = this.mediaItem.title;
        img.tabIndex = 0;
  
        img.addEventListener('click', () => openModal(index));
        img.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                openModal(index);
            }
        });
  
        const divLikeContainer = this.createLikeContainer();
  
        article.appendChild(img);
        article.appendChild(divLikeContainer);
  
        return article;
    }
  }
  
  // Classe concrète pour les vidéos
 
   class VideoMediaItem extends MediaItem {
    createMediaElement(index) {
        const article = document.createElement('article');
        const video = document.createElement('video');
        video.src = `./photos/imagesetvideos/${this.mediaItem.photographerId}/${this.mediaItem.video}`;
        video.alt = this.mediaItem.title;
        video.tabIndex = 0;
        
        video.addEventListener('click', () => openModal(index));
        video.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                openModal(index);
            }
        });
  
        const divLikeContainer = this.createLikeContainer();
  
        article.appendChild(video);
        article.appendChild(divLikeContainer);
  
        return article;
    }
  }
  
  // Factory
  // eslint-disable-next-line no-unused-vars 
   class MediaFactory {
    create(mediaItem) {
        if (mediaItem.image) {
            return new ImageMediaItem(mediaItem);
        } else if (mediaItem.video) {
            return new VideoMediaItem(mediaItem);
        } else {
            return null;
        }
    }
  }
  
  // ========================= FIN FACTORY PATTERN =========================
  
  