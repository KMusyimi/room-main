export default function throttleEvt(func: { (): void; (arg0: never): void; }, delay: number) {
    let resizeTimer: number | null = null;
    return (...args: any) => {
        if (!resizeTimer) {
            // @ts-ignore
            func(...args);
            resizeTimer = setTimeout(() => {
                resizeTimer = null;
            }, delay);
        }
    }
}
