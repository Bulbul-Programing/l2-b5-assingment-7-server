import { prisma } from "../../config/db"
import AppError from "../../error/AppError"
import type { TProject } from "./project.interface";
import bcrypt from 'bcrypt';

const creteNewProject = async (payload: TProject) => {
    if (!payload.slug) {
        const splitTitle = payload.title.split(' ').join('-').toLocaleLowerCase()
        payload.slug = splitTitle
    }

    const isUserOwner = await prisma.user.findUnique({
        where: {
            id: payload.ownerId
        }
    })

    if (!isUserOwner) {
        throw new AppError(400, 'User Not Found!')
    }
    if (isUserOwner.role !== 'OWNER') {
        throw new AppError(400, 'User not validate for this action !')
    }

    const result = await prisma.project.create({
        data: payload
    })
    return result
}

const getAllProjects = async () => {
    const result = await prisma.project.findMany()
    return result
}

const getSingleProject = async (projectSlug: string) => {
    const result = await prisma.project.findUnique({
        where: {
            slug: projectSlug
        }
    })
    return result
}

const deleteProject = async (ProjectId: string) => {
    const isExistProject = await prisma.project.findUnique({
        where: {
            id: Number(ProjectId)
        }
    })

    if (!isExistProject) {
        throw new AppError(404, "Project Not Found!")
    }


    const result = await prisma.project.delete({
        where: {
            id: Number(ProjectId)
        }
    })
    return null
}

const updateProject = async (payload: Partial<TProject>, ProjectId: string) => {
    if (payload.ownerId) {
        throw new AppError(500, "You can't change author ID!")
    }

    const isExistProject = await prisma.project.findUnique({
        where: {
            id: Number(ProjectId)
        }
    })

    if (!isExistProject) {
        throw new AppError(404, "Project Not Found!")
    }

    if (payload.title) {
        const splitTitle = payload.title.split(' ').join('-').toLocaleLowerCase()
        payload.slug = splitTitle
    }

    const result = await prisma.project.update({
        where: {
            id: Number(ProjectId)
        },
        data: payload
    })

    return result
}

export const projectService = {
    creteNewProject,
    getAllProjects,
    getSingleProject,
    deleteProject,
    updateProject
}