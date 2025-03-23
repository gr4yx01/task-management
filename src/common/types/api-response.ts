interface APIResponse<T> {
    success: boolean;
    data: T | null;
    message: string | string[];
}

export default APIResponse