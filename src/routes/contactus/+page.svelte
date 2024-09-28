<script>
  import { onMount } from 'svelte';
  import NDK, { NDKEvent, NDKNip07Signer } from "@nostr-dev-kit/ndk";
  import Icon from '@iconify/svelte';

  let formSubmitted = false;
  let ndk;
  let nip07signer;
  let userPubkey;

  const recipientPubkey = '06830f6cb5925bd82cca59bda848f0056666dff046c5382963a997a234da40c5';

  onMount(async () => {
    try {
      // Initialize the signer
      nip07signer = new NDKNip07Signer();
      const user = await nip07signer.user();
      userPubkey = user.pubkey;
      console.log("User public key:", userPubkey);

      // Initialize NDK with the signer
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
    } catch (error) {
      console.error("Error during onMount:", error);
    }
  });

  async function handleSubmit(event) {
    event.preventDefault();
    formSubmitted = true;

    const name = event.target.name.value;
    const npub = event.target.npub.value;
    const message = event.target.message.value;

    try {
      const eventContent = JSON.stringify({
        name: name,
        npub: npub,
        message: message
      });

      // Create the event
      const ndkEvent = new NDKEvent(ndk);
      ndkEvent.kind = 14; // Set the event kind
      ndkEvent.content = eventContent; // Set the content
      ndkEvent.tags = [
        ['p', recipientPubkey, "wss://relay.damus.io"],
      ];

      // Sign the event with the signer
      await ndk.publish(ndkEvent); // Publish the event

      console.log("Message sent:", ndkEvent);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }
</script>

<main>
  <section class="content">
    <h1>Get in Touch with Us</h1>
    <p>We'd love to hear from you! Whether you have questions, need support, or just want to connect, we're here to help.</p>

    {#if formSubmitted}
      <p>Thank you for your message! We'll get back to you soon.</p>
    {:else}
      <form on:submit={handleSubmit}>
        <label for="name">Name:</label>
        <input id="name" name="name" type="text" required />

        <label for="npub">Nostr npub:</label>
        <input id="npub" name="npub" type="text" />

        <label for="message">Message:</label>
        <textarea id="message" name="message" required></textarea>

        <button type="submit">Send Message</button>
      </form>
    {/if}

    <section class="social-media">
      <h2>Follow Us on Social Media</h2>
      <a href="https://x.com/BitBiashara" target="_blank" rel="noopener noreferrer">
        <Icon icon="mingcute:social-x-line" />
        Twitter
      </a>
      <a href="https://facebook.com/bitbiashara" target="_blank" rel="noopener noreferrer">
        <Icon icon="typcn:social-facebook-circular" />
        Facebook
      </a>
      <a href="https://www.tiktok.com/@bitbiashara" target="_blank" rel="noopener noreferrer">
        <Icon icon="logos:tiktok" />
        TikTok
      </a>
    </section>

    <section class="support-hours">
      <h2>Customer Support Hours</h2>
      <p>Available 24/7 to assist you with any inquiries or issues.</p>
    </section>
  </section>
</main>

<style>
  main {
    padding: 2rem;
    font-family: Arial, sans-serif;
    background-color: #f9f9f9;
  }

  .content {
    margin: 0 auto;
    background-color: #fff;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  h1 {
    text-align: center;
  }

  p {
    line-height: 1.5;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  label {
    font-weight: bold;
    text-align: left;
  }

  input, textarea {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1rem;
    width: 100%;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.75rem;
    border: none;
    border-radius: 5px;
    background-color: #E8D400;
    color: #fff;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #d1bc00;
  }

  .social-media {
    text-align: center;
    margin-top: 2rem;
  }

  .social-media a {
    margin: 0 1rem;
    color: #333;
    transition: color 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }

  .social-media a:hover {
    color: #E8D400;
  }
</style>
