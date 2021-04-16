const form = document.getElementById('searchForm');
const imageContainer = document.querySelector('.images');
const headingContainer = document.querySelector('.searching');
const inputTitle = document.querySelector('.inputTitle');


form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const userInput = form.elements.query.value;
    const response = await apiCall(userInput);
    makeImages(response.data, userInput);
    form.elements.query.value = "";
})

async function apiCall(userInput) {
    const config = { params: { q: userInput } }
    const response = await axios.get('https://api.tvmaze.com/search/shows', config);
    return response;
}

const makeImages = (shows, userInput) => {
    headingContainer.style.visibility = "visible";
    inputTitle.innerHTML = userInput;
    deleteImage();
    for(let result of shows) {
        if(result.show.image) {
            const img = document.createElement('IMG');
            img.src = result.show.image.medium;
            img.className = "showImg"
            imageContainer.append(img);
        }
    }
}

function deleteImage() {
    const deleter = document.querySelectorAll('img');
    deleter.forEach(image => {
        image.remove();
    })
}