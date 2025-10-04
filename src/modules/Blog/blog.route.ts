import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { createBlogValidateSchema } from './blog.validation';
import { blogController } from './blog.controller';

const route = express.Router()

route.post('/create', validateRequest(createBlogValidateSchema), blogController.creteNewBlog)

export const blogRouter = route