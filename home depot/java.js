// title scroll code

window.addEventListener("scroll", () => {
    const currentScrollTop = window.scrollY || document.documentElement.scrollTop;
    const headerElement = document.querySelector('.title');
    const sidebarContainer = document.querySelector('.sidebar-container');

    // Adjust scroll threshold based on screen size
    const threshold = window.innerWidth <= 768 ? 30 : 50;
    const marginTopVisible = window.innerWidth <= 480 ? "120px" : (window.innerWidth <= 768 ? "140px" : "180px");
    const marginTopHidden = "20px";

    if (currentScrollTop > threshold) {
        headerElement.classList.add('slide-up');
        if (sidebarContainer) {
            sidebarContainer.style.marginTop = marginTopHidden;
            sidebarContainer.classList.add('title-hidden');
        }
    } else {
        headerElement.classList.remove('slide-up');
        if (sidebarContainer) {
            sidebarContainer.style.marginTop = marginTopVisible;
            sidebarContainer.classList.remove('title-hidden');
        }
    }

    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
}, { passive: true });

// Adjust margins on window resize
window.addEventListener('resize', () => {
    const sidebarContainer = document.querySelector('.sidebar-container');
    const headerElement = document.querySelector('.title');
    const currentScrollTop = window.scrollY || document.documentElement.scrollTop;
    const threshold = window.innerWidth <= 768 ? 30 : 50;

    if (sidebarContainer && !headerElement.classList.contains('slide-up') && currentScrollTop <= threshold) {
        const marginTopVisible = window.innerWidth <= 480 ? "120px" : (window.innerWidth <= 768 ? "140px" : "180px");
        sidebarContainer.style.marginTop = marginTopVisible;
    }
});

// carousel code

let index = 0;

function moveSlide(step) {
  const track = document.querySelector('.carousel-track');
  const slides = document.querySelectorAll('.carousel-track img');
  const totalSlides = slides.length;

  // Update index and handle loop-around
  index = (index + step + totalSlides) % totalSlides;

  // Move the track by 100% of the container width per index
  track.style.transform = `translateX(-${index * 100}%)`;
}

// Touch support for carousel on mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.querySelector('.carousel');
  
  if (carousel) {
    carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }
});

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;
  
  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      // Swipe left - next slide
      moveSlide(1);
    } else {
      // Swipe right - previous slide
      moveSlide(-1);
    }
  }
}

// color changing code

// Array to track recently used colors (max 4)
let recentColors = [];

