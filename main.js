const postsUrl = "https://jsonplaceholder.typicode.com/posts";
const photosUrl = "https://jsonplaceholder.typicode.com/photos";

Promise.all([fetch(postsUrl), fetch(photosUrl)])
  .then(([postsResponse, photosResponse]) => Promise.all([postsResponse.json(), photosResponse.json()]))
  .then(([postsData, photosData]) => {
    const photosMap = new Map(photosData.map(photo => [photo.id, photo]));

    const postImagesAndTitles = postsData.slice(17, 20).map(post => {
      const photoData = photosMap.get(post.id);

      const markUp = `
        <li class="blog__li">
          <img src=${photoData?.thumbnailUrl}>
          <h5>By <span>John Doe</span>  l   Aug 23, 2021 </h5>              
          <h3>${post.title}</h3>
          <p>${post.body}</p>
        </li>`;
      
      document.querySelector(".blog__ul").insertAdjacentHTML('beforeend', markUp);
    });

    console.log(postImagesAndTitles);
  })
.catch(error => console.error(error));

