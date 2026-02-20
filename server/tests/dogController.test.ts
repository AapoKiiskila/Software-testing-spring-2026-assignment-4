import { describe, expect, test, vi } from "vitest"
import * as dogService from "../services/dogService"
import { getDogImage } from "../controllers/dogController"

vi.mock("../services/dogService")

const createMockResponse = () => {
    const res: any = {}
    res.status = vi.fn().mockReturnThis()
    res.json = vi.fn()
    return res
}

// Test 3
describe("dogController.getDogImage",() => {
    test("JSON returned by the getDogImage function contains success true and mocked JSON", async () => {
        const req: any = {}
        const res = createMockResponse()

        const data = {
            imageUrl: "https://images.dog.ceo/breeds/stbernard/n02109525_15579.jpg",
            status: "success"
        }

        vi.mocked(dogService.getRandomDogImage).mockResolvedValue(data)

        await getDogImage(req, res)

        expect(res.json).toHaveBeenCalledWith({
            "success": true,
            "data": data
        })
            
    })
})