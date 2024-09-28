<script>
    import Header from '../components/Header.svelte';
    import Footer from '../components/Footer.svelte';
    import Note from '../views/note/Note.svelte';
    import { goto } from '$app/navigation'; // Import goto from SvelteKit
    import '../styles/layout.css';
</script>


<div class="container">
    <main class="content">
        <section class="hero">
            <h1>Welcome to ₿itBiashara:</h1>
            <h2>Empowering african entrepreneurs through ₿itcoin</h2>
            <p>
                ₿itBiashara is a pioneering African initiative aimed at promoting and showcasing the practical usage of
                Bitcoin in business interractions. By leveraging the potential of Bitcoin, BitBiashara seeks to empower
                African entrepreneurs to embrace the numerous advantages of the Bitcoin ecosystem.
            </p>
            <div class="hero-buttons">
                <button on:click={() => goto('/home')} class="btn-primary">Get Started</button>
                <button on:click={() => goto('/aboutus')} class="btn-secondary">Learn More</button>
            </div>
        </section>

    </main>
</div>

<style>
    .hero {
        text-align: center; /* Center text in the hero section */
        padding: 2em; /* Add padding for spacing */
    }

    .hero-buttons {
        display: flex;
        justify-content: center;
        gap: 1em; /* Space between buttons */
    }

    .btn-primary, .btn-secondary {
        padding: 1em 2em;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 1em;
    }

    .btn-primary {
        background-color: #E8D400;
        color: #000;
    }

    .btn-secondary {
        background-color: #F4F4F4;
        color: #000;
    }
</style>
