<template>
    <div id="notif" v-if="$store.state.notif.on">
        {{ $store.state.notif.message }}
    </div>
</template>

