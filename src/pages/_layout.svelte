<script>
    import { page, metatags } from '@roxi/routify';
    import { lang, mode } from '../components/store';
    import Header from '../components/Head.svelte';
    let active, help, effect, styleNeg, styleHigh;
    let font = 18;
    styleHigh = 'dark high';
    $: metatags.canonical = 'https://timoanttila.com' + $page.__file.shortPath;
    function effects(i) {
        if (i == 'reset') {
            effect = '';
            font = 18;
        } else if (effect && effect.includes(i)) effect = '';
        else effect = 'effect ' + i;
    }
</script>

<main id="hello" class={$mode} style={'font-size:' + font + 'px'}>
    <Header />
    <slot />
    <div id="helpMe" class="abs noBor" class:active={help}>
        <button
            id="helper"
            class="abs grid cell"
            on:click={() => (help = !help)}
        >
            <svg
                width="38"
                height="38"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill-rule="evenodd"
                clip-rule="evenodd"
            >
                <title>Accessibility Tools</title>
                <path
                    d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12m0 2c5.52 0 10 4.481 10 10 0 5.52-4.48 10-10 10-5.519 0-10-4.48-10-10 0-5.519 4.481-10 10-10m0 1c4.967 0 9 4.033 9 9s-4.033 9-9 9-9-4.033-9-9 4.033-9 9-9m-.011 11.5c-.474.006-.765.448-.989.804-.483.767-1.005 1.58-1.455 2.264-.155.238-.325.43-.609.432-.285.002-.526-.343-.389-.632.366-.769 1.953-3.539 1.953-5.868 0-.806-.429-1-1-1h-2c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h9c.276 0 .5.224.5.5s-.224.5-.5.5h-2c-.57 0-1 .194-1 1 0 2.329 1.587 5.099 1.953 5.868.137.289-.103.634-.389.632-.284-.002-.454-.194-.609-.432-.45-.684-.973-1.497-1.455-2.264-.226-.359-.52-.806-1-.804h-.011zm.011-8.5c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5"
                />
            </svg>
        </button>

        {#if help}
            <div id="helpers" class="abs bg3">
                <h3 class="tc m0">Accessibility</h3>
                <div class="content">
                    <button
                        on:click={() => (font += 1)}
                        data-message="Increase font size">Increase Text</button
                    >
                    <button
                        on:click={() => (font -= 1)}
                        data-message="Decrease font size">Decrease Text</button
                    >
                    <!--
                    <button
                        on:click={(e) => effects('high bgd')}
                        data-message="Change colors to high contrast - black, white and blue"
                    >
                        High Contrast
                    </button>
                    <button
                        on:click={(e) => effects('neg bgd')}
                        data-message="Change colors to negative contrast - black, white and yellow"
                    >
                        Negative Contrast
                    </button>
                    <button
                        on:click={(e) => effects('bgw')}
                        data-message="Change background to white and text to black"
                    >
                        Light Background
                    </button>
                -->
                    <button
                        on:click={(e) => effects('reset')}
                        data-message="Reset all accessibility choices"
                    >
                        Reset
                    </button>
                </div>
            </div>
        {/if}
    </div>
</main>

<svelte:head>
    <meta http-equiv="content-language" content={$lang} />
</svelte:head>
