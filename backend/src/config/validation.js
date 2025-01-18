import {z} from 'zod'

const signupBodyValidator = z.object({
    username: z.string().email().trim(),
    firstName: z.string().trim(),
    lastName: z.string().trim(),
    password: z.string().trim()
}).required({
    username: true,
    firstName: true,
    lastName: true,
    password: true
})

const signinBodyValidator = z.object({
    username: z.string().email(),
    password: z.string().trim()
})

const updateBodyValidator = z.object({
    password: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
})


export{
    signupBodyValidator,
    signinBodyValidator,
    updateBodyValidator
}