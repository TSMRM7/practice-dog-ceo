console.log('%c HI', 'color: firebrick')
document.addEventListener('DOMContentLoaded', () => {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    const imageContainer = document.getElementById('dog-image-container');
    const breedList = document.getElementById('dog-breeds');
    const dropdown = document.getElementById('breed-dropdown');
    let allBreeds = [];
  
    fetch(imgUrl)
      .then(response => response.json())
      .then(data => {
        data.message.forEach(imageUrl => {
          const img = document.createElement('img');
          img.src = imageUrl;
          img.alt = 'Dog Image';
          imageContainer.appendChild(img);
        });
      })
      .catch(error => console.error('Error fetching images:', error));
  
    fetch(breedUrl)
      .then(response => response.json())
      .then(data => {
        allBreeds = Object.keys(data.message);
        renderBreeds(allBreeds);
      })
      .catch(error => console.error('Error fetching breeds:', error));
  
    function renderBreeds(breeds) {
      breedList.innerHTML = '';
      breeds.forEach(breed => {
        const li = document.createElement('li');
        li.textContent = breed;
        li.addEventListener('click', () => {
          li.style.color = 'blue';
        });
        breedList.appendChild(li);
      });
    }
  
    dropdown.addEventListener('change', (event) => {
      const selectedLetter = event.target.value;
      const filteredBreeds = selectedLetter === 'all' 
        ? allBreeds 
        : allBreeds.filter(breed => breed.startsWith(selectedLetter));
      renderBreeds(filteredBreeds);
    });
  });
  