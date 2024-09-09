document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('signup-form');
  const messageDiv = document.getElementById('message');

  form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const email = document.getElementById('email').value;
      
      try {
          const response = await fetch('/signup', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email }),
          });

          const data = await response.json();

          if (response.ok) {
              messageDiv.textContent = data.message;
              messageDiv.style.color = 'green';
              form.reset();
          } else {
              throw new Error(data.error || 'Signup failed');
          }
      } catch (error) {
          messageDiv.textContent = error.message;
          messageDiv.style.color = 'red';
      }
  });
});
