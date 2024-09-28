<script>
  import { onMount } from 'svelte';
  import { navigate } from 'svelte-routing'; // For routing (or use your preferred routing solution)

  export let content = '';
  export let user = {
    name: '',
    picture: '',
    pubkey: ''
  };
  export let created_at = 0;

  // Function to calculate time ago
  function calculateTimeAgo(timestamp) {
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    const difference = currentTime - timestamp;

    if (difference < 60) {
      return `${difference} seconds ago`;
    } else if (difference < 3600) {
      const minutes = Math.floor(difference / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (difference < 86400) {
      const hours = Math.floor(difference / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(difference / 86400);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
  }

  // Function to extract image links from text
  function extractImageLinks(text) {
    const imageRegex = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/gi;
    const matches = text.match(imageRegex);
    return { matches: matches || [], cleanedText: text.replace(imageRegex, '') };
  }

  // Extract images and cleaned text
  const { matches: imageLinks, cleanedText: textWithoutImages } = extractImageLinks(content);

</script>

<style>
  .notecard-container {
    display: flex;
    flex-direction: column;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
    margin-bottom: 10px;
  }

  .user-info {
    display: flex;
    align-items: center;
  }

  .user-image {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }

  .content-name {
    font-weight: bold;
    cursor: pointer;
    text-decoration: underline;
  }

  .content-date {
    margin-left: 6px;
    color: #888;
  }

  .content-text {
    margin: 10px 0;
  }

  .content-image {
    max-width: 100%;
    margin-bottom: 5px;
  }
</style>

<div class="notecard-container">
  <div class="user-info">
    <img src={user.picture} alt={user.name} class="user-image" />
    <span class="content-name">
      {user.name}
    </span>
    <span class="content-date">
      {calculateTimeAgo(created_at)}
    </span>
  </div>
  <p class="content-text">
    {textWithoutImages}
  </p>
  <div>
    {#each imageLinks as link}
      <img src={link} alt={`Image ${link}`} class="content-image" />
    {/each}
  </div>
</div>
