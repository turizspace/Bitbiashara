<script>
  import { onMount, onDestroy } from 'svelte';
  import NDK, { NDKNip07Signer } from "@nostr-dev-kit/ndk";
  import Icon from '@iconify/svelte'; // Ensure you have this installed


  let profiles = {};
  let isLoading = true;
  let ndk;
  let nip07signer;
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
          'wss://relay.plebstr.com',
          'wss://nostr-02.dorafactory.org'
        ],
        signer: nip07signer
      });

      await ndk.connect();
      console.log("Connected to relay");

      // Subscribe to events of kind 0
      subscriptionKind0 = ndk.subscribe({
        kinds: [0],
        authors: ['b594fbf9de299be2cc5b2a645e83887269e004cffe566d0e784cb381ddb53548']
      });

      subscriptionKind0.on('event', (event) => {
        try {
          const profile = JSON.parse(event.content); // Parse the content field
          profiles[event.pubkey] = profile; // Store the parsed profile data
          console.log("Kind 0 event received:", profile); // Log the profile data
          isLoading = false; // Stop loading once the first event is received
        } catch (error) {
          console.error("Error parsing profile content:", error);
        }
      });

      // Handle subscription errors
      subscriptionKind0.on('error', (error) => {
        console.error("Subscription error (Kind 0):", error);
      });

    } catch (error) {
      console.error("Error during onMount:", error);
    }
  });

  onDestroy(() => {
    // Clean up subscriptions and connections when the component is destroyed
    if (subscriptionKind0) {
    }

    if (ndk) {
    }
  });

  function handleZap(lud16) {
    alert(`Zap address: ${lud16}`);
  }
</script>

<style>
  .loading {
    font-size: 18px;
    color: #007bff;
    margin-bottom: 10px;
  }

  .profile-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 16px;
    margin: 16px auto;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }

  .profile-card img {
    border-radius: 50%;
    width: 100px;
    height: 100px;
    object-fit: cover;
    margin-bottom: 16px;
  }

  .profile-card h3 {
    margin: 0;
    font-size: 22px;
    color: #333;
  }

  .profile-card p {
    margin: 4px 0;
    font-size: 14px;
    color: #666;
  }

  .profile-card a {
    color: #007bff;
    text-decoration: none;
  }

  .profile-card a:hover {
    text-decoration: underline;
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
    color: #333;
  }

  .zap-button:hover {
    background-color: #f5c141;
  }

  .zap-icon {
    margin-left: 8px;
  }
</style>

<div>
  {#if isLoading}
    <div class="loading">Loading profile...</div>
  {/if}

  {#each Object.entries(profiles) as [pubkey, profile]}
    <div class="profile-card">
      {#if profile.picture}
        <img src={profile.picture} alt="Profile Picture">
      {:else}
        <img src="https://via.placeholder.com/100" alt="Profile Picture">
      {/if}
      <h3>{profile.displayName || profile.name || 'Unknown'}</h3>
      {#if profile.about}
        <p>{profile.about}</p>
      {/if}
      {#if profile.lud16}

      {/if}
    </div>
  {/each}
</div>
<slot></slot>
