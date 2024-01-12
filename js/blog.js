const firebaseConfig = {
    apiKey: "AIzaSyA_6JaEDwjsguMhAqcUXwNlWODzqsWDPNo",
    authDomain: "karyamukti-test.firebaseapp.com",
    projectId: "karyamukti-test",
    storageBucket: "karyamukti-test.appspot.com",
    messagingSenderId: "803789343916",
    appId: "1:803789343916:web:6c693876e74e2e48d4e309",
    measurementId: "G-ZQTPJ25M4J"
    };
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();

const submitButton = document.getElementById("submitButton");
const blogForm = document.getElementById("blogForm");

function createPostPage(postId) {
window.location.href = `fullPost.html?id=${postId}`;
}

function getCurrentTimestamp() {
  return firebase.firestore.FieldValue.serverTimestamp();
}

blogForm.addEventListener("submit", function(event) {
  event.preventDefault();
  submitButton.disabled = true;

  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const imageFile = document.getElementById("image").files[0];

  if (imageFile) {
    const storageRef = storage.ref("blog_images/" + imageFile.name);
    const uploadTask = storageRef.put(imageFile);

    uploadTask.on(
      "state_changed",
      null,
      function(error) {
        console.error("Error uploading image: ", error);
        alert("Error uploading image");
        submitButton.disabled = false;
      },
      function() {
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          db.collection("blog").add({
            title: title,
            content: content,
            imageURL: downloadURL,
            timestamp: getCurrentTimestamp()
          })
          .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
            alert("Blog post created successfully!");
            createPostPage(docRef.id);
          })
          .catch(function(error) {
            console.error("Error adding document: ", error);
            alert("Error creating blog post");
            submitButton.disabled = false;
          });
        });
      }
    );
  } else {
    db.collection("blog").add({
      title: title,
      content: content,
      imageURL: null,
      timestamp: getCurrentTimestamp()
    })
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
      alert("Blog post created successfully!");
      createPostPage(docRef.id);
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
      alert("Error creating blog post");
      submitButton.disabled = false;
    });
  }
});