<script lang="ts">

    import Avatar from './avatar.svelte';

    export let name: string;
    export let size: number;

    $: src =  'https://cloud.appwrite.io/v1/avatars/initials?name=Bishwajeet+Parhi&width=80&height=80&project=console'
</script>

<Avatar {name} {size} {src} />