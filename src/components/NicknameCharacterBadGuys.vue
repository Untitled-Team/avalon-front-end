<template>
    <div class="columns">
        <div class="column is-full permanentPlayerInfo mediumText">
            <div class="level">
                <span id="nickname" class="level-left level-item">{{ nickname }}</span>
                <span id="character" class="level-right level-item">{{ character }}</span>
                <span id="badGuys" class="level-item">
                    <span v-for="(badGuy, index) in badGuys" :key="index">
                        {{badGuy}}
                    </span>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'NicknameCharacterBadGuys',
        props: ['badGuys'],
        computed: {
            nickname: function () {
                return this.$store.getters.getNickname
            },
            character: function () {
                return this.$store.getters.getCharacter
            },
        }
    }
</script>

<style scoped>

</style>