const postsUrl = 'https://jsonplaceholder.typicode.com/posts';
		const photosUrl = 'https://jsonplaceholder.typicode.com/photos';

		Promise.all([fetch(postsUrl), fetch(photosUrl)])
		  .then(([postsResponse, photosResponse]) => Promise.all([postsResponse.json(), photosResponse.json()]))
		  .then(([postsData, photosData]) => {
		    const photosMap = new Map(photosData.map(photo => [photo.id, photo]));

		    function renderPosts(posts) {
			    document.querySelector(".blog__ul").innerHTML = "";
			    const postImagesAndTitles = posts.slice(0,4).map(post => {
			      const photoData = photosMap.get(post.id);
			      const markUp  = `
			      <li class="blog__li">
			      <img src=${photoData?.thumbnailUrl}>
                  <div>
                  <h5>business</h5>
			      <h3 class="sasa">${post.title}</h3>
			      <p>${post.body}</p>
                  </div>
			      </li>`;
			      document.querySelector(".blog__ul").insertAdjacentHTML('beforeend', markUp);
			    });

			    console.log(postImagesAndTitles);
			}

			renderPosts(postsData);

			document.getElementById("search-btn").addEventListener("click", () => {
				const postId = document.getElementById("post-id").value;
			  	if (postId) {
			  		const post = postsData.find(post => post.id == postId);
			  		if (post) {
			  			renderPosts([post]);
			  		} else {
			  			alert(`Post with ID ${postId} not found.`);
			  		}
			  	} else {
			  		renderPosts(postsData);
			  	}
			});

		  })
		  .catch(error => console.error(error));