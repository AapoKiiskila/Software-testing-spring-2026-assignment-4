import { describe,expect, test, vi, beforeEach, afterEach } from "vitest"
import request from "supertest"
import { app } from "../index"
import { Request, Response } from "express"
import * as dogController from "../controllers/dogController"

vi.mock("../controllers/dogController")

describe("Dog routes", () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    afterEach(() => {
        vi.resetAllMocks()
    })

    // Test 4
    test("Successful GET request to /api/dogs/random", async () => {
        vi.mocked(dogController.getDogImage).mockImplementation(
            async (req: Request, res: Response) => {
                res.status(200).json({ 
                    success: true, 
                    data: { 
                        imageUrl: "https://images.dog.ceo/breeds/stbernard/n02109525_15579.jpg", 
                        status: "success"
                    }
                })
            }
        )

        const res = await request(app).get("/api/dogs/random")

        expect(res.status).toBe(200)
        expect(res.body.success).toEqual(true)
        expect(res.body.data.imageUrl).toEqual("https://images.dog.ceo/breeds/stbernard/n02109525_15579.jpg")   
    })

    // Test 5
    test("Unsuccessful GET request to /api/dogs/random", async () => {
        vi.mocked(dogController.getDogImage).mockImplementation(
            async (req: Request, res: Response) => {
                res.status(500).json({ 
                    success: false, 
                    error: "Failed to fetch dog image: Network error"
                })
            }
        )

        const res = await request(app).get("/api/dogs/random")

        expect(res.status).toBe(500)
        expect(res.body).toHaveProperty("error")
        expect(res.body.error).toEqual("Failed to fetch dog image: Network error")
    })
})