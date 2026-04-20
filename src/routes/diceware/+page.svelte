<script lang="ts">
  import {onMount} from 'svelte'
  import {metaData} from '$lib/store'

  const langs = [
      {
        file: 'beale.wordlist.asc',
        name: 'English'
      },
      {
        file: 'noppaware.txt',
        name: 'Finnish'
      }
    ],
    numberOfGroups = [4, 5, 6, 7, 8, 9, 10],
    title = 'Diceware'

  let groupNumber = $state(5),
    langIndex = $state(1),
    password = $state(''),
    special = $state(false),
    wordMap = $state<Record<string, string>>({})

  const separators = [' ', '!', '?', '.', '-', '_', '&', '#', '%', '+']

  const changeFile = async () => {
    let lang = langs[langIndex]
    if (!lang) {
      lang = langs[0]
    }
    const list = await fetch(`/dice/${lang!.file}`).then(r => r.text())
    // Convert "12345 word" into a lookup map
    const map: Record<string, string> = {}
    list.split('\n').forEach(line => {
      const [key, word] = line.trim().split(/\s+/)
      if (key && word) map[key] = word
    })

    wordMap = map
  }

  onMount(async () => {
    changeFile()

    $metaData = {
      created: '2026-04-19T23:00:00+03:00',
      description: 'Diceware password generator using Svelte. Create secure, memorable passphrases from random wordlists with dice rolls. Works locally in browser for privacy.',
      title
    }
  })

  // Roll a 5-digit dice key (each digit 1–6)
  const rollDiceKey = () => {
    let key = ''
    for (let i = 0; i < 5; i++) {
      key += Math.floor(Math.random() * 6) + 1
    }
    return key
  }

  const generate = () => {
    const words: string[] = [],
      usedKeys = new Set<string>()

    while (words.length < groupNumber) {
      const key = rollDiceKey()

      // ensure unique dice roll
      if (usedKeys.has(key)) continue

      const word = wordMap[key]
      if (!word) continue

      usedKeys.add(key)
      words.push(word)
    }

    // Join with random separators
    password = special ? words.map((w, i) => (i === 0 ? w : separators[Math.floor(Math.random() * separators.length)] + w)).join('') : words.join(' ')
  }

  const styles = 'border border-gray-400 h-12 px-4 rounded-lg',
    stylesLabel = 'block mb-2'
</script>

<div id="diceware" class="max-w-screen-md mx-auto my-10 px-6">
  <h1 class="mb-6 text-center">Diceware</h1>

  <div id="dice-summary" class="text-left">
    <p><a href="https://theworld.com/~reinhold/diceware.html" class="external">Diceware</a> is a method for generating cryptographically secure, memorable passphrases by randomly selecting words from a list of 7776 entries using a six-sided die. Using six or more words produces an enormous number of possible combinations (7776^n), making the passphrase highly resistant to brute-force attacks and suitable for high-security use.</p>
    <p>Passwords are generated within your browser and do not leave it.</p>
  </div>

  <div id="dice-controls" class="grid gap-4 justify-center mt-10">
    <div class="flex gap-4">
      <div>
        <label for="lang" class={stylesLabel}>Language</label>
        <select bind:value={langIndex} onchange={changeFile} id="lang" class={styles}>
          {#each langs as lang, index}
            <option value={index}>{lang.name}</option>
          {/each}
        </select>
      </div>

      <div>
        <label for="dice-groups" class={stylesLabel}>Words</label>
        <select bind:value={groupNumber} id="dice-groups" class={styles}>
          {#each numberOfGroups as group}
            <option value={group}>{group}</option>
          {/each}
        </select>
      </div>

      <button onclick={generate} class={`${styles} self-end`} type="submit">Generate</button>
    </div>

    <label class="text-center">
      <input bind:checked={special} id="dice-special" type="checkbox" />
      <span class="ml-2">Use special characters</span>
    </label>
  </div>

  {#if password}
    <div class="mt-10 text-center">
      <span class="text-lg uppercase">Your password</span>
      <span id="dice-password" class="block font-bold my-4 text-2xl">{password}</span>
      <small>({password.length} characters)</small>
    </div>
  {/if}
</div>
