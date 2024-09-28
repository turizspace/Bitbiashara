<script>
    import Header from '../components/Header.svelte';
    import Footer from '../components/Footer.svelte';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';

      const tabs = [
          { name: 'Blogs', path: '/blogs' },
          { name: 'Events', path: '/events' },
          { name: 'News', path: '/news' },
          { name: 'Shop with Us', path: '/shop' },
          { name: 'Start-up Kona', path: '/contactus' },
          { name: 'About Bitbiashara', path: '/aboutus' },
      ];

      $: currentPath = $page.url.pathname;
      let isMenuOpen = false;

      function toggleMenu() {
          isMenuOpen = !isMenuOpen;
      }

      function navigateTo(event, path) {
          event.preventDefault(); // Prevent the default link behavior
          isMenuOpen = false; // Close the menu if it's open
          goto(path); // Navigate to the specified path
      }
  </script>
  <Header />

  <div class="container">
      <nav class="left-tabs">
          <button class="menu-toggle" on:click={toggleMenu}>
              ☰
          </button>
          <ul class:mobile-menu-open={isMenuOpen}>
              {#each tabs as tab}
                  <li>
                      <a href="#" tabindex="0" on:click={(e) => navigateTo(e, tab.path)} class:selected={currentPath === tab.path}>{tab.name}</a>
                  </li>
              {/each}
          </ul>
      </nav>

      <main class="content">
          <slot /> <!-- This renders the content of the matched route -->
      </main>

      <!-- Hide highlights on small screens using CSS -->
      <aside class="right-tabs">
          <ul>
              <li><a href="#" tabindex="0" on:click={(e) => navigateTo(e, '/blogs')}>Highlights</a></li>
          </ul>
      </aside>

      <!-- Conditionally render highlights below menu and content on small screens -->
      {#if isMenuOpen}
          <div class="highlights-mobile">
              <ul>
                  <li><a href="#" tabindex="0" on:click={(e) => navigateTo(e, '/highlights')}>Highlights</a></li>
              </ul>
          </div>
      {/if}
  </div>

<Footer />

<style>
    .container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        background: linear-gradient(185deg, #f89a3c, #666);

    }

    .left-tabs {
        flex: 0 0 200px;
        border-right: 1px solid #ccc;
    }

    .left-tabs ul {
        list-style-type: none;
        padding: 0;
    }

    .left-tabs li {
        margin: 0.5em 0;
    }

    .left-tabs a {
        text-decoration: none;
        color: #000;
        padding: 0.5em;
        display: block;
    }

    .left-tabs a.selected {
        font-weight: bold;
        color: #E8D400;
    }


    .right-tabs {
        flex: 0 0 200px;
        border-left: 1px solid #ccc;
    }

    .right-tabs ul {
        list-style-type: none;
        padding: 0;
    }

    .right-tabs li {
        margin: 0.5em 0;
    }

    .right-tabs a {
        text-decoration: none;
        color: #000;
        padding: 0.5em;
        display: block;
    }

    .menu-toggle {
        display: none;
        background: none;
        border: none;
        font-size: 1.5em;
        cursor: pointer;
    }

    .mobile-menu-open {
        display: block;
    }

    .highlights-mobile {
        display: none;
    }

    @media (max-width: 768px) {
        .container {
            flex-direction: column;
        }

        .left-tabs, .right-tabs {
            flex: 0 0 auto;
            width: 100%;
            border: none;
        }

        .right-tabs {
            display: none; /* Hide right tabs on small screens */
        }

        .left-tabs ul {
            display: none;
            flex-direction: column;
            width: 100%;
            padding: 1em 0;
            background: #fff;
            position: absolute;
            top: 3.5em;
            left: 0;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .left-tabs ul.mobile-menu-open {
            display: flex;
        }

        .menu-toggle {
            display: block;
            margin: 1em;
        }

        .content {
            margin-top: 0;
        }

        .highlights-mobile {
            display: block; /* Show highlights section on small screens */
            padding: 1em;
            background: #f9f9f9;
            margin-top: 1em;
        }
    }
</style>
