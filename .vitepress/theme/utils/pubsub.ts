type ThemeCallback = (val: string) => void;

export default {
    events: {},

    // 订阅事件
    subscribe(event: string, callback: ThemeCallback) {
        if (!this.events[event]) {
            this.events[event] = {};
        }
        const key = Date.now().toString(); // 生成唯一的键值
        this.events[event][key] = callback;
        return key; // 返回键值
    },

    // 取消订阅
    unsubscribe(event: string, key: string) {
        if (this.events[event] && this.events[event][key]) {
            delete this.events[event][key];
        }
    },

    // 发布通知
    publish(event: string, data: string) {
        const callbacks = this.events[event] as Record<string, ThemeCallback>;
        if (callbacks) {
            Object.values(callbacks).forEach(callback => {
                callback(data);
            });
        }
    }
};