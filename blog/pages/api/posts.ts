import { sortedBlogPost, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import type { Blog } from 'contentlayer/generated'

export default async function handler(req, res) {
    if (req.method === 'GET') {
      const posts = sortedBlogPost(allBlogs) as Blog[]
      const temp = allCoreContent(posts)
      res.status(200).json(temp.map(x=>({path:'/' + x.path + '/'})));
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  }