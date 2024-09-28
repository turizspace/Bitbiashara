<script>
  import { onMount, onDestroy } from 'svelte';
  import NDK, { NDKNip07Signer } from "@nostr-dev-kit/ndk";
  import Icon from '@iconify/svelte';

  let eventsKind1 = [];
  let profiles = {};
  let isLoading = true;
  let ndk;
  let nip07signer;
  let subscriptionKind1;
  let subscriptionKind0;

  onMount(async () => {
    try {
      nip07signer = new NDKNip07Signer();
      const user = await nip07signer.user();
      const userPubkey = user.pubkey;
      console.log("User public key:", userPubkey);

      ndk = new NDK({
        explicitRelayUrls: [
          'wss://relay.snort.social',
          'wss://relay.primal.net',
          'wss://nostr-02.dorafactory.org'
        ],
        signer: nip07signer
      });

      await ndk.connect();
      console.log("Connected to relay");

      subscriptionKind1 = ndk.subscribe({
        kinds: [30023],
        authors: [
          '06830f6cb5925bd82cca59bda848f0056666dff046c5382963a997a234da40c5',
          'b594fbf9de299be2cc5b2a645e83887269e004cffe566d0e784cb381ddb53548'
        ]
      });

      subscriptionKind1.on('event', (event) => {
        console.log("Kind 1 event received:", event);
        eventsKind1 = [...eventsKind1, event];
        isLoading = false; // Stop loading once the first event is received
      });

      subscriptionKind0 = ndk.subscribe({
        kinds: [0],
        authors: [
          '06830f6cb5925bd82cca59bda848f0056666dff046c5382963a997a234da40c5',
          'b594fbf9de299be2cc5b2a645e83887269e004cffe566d0e784cb381ddb53548'
        ]
      });

      subscriptionKind0.on('event', (event) => {
        try {
          const profile = JSON.parse(event.content); // Parse the content field
          profiles[event.pubkey] = profile; // Store the parsed profile data
        } catch (error) {
          console.error("Error parsing profile content:", error);
        }
      });

      subscriptionKind1.on('error', (error) => {
        console.error("Subscription error (Kind 1):", error);
      });

      subscriptionKind0.on('error', (error) => {
        console.error("Subscription error (Kind 0):", error);
      });

    } catch (error) {
      console.error("Error during onMount:", error);
    }
  });

  onDestroy(() => {
    if (subscriptionKind1) {
    }
    if (subscriptionKind0) {
    }
    if (ndk) {
    }
  });

  function formatContent(content) {
    // Replace markdown image syntax with <img> tags and add line breaks for spacing
    return content
      .replace(/!\[.*?\]\((https?:\/\/[^\s]+(?:\.jpg|\.jpeg|\.png|\.gif))\)/gi, '<br><img src="$1" alt="Image" style="width: auto; height: 254px;"><br>');
  }

  function extractImageUrlsFromTags(tags) {
    return tags.filter(tag => tag[0] === 'image').map(tag => tag[1]);
  }
</script>

<style>
  .loading {
    font-size: 18px;
    color: #007bff;
    margin-bottom: 10px;
  }

  .content-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 16px;
    max-width: 600px;
    margin: 16px auto;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }

  .profile-card {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
  }

  .profile-card img {
    border-radius: 50%;
    width: 80px;
    height: 80px;
    margin-right: 16px;
  }

  .profile-card div {
    display: flex;
    flex-direction: column;
  }

  .profile-card h3 {
    margin: 0;
    font-size: 18px;
  }

  .profile-card p {
    margin: 0;
    font-size: 14px;
    color: #666;
  }

  .zap-button {
    background-color: #f7d74e;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    font-size: 14px;
    cursor: pointer;
    display: flex;
    align-items: center;
    margin-top: 8px;
  }

  .zap-button:hover {
    background-color: #f5c141;
  }

  .zap-icon {
    margin-left: 8px;
  }

  .content-card pre {
    white-space: pre-wrap;
    word-break: break-word;
  }

  .content-card img.content-image {
    display: block;
    width: auto;
    height: 254px; /* Ensure consistent height */
    margin: 10px 0;
    float: left; /* Align images to the left */
    margin-right: 10px; /* Add space between image and text */
  }
</style>

<div>
  {#if isLoading}
    <div class="loading">Loading events...</div>
  {/if}

  {#if eventsKind1.length > 0}
    {#each eventsKind1 as event (event.id)}
      {#if profiles[event.pubkey]}
        <div class="content-card">
          <div class="profile-card">
            <img src={profiles[event.pubkey].picture || 'https://via.placeholder.com/80'} alt="Profile Picture">
            <div>
              <h3>{profiles[event.pubkey].name || 'Unknown'}</h3>
            </div>
          </div>
          <pre class="formatted-content">
            {@html formatContent(event.content)}
            {#each extractImageUrlsFromTags(event.tags) as imageUrl}
              <img src={imageUrl} alt="Image" class="content-image">
            {/each}
          </pre>
          <p>Posted on: {new Date(event.created_at * 1000).toLocaleString()}</p>
        </div>
      {/if}
    {/each}
  {/if}
</div>
