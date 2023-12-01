export function debounce(fn: (event: Event) => void, delay: number) {
    let timer: any;
    return function (e: Event) {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => fn(e), delay);
    }
}

export function transTime(date: string | number) {
    if (!date) return "";
    return new Date(date).toJSON().split("T")[0];
}
