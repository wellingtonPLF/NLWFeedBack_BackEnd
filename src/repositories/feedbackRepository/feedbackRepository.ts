export interface FeedBackCreateData {
    type: string,
    comment: string,
    screenshot?: string
}

export interface FeedbackRepository {
    create: (data: FeedBackCreateData) => Promise<void>;
}