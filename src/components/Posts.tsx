import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Post {
  id: number;
  title: string;
  content: string;
}

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingPostId, setEditingPostId] = useState<number | null>(null);

  // Lấy danh sách bài viết khi trang được tải
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('https://api-test-web.agiletech.vn/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  // Thêm bài viết mới
  const addPost = async () => {
    try {
      const response = await axios.post('https://api-test-web.agiletech.vn/posts', {
        title,
        content,
      });
      setPosts([...posts, response.data]);
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  // Cập nhật bài viết
  const updatePost = async (id: number) => {
    try {
      await axios.put(`https://api-test-web.agiletech.vn/posts/${id}`, {
        title,
        content,
      });
      fetchPosts();
      setEditingPostId(null);
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  // Xóa bài viết
  const deletePost = async (id: number) => {
    try {
      await axios.delete(`https://api-test-web.agiletech.vn/posts/${id}`);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            {editingPostId === post.id ? (
              <>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                />
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Content"
                />
                <button onClick={() => updatePost(post.id)}>Update</button>
              </>
            ) : (
              <>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                <button onClick={() => {
                  setEditingPostId(post.id);
                  setTitle(post.title);
                  setContent(post.content);
                }}>Edit</button>
                <button onClick={() => deletePost(post.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
      
      {/* Form để thêm bài viết */}
      <div>
      <input
  type="text"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
  placeholder="Title"
/>
<textarea
  value={content}
  onChange={(e) => setContent(e.target.value)}
  placeholder="Content"
/>
<button onClick={addPost}>Add Post</button>
</div>
</div>
);
};

export default Posts;
