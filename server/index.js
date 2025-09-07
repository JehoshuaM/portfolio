// index.js

// Import necessary modules
const express = require('express'); // Web framework for Node.js
const mongoose = require('mongoose'); // MongoDB object modeling tool
const cors = require('cors'); // Middleware for enabling Cross-Origin Resource Sharing

// Initialize the Express app
const app = express();
const PORT = process.env.PORT || 5000; // Define the port the server will run on

// Middleware
// Enable CORS for all routes. This is crucial for your Next.js frontend
// to be able to make requests to this server, as they will be on different ports.
app.use(cors()); 
// Enable Express to parse JSON formatted request bodies
app.use(express.json());

// MongoDB Connection URI
const mongoURI = 'mongodb+srv://jehoshua:9thZfHdKM7dh3NbP@cluster0.xadg0vw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; 

// Connect to MongoDB
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected successfully!'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define the Blog Post Schema
// This schema defines the structure of your blog posts in the MongoDB collection.
const blogPostSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true }, // Unique ID for the post
    title: { type: String, required: true }, // Title of the blog post
    content: { type: String, required: true }, // Full content of the blog post
    excerpt: { type: String }, // Short summary of the post
    date: { type: String, required: true }, // Date of publication (e.g., "YYYY-MM-DD")
    tags: { type: [String], default: [] }, // Array of tags
    published: { type: Boolean, default: true }, // Whether the post is published
    readTime: { type: Number, default: 0 }, // Estimated read time in minutes
    views: { type: Number, default: 0 }, // Number of views
    likes: { type: Number, default: 0 }, // Number of likes
    category: { type: String, default: 'General' }, // Category of the post
}, {
    timestamps: true // Adds createdAt and updatedAt timestamps automatically
});

// Create the Mongoose Model from the schema
// This 'BlogPost' model will be used to interact with the 'blogposts' collection in MongoDB.
const BlogPost = mongoose.model('BlogPost', blogPostSchema);

// API Routes

// GET all blog posts
// Endpoint: /api/posts
// Returns an array of all blog posts.
app.get('/api/posts', async (req, res) => {
    try {
        const posts = await BlogPost.find({}); // Find all documents in the collection
        res.json(posts); // Send them as a JSON response
    } catch (err) {
        console.error('Error fetching posts:', err);
        res.status(500).json({ message: 'Server error fetching posts' });
    }
});

// GET a single blog post by ID
// Endpoint: /api/posts/:id
// Returns a single blog post matching the provided ID.
app.get('/api/posts/:id', async (req, res) => {
    try {
        const post = await BlogPost.findOne({ id: req.params.id }); // Find one document by its 'id' field
        if (!post) {
            return res.status(404).json({ message: 'Blog post not found' });
        }
        res.json(post);
    } catch (err) {
        console.error('Error fetching single post:', err);
        res.status(500).json({ message: 'Server error fetching post' });
    }
});

// POST a new blog post
// Endpoint: /api/posts
// Creates a new blog post from the request body.
app.post('/api/posts', async (req, res) => {
    try {
        // Create a new BlogPost instance with data from the request body
        const newPost = new BlogPost({
            id: req.body.id || new mongoose.Types.ObjectId().toString(), // Use provided ID or generate a new one
            title: req.body.title,
            content: req.body.content,
            excerpt: req.body.excerpt,
            date: req.body.date || new Date().toISOString().split('T')[0],
            tags: req.body.tags || [],
            published: req.body.published !== undefined ? req.body.published : true,
            readTime: req.body.readTime || 0,
            views: req.body.views || 0,
            likes: req.body.likes || 0,
            category: req.body.category || 'General'
        });
        await newPost.save(); // Save the new post to MongoDB
        res.status(201).json(newPost); // Respond with the created post and 201 status
    } catch (err) {
        console.error('Error creating post:', err);
        // Handle validation errors or duplicate ID errors specifically if needed
        res.status(400).json({ message: 'Error creating post', error: err.message });
    }
});

// PUT (update) an existing blog post
// Endpoint: /api/posts/:id
// Updates a blog post matching the provided ID with data from the request body.
app.put('/api/posts/:id', async (req, res) => {
    try {
        const updatedPost = await BlogPost.findOneAndUpdate(
            { id: req.params.id }, // Find by the 'id' field
            req.body, // Update with the request body
            { new: true, runValidators: true } // Return the updated document and run schema validators
        );
        if (!updatedPost) {
            return res.status(404).json({ message: 'Blog post not found' });
        }
        res.json(updatedPost);
    } catch (err) {
        console.error('Error updating post:', err);
        res.status(400).json({ message: 'Error updating post', error: err.message });
    }
});

// DELETE a blog post
// Endpoint: /api/posts/:id
// Deletes a blog post matching the provided ID.
// In a real application, you would add authentication here.
app.delete('/api/posts/:id', async (req, res) => {
    try {
        const deletedPost = await BlogPost.findOneAndDelete({ id: req.params.id }); // Find and delete by 'id' field
        if (!deletedPost) {
            return res.status(404).json({ message: 'Blog post not found' });
        }
        res.status(200).json({ message: 'Blog post deleted successfully' });
    } catch (err) {
        console.error('Error deleting post:', err);
        res.status(500).json({ message: 'Server error deleting post' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
