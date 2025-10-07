import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { projectController } from './project.controller';
import { createProjectValidationSchema, updateProjectValidateSchema } from './project.validation';


const route = express.Router()

route.post('/create', validateRequest(createProjectValidationSchema), projectController.creteNewProject)
route.get('/', projectController.getAllProjects)
route.delete('/:id', projectController.deleteProject)
route.get('/:slagId', projectController.getSingleProject)
route.put('/:projectId', validateRequest(updateProjectValidateSchema), projectController.updateProject)

export const projectRoute = route