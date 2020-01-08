<template>
    <div id="displayPassFailVotes">
        <div v-for="(vote, i) in totalVotes" :key="'vote' + i" class="vote"
             :class="{blankVote: totalVotes[i] == null, pass: totalVotes[i] === true, fail: totalVotes[i] === false}">
        </div>
    </div>
</template>

<script>
    import Vue from "vue";

    export default {
        name: 'DisplayPassFailVotes',
        data: function () {
            return {
                totalVotes: [],
                TIMEOUT_IN_MS: 1500,
            }
        },
        computed: {
            passVotes: function () {
                return this.$store.state.DisplayPassFailVoteResults.passVotes
            },
            failVotes: function () {
                return this.$store.state.DisplayPassFailVoteResults.failVotes
            },
        },
        methods: {
            sleep: (milliseconds) => {
                return new Promise(resolve => setTimeout(resolve, milliseconds))
            }
        },
        created() {
            for (let i = 0; i < this.passVotes + this.failVotes; i++) {
                this.totalVotes.push(null)
            }
            for (let i = 0; i < this.passVotes; i++) {
                this.sleep((i + 1) * this.TIMEOUT_IN_MS).then(() => {
                    Vue.set(this.totalVotes, i, true)
                })
            }
            for (let i = 0; i < this.failVotes; i++) {
                this.sleep((this.passVotes + i + 1) * this.TIMEOUT_IN_MS).then(() => {
                    Vue.set(this.totalVotes, this.passVotes + i, false)
                })
            }

            //whole screen should disappear after every vote has been displayed for 1.5 seconds
            this.sleep(this.totalVotes.length * this.TIMEOUT_IN_MS + this.TIMEOUT_IN_MS).then(() => {
                this.$store.dispatch('turnOffDisplayPassFailVoteResults')
            })
        },
    }
</script>

<style lang="scss" scoped>
    modal-background {
        background: black;
        opacity: 1 !important;
    }

    #displayPassFailVotes {
        background-color: #2f3026;
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        overflow: hidden;
        text-align: center;
        z-index: 999999999999999;

        .vote {
            display: flex;
            flex: 1 1 0;
            border-top: 5px solid #2f3026;
        }

        .pass {
            background: #04b004;
        }

        .fail {
            background: #b00404;
        }

        .blankVote {
            background: #2f3026;
        }

        :first-child {
            border: 0;
        }
    }
</style>
