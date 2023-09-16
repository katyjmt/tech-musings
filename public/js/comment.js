const loginFormHandler = async (event) => {
  event.preventDefault();

  const comment = document.querySelector('#comment-field');

  if (comment) {
    const response = await fetch('/api/posts/comment', {
      method: 'POST',
      body: JSON.stringify({ comment }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/'); // change here for relocation
    } else {
      alert('Failed to log in.');
    }
  }
};

document
  .querySelector('#login-form')
  .addEventListener('submit', loginFormHandler);
