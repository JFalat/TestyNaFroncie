import { getTheBestPromotionForDate } from "../getTheBestPromotionForDate";
import { getPromotions } from "../../mocks/getPromotion";

describe("getTheBestPromotionForDate", () => {
    it("should returned expected promotion", () => {
        const currentDate = new Date("2021-06-23");
        const promotions = getPromotions();
        const promotion = getTheBestPromotionForDate(currentDate, promotions);
        expect(promotion).toEqual(expect.objectContaining({ name: "Dzień dziecka" }));
    });
    //test finds issue- Expected: null Received: undefined
    it("should return nothing", () => {
        const currentDate = new Date("2025-06-23");
        const promotions = getPromotions();
        const promotion = getTheBestPromotionForDate(currentDate, promotions);
        expect(promotion).toBe(null);
    });
   

});