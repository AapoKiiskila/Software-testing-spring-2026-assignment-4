import { describe, expect, test, vi, beforeEach, afterEach } from "vitest"
import { getRandomDogImage } from "../services/dogService"

describe('dogService.getRandomDogImage', () => {
    beforeEach(() => {
        global.fetch = vi.fn()
    })

    afterEach(() => {
        vi.clearAllMocks()
        vi.resetAllMocks()
    })

    test("Positive test", async () => {
        const response = {
            message: "https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg",
            status: "success" 
        }
        
        const spy = vi.fn(fetch).mockResolvedValue({
            ok: true,
            json: async () => response
        } as Response)

        const result = await getRandomDogImage()

        expect(result).toEqual({imageUrl: response.message, status: "success"})
        expect(spy).toHaveBeenCalledOnce()
    })

    // Test 2
    test("Negative test", async () => {
        vi.mocked(fetch).mockResolvedValue({
            ok: false,
            status: 500
        } as Response)

        await expect(getRandomDogImage()).rejects.toThrow("Failed to fetch dog image: Dog API returned status 500")
    })
})
