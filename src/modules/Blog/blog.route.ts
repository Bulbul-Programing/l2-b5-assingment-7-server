import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { createBlogValidateSchema, updateBlogValidateSchema } from './blog.validation';
import { blogController } from './blog.controller';
import verifyToken from '../../middleware/verifyToken';

const route = express.Router()

route.post('/create',verifyToken('ADMIN', 'OWNER'), validateRequest(createBlogValidateSchema), blogController.creteNewBlog)
route.get('/', blogController.getAllBlogs)
route.delete('/:id', blogController.deleteBlog)
route.get('/:slagId', blogController.getSingleBlog)
route.put('/:blogId', validateRequest(updateBlogValidateSchema), blogController.updateBlog)

export const blogRouter = route