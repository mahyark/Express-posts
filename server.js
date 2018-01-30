const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var request = require('request');

app.listen(process.env.PORT || 4000, () => {
  console.log('Listening on port 4000');
});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));

// Redirect to posts
app.get('/', (req, res) => {
   res.redirect('/posts');
});

// List all posts
app.get('/posts', (req, res) => {
	request("http://jsonplaceholder.typicode.com/posts", function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    var posts = JSON.parse(body);

	    /*for(var post in posts) {
		   console.log(post.title);
		}*/

		console.log(JSON.stringify(posts[2].title));
   		res.render('posts.ejs', { posts: posts });
	  }
	  
	});
});

// Show the search form
app.get('/search', (req, res) => {
   res.render('search.ejs', { post: '' });
});

// Find all comments for post
app.post('/search', (req, res) => {});
