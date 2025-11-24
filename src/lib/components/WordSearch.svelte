<script>
  let query = "";
  let results = [];

  async function search() {
    const res = await fetch(`/api/engmatch?word=${encodeURIComponent(query)}`);
    const data = await res.json();
    results = data.matches || [];
  }
</script>

<form class="search-form" on:submit|preventDefault={search}>
  <input
    type="text"
    bind:value={query}
    placeholder="Search…"
  />
  <button on:click={search}>Search</button>
</form>

{#if results.length > 0}
  <span class="results">
    found: 
    {results
      .map(r => r.words?.[0]?.lemma)
      .filter(Boolean)
      .join(', ')}
  </span>
{/if}

<style>
  .search-form {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    align-items: center;
    margin: 1.5rem 0;
  }

  .search-form input {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 6px;
    width: 120px;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .search-form input:focus {
    outline: none;
    border-color: #5a8dee;
    box-shadow: 0 0 0 3px rgba(90, 141, 238, 0.25);
  }

  .search-form button:active {
    transform: scale(0.97);
  }

  .results {
    font-family: Arial, sans-serif;
  }
</style>
