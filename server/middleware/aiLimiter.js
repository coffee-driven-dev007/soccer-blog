import rateLimit from "express-rate-limit";

export const aiLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 2, // 2 AI requests per minute per IP
    message: {
        success: false,
        message: "Too many AI requests. Please wait.",
    },
});
