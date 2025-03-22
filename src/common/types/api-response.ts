interface APIResponse<T> {
    success: boolean;
    data: T | null;
    message: string | null;
}

export default APIResponse