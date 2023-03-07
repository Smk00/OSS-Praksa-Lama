const express = require('express');
const fs = require('fs');
const app = express();


app.get('/posts/:id', (req, res) => {
  fs.readFile('./data.json', 'utf8', (err, data) => {
    if(err) throw err;
    const posts = JSON.parse(data).posts;
    const post = posts.find((post) => post.id === parseInt(req.params.id));
    if(!post) res.status(404).send('Post not found');

    res.send(post);

  });
});

app.get('/users/:id', (req, res) => {
  fs.readFile('./data.json', 'utf8', (err, data) => {
    if(err) throw err;
    const users = JSON.parse(data).users;
    const user = posts.find((user) => user.id === parseInt(req.params.id));
    if(!post) res.status(404).send('user not found');

    res.send(post);

  });
});

app.get('/posts', (req, res) => {
    fs.readFile('./data.json', 'utf8', (err, data) => {
      if (err) throw err;
      const posts = JSON.parse(data).posts;
      const startDate = new Date(req.query.startDate);
      const endDate = new Date(req.query.endDate);
      const filteredPosts = posts.filter((post) => {
        const postDate = new Date(post.last_update);
        return postDate >= startDate && postDate <= endDate;
      });
      res.send(filteredPosts);
    });
  });

  
app.post('/users/:id/email', (req, res) => {
    fs.readFile('./data.json', 'utf8', (err, data) => {
      if (err) throw err;
      const jsonData = JSON.parse(data);
      const user = jsonData.users.find((user) => user.id === parseInt(req.params.id));
      if (!user) {
        return res.status(404).send('User not found');
      }
      user.email = req.body.email;
      fs.writeFileSync('./data.json',JSON.stringify(jsonData,null,2));
      res.send(user);
    });
  });
  
  app.put('/posts', (req, res) => {
    fs.readFile('./data.json', 'utf8', (err, data) => {
      if (err) throw err;
      const jsonData = JSON.parse(data);
      
      const title = req.body;
      const body = req.body;
      const user_id = req.body;
      
      const last_update = new Date().toISOString();
      const newPost = { id: jsonData.posts.length + 1, user_id, title, body, last_update };
      jsonData.posts.push(newPost);
      fs.writeFileSync('./data.json',JSON.stringify(jsonData,null,2));
      res.send(newPost);
    });
  });
app.listen(3000, () => {
    console.log('Server started on port 3000');
  });
