<template>
    <div id="proposedPartyVoteMenu">
        Proposed Party
        <br/>
        {{ proposedParty }}
        <br/>
        <input type="button" class="button" v-on:click="voteToApprove" value="Vote To Approve">
        <br/>
        <input type="button" class="button" v-on:click="voteToDeny" value="Vote To Deny">
    </div>
</template>

<script>
    export default {
        name: 'ProposedPartyVoteMenu',
        props: ["proposedParty"],
        methods: {
            voteToApprove: function () {
                this.$socket.sendObj({
                    action: 'ApproveParty',
                })
            },
            voteToDeny: function () {
                this.$socket.sendObj({
                    action: 'DenyParty',
                })
            },
        },
    }
</script>

<style scoped>
    #proposedPartyVoteMenu {
        padding: 15px;
    }
</style>