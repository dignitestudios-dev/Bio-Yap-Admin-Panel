type AsyncFunction<T = any> = (...args: any[]) => Promise<T>;

export const asyncHandler = <T = any>(
  fn: AsyncFunction<T>,
  onError?: (error: any) => void
): ((...args: any[]) => Promise<T | void>) => {
  return async (...args: any[]) => {
    try {
      return await fn(...args);
    } catch (error) {
      console.error("Caught by asyncHandler:", error);
      if (onError) onError(error);
    }
  };
};
