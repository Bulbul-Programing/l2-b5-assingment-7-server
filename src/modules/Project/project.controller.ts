import type { Request, Response } from "express";
import catchAsync from "../../Utils/catchAsync";
import { projectService } from "./project.service";

const creteNewProject = catchAsync(async (req: Request, res: Response) => {
    const projectData = req.body
    const result = await projectService.creteNewProject(projectData);
    res.status(200).json({
        success: true,
        massage: 'project create successfully',
        data: result
    })
})

const getAllProjects = catchAsync(async (req: Request, res: Response) => {
    const result = await projectService.getAllProjects();
    res.status(200).json({
        success: true,
        massage: 'All project retrieve successfully',
        data: result
    })
})

const getSingleProject = catchAsync(async (req: Request, res: Response) => {
    const projectSlug = req.params.slagId || ''
    const result = await projectService.getSingleProject(projectSlug);
    res.status(200).json({
        success: true,
        massage: 'Single project retrieve successfully',
        data: result
    })
})

const deleteProject = catchAsync(async (req: Request, res: Response) => {
    const projectId = req.params.id || ''
    const result = await projectService.deleteProject(projectId);
    res.status(200).json({
        success: true,
        massage: 'project delete successfully',
        data: result
    })
})

const updateProject = catchAsync(async (req: Request, res: Response) => {
    const projectId = req.params.projectId || ''
    const projectData = req.body

    const result = await projectService.updateProject(projectData, projectId);

    res.status(200).json({
        success: true,
        massage: 'project Update successfully',
        data: result
    })
})

export const projectController = {
    creteNewProject,
    getAllProjects,
    getSingleProject,
    deleteProject,
    updateProject
}