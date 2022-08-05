function newPostSubmit(event){
    event.preventDefault();
  
    const title = document.getElementById('post-title');
    const body = document.getElementById('post-body');
  
    fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        title: title.value,
        body: body.value
      }),
      headers: {'Content-Type': 'application/json'}
    }).then(function(){
      document.location.replace('/dashboard')
  }).catch((err)=> console.log(err))
  }
  
  document.getElementById('new-post-form').addEventListener('submit', newPostSubmit);