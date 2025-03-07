export default function throttleEvt(func: { (): void; (arg0: never): void; }, delay: number): (...args: never[]) => void {
    let resizeTimer: number | null = null;
    return (...args) => {
        if (!resizeTimer) {
            func(...args);
            resizeTimer = setTimeout(() => {
                resizeTimer = null;
            }, delay);
        }
    }
}