// Homer AI Helper functionality
document.addEventListener('DOMContentLoaded', function() {
  const homerCircle = document.getElementById('homer-circle');
  const homerPopup = document.getElementById('homer-popup');
  const homerClose = document.getElementById('homer-close');
  const helpBtn = document.getElementById('help-btn');
  const infoBtn = document.getElementById('info-btn');
  const info2Btn = document.getElementById('info2-btn');
  const homerMessage = document.getElementById('homer-message');
  
  // Randomized responses for "help with room" button
  const helpResponses = [
    "Considering your dark color scheme, I would go with <i>Black Magic</i> or <i>Purple Basil!</i>",
    "With the amount of greens in your room, I would use a lighter color on the eyes that can contrast, like <i>Pony Tail.</i>",
    "Your room has lots of tans! If you prefer warmer colors, go with <i>Warm Mahogany,</i> if you like cooler tones, go with <i>Cavalry!</i>",
    "You're going for a very light color over <i>Night Watch,</i> I would use some white coats before moving onto <i>Chalky Blue</i>!",
    "I love the cozy vibe going on! If you want the walls to be easier on the eyes, <i>Sarsaparilla</i> would really fit!"
  ];
  
  // Info response
  const infoResponse = "This is the Home Depot Paint Visualizer tool! It helps you explore different paint colors from the PPG-Glidden catalogue and see how they would look in various room settings. Simply click on any color swatch on the left to preview it on the room images. You can browse through different room examples using the arrow buttons, and keep track of your favorite colors in the 'Recently Used' section. This tool makes it easy to experiment with different color combinations before making your final decision!";

  // Info2 response
  const info2Response = "This was made for the 10.4 case challenge for 3DE. We were tasked to answer the question: How should The Home Depot create an innovative shopping experience that highlights one of their departments? <br><br> In theory, you would be able to <b>upload</b> a custom scan of your room, and you would be able to receive feedback on design choices, help on what would look best, and practical guides on how to do future project for your spaces! This works alongside our <i>furniture DIY demo,</i> which would recommend certain blueprints and instructions for DIY's, and how to further improve your interior design!";
  
  // Toggle popup when clicking Homer
  homerCircle.addEventListener('click', function() {
    homerPopup.classList.toggle('active');
  });
  
  // Close popup
  homerClose.addEventListener('click', function() {
    homerPopup.classList.remove('active');
  });
  
  // Help button - randomized response
  helpBtn.addEventListener('click', function(e) {
    e.stopPropagation(); // Prevent event from bubbling
    const randomResponse = helpResponses[Math.floor(Math.random() * helpResponses.length)];
    homerMessage.innerHTML = `<p>${randomResponse}</p><button class="homer-btn" id="back-btn">Back</button>`;
    
    // Add back button functionality
    document.getElementById('back-btn').addEventListener('click', function(e) {
      e.stopPropagation();
      resetHomerMessage();
    });
  });
  
  // Info button
  infoBtn.addEventListener('click', function(e) {
    e.stopPropagation(); // Prevent event from bubbling
    homerMessage.innerHTML = `<p>${infoResponse}</p><button class="homer-btn" id="back-btn">Back</button>`;
    
    // Add back button functionality
    document.getElementById('back-btn').addEventListener('click', function(e) {
      e.stopPropagation();
      resetHomerMessage();
    });
  });

  // Info2 button
  info2Btn.addEventListener('click', function(e) {
    e.stopPropagation(); // Prevent event from bubbling
    homerMessage.innerHTML = `<p>${info2Response}</p><button class="homer-btn" id="back-btn">Back</button>`;
    
    // Add back button functionality
    document.getElementById('back-btn').addEventListener('click', function(e) {
      e.stopPropagation();
      resetHomerMessage();
    });
  });
  
  // Reset to initial message
  function resetHomerMessage() {
    homerMessage.innerHTML = `
      <p>Hey, my name is Homer, did you need help with anything?</p>
      <div class="homer-buttons">
        <button class="homer-btn" id="help-btn">I need help seeing what would work best for my room</button>
        <button class="homer-btn" id="info-btn">What is this?</button>
        <button class="homer-btn" id="info2-btn">What's this for?</button>
      </div>
    `;
    
    // Re-attach event listeners
    document.getElementById('help-btn').addEventListener('click', function(e) {
      e.stopPropagation();
      const randomResponse = helpResponses[Math.floor(Math.random() * helpResponses.length)];
      homerMessage.innerHTML = `<p>${randomResponse}</p><button class="homer-btn" id="back-btn">Back</button>`;
      document.getElementById('back-btn').addEventListener('click', function(e) {
        e.stopPropagation();
        resetHomerMessage();
      });
    });
    
    document.getElementById('info-btn').addEventListener('click', function(e) {
      e.stopPropagation();
      homerMessage.innerHTML = `<p>${infoResponse}</p><button class="homer-btn" id="back-btn">Back</button>`;
      document.getElementById('back-btn').addEventListener('click', function(e) {
        e.stopPropagation();
        resetHomerMessage();
      });
    });

    document.getElementById('info2-btn').addEventListener('click', function(e) {
      e.stopPropagation();
      homerMessage.innerHTML = `<p>${info2Response}</p><button class="homer-btn" id="back-btn">Back</button>`;
      document.getElementById('back-btn').addEventListener('click', function(e) {
        e.stopPropagation();
        resetHomerMessage();
      });
    });
  }
  
  // Close popup when clicking outside
  document.addEventListener('click', function(event) {
    if (!homerPopup.contains(event.target) && !homerCircle.contains(event.target)) {
      homerPopup.classList.remove('active');
    }
  });
  
  // Color swatch functionality
  const swatches = document.querySelectorAll('.swatch');
  const colorPreview = document.getElementById('color-preview');
  const currentColorName = document.getElementById('current-color-name');
  
  swatches.forEach(swatch => {
    swatch.addEventListener('click', function() {
      const color = this.style.backgroundColor;
      const colorName = this.getAttribute('data-name');
      
      // Update the color preview div
      colorPreview.style.backgroundColor = color;
      
      // Update current color name
      currentColorName.textContent = colorName;
      currentColorName.style.color = color;
      
      // Add to recent colors
      addToRecentColors(color, colorName);
    });
  });
});

function addToRecentColors(color, colorName) {
  const recentColorsContainer = document.getElementById('recent-colors');
  
  // Check if color already exists in recent colors
  const existingIndex = recentColors.findIndex(c => c.color === color);
  
  if (existingIndex !== -1) {
    // Remove existing entry
    recentColors.splice(existingIndex, 1);
  }
  
  // Add to beginning of array
  recentColors.unshift({ color: color, name: colorName });
  
  // Keep only last 4 colors
  if (recentColors.length > 4) {
    recentColors.pop();
  }
  
  // Update the display
  updateRecentColorsDisplay();
}

function updateRecentColorsDisplay() {
  const recentColorsContainer = document.getElementById('recent-colors');
  recentColorsContainer.innerHTML = '';
  
  recentColors.forEach(colorData => {
    const swatchDiv = document.createElement('div');
    swatchDiv.className = 'recent-color-swatch';
    swatchDiv.style.backgroundColor = colorData.color;
    swatchDiv.title = colorData.name;
    
    // Add click handler to reuse recent colors
    swatchDiv.addEventListener('click', function() {
      document.getElementById('color-preview').style.backgroundColor = colorData.color;
      document.getElementById('current-color-name').textContent = colorData.name;
      document.getElementById('current-color-name').style.color = colorData.color;
    });
    
    recentColorsContainer.appendChild(swatchDiv);
  });
}
