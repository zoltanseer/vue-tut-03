<template>
  <div class="view-profile container">
    <div class="card" v-if="profile">
      <h2 class="deep-purple-text center">{{profile.alias}}'s Wall</h2>
      <ul class="comments collection">
        <li v-for="(comment, index) in comments" :key="index">
          <div class="deep-purple-text">{{comment.from}}</div>
          <div class="grey-text text-darken-2">{{comment.content}}</div>
        </li>
      </ul>
      <form @submit.prevent="addComment">
        <div class="field">
          <label for="comment">Add a comment</label>
          <input type="text" name="comment" v-model="newComment" />
          <p class="red-text center" v-if="feedback">{{ feedback }}</p>
          <div class="field">
            <button class="btn deep-purple">Send</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "@/firebase/init";
export default {
  name: "ViewProfile",
  data() {
    return {
      user: null,
      profile: null,
      newComment: null,
      feedback: null,
      comments: []
    };
  },
  methods: {
    addComment() {
      if (this.newComment) {
        this.feedback = null;
        db.collection("comments")
          .add({
            to: this.$route.params.id,
            from: this.user.alias,
            content: this.newComment,
            time: Date.now()
          })
          .then(() => {
            this.newComment = null;
          });
      } else {
        this.feedback = "Please enter something in the field!";
      }
    }
  },
  created() {
    let ref = db.collection("users");
    // get current user
    ref
      .where("user_id", "==", firebase.auth().currentUser.uid)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.user = doc.data();
          this.user.id = doc.id;
        });
      });

    // profile data
    ref
      .doc(this.$route.params.id)
      .get()
      .then(user => {
        this.profile = user.data();
      });

    // comments
    db.collection("comments")
      .where("to", "==", this.$route.params.id)
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type == "added") {
            let data = change.doc.data();
            this.comments.unshift({
              from: data.from,
              content: data.content
            });
          }
        });
      });
  }
};
</script>

<style>
.view-profile .card {
  padding: 20px;
  margin-top: 60px;
}
.view-profile .card h2 {
  font-size: 2em;
  margin-top: 0;
}

.view-profile li {
  padding: 15px;
  border-bottom: 1px solid #eee;
}
</style>