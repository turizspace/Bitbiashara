<!-- src/components/Footer.svelte -->
<script lang="ts">
  import logoSrc1 from "../assets/images/orangeicon.png";
  import logoSrc from "../assets/images/bitbiashara_landscape.png";
</script>

<header class="header">
    <img class="logo-icon coin-spin" src={logoSrc1} alt="ROSECOCOiconLogo">
    <img class="logo-text" src={logoSrc} alt="ROSECOCOtextLogo">
</header>

<style>
    .header {
        display: flex;
        align-items: center;
        justify-content: center; /* Center horizontally */
        background: linear-gradient(185deg, #f89a3c, #666);
        width: 100%;
        padding: 1em; /* Optional: Add padding around content */
        border-bottom: 0.1em solid #e7e7e7; /* Light bottom border */
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Optional: Add shadow for depth */
        perspective: 1000px; /* Create perspective for 3D effect */
    }

    .logo-icon {
        width: 5em; /* Width of the logo icon */
        height: auto; /* Maintain aspect ratio */
        margin-right: 1em; /* Space between logo icon and text */
        transform-style: preserve-3d; /* Maintain 3D transformations */
    }

    .logo-text {
        width: 12em; /* Width of the logo text */
        height: auto; /* Maintain aspect ratio */
    }

    /* Add coin-like spinning effect in the opposite direction */
    .coin-spin {
        animation: spin 4s linear infinite; /* Adjust duration for faster spin */
    }

    @keyframes spin {
        0% {
            transform: rotateY(0deg); /* Start position */
        }
        100% {
            transform: rotateY(-360deg); /* Rotate in the opposite direction */
        }
    }

    /* Reset margin-right for the last image */
    .header img:last-child {
        margin-right: 0;
    }
</style>
