function newPostSubmit(event){
    event.preventDefault();
  
    const title = document.getElementById('post-title');
    const post_url = document.getElementById('post-url');
  
    fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        title: title.value,
        content: post_url.value
      }),
      headers: {'Content-Type': 'application/json'}
    }).then(function(){
      document.location.replace('/dashboard')
  }).catch((err)=> console.log(err))
  }
  
  document.getElementById('new-post-form').addEventListener('submit', newPostSubmit);