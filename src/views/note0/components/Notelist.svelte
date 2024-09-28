<script>
  import { onMount } from 'svelte';
  import NoteCard from './NoteCard.svelte'; // Import your NoteCard Svelte component

  export let projects = [];
  export let metadata = {};

  let limit = 21; // Initialize the limit state

  // Sort projects by created_at in descending order
  $: sortedProjects = projects.slice().sort((a, b) => b.created_at - a.created_at);

  // Load more button click handler
  function loadMore() {
    limit += 21;
  }
</script>

<style>
  .container {
    margin: 0 20px;
    padding: 10px;
  }

  .note-list {
    display: flex;
    flex-direction: column;
  }

  .load-more-button {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
</style>

<div class="container">
  {#if Object.keys(metadata).length === 0}
    <!-- Display a loading message until metadata is available -->
    <p>Loading...</p>
  {:else}
    <div class="note-list">
      {#each sortedProjects.slice(0, limit) as nostr (nostr.pubkey)}
        <NoteCard
          created_at={nostr.created_at}
          user={{
            name: metadata[nostr.pubkey]?.name ?? nostr.pubkey,
            about: metadata[nostr.pubkey]?.about ?? nostr.about,
            picture: metadata[nostr.pubkey]?.picture || `https://www.gravatar.com/avatar/${nostr.pubkey}?d=identicon`,
            pubkey: nostr.pubkey
          }}
          content={nostr.content}
        />
      {/each}
    </div>

    {#if sortedProjects.length > limit}
      <div class="load-more-button">
        <button on:click={loadMore}>Load More</button>
      </div>
    {/if}
  {/if}
</div>
