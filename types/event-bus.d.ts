export default function EventBus(): {
    on: (name: string, fn: Function) => void;
    off: (name: string, fn: Function) => void;
    emit: (name: string, ...args: any[]) => void;
    emitThen: (eventName: string, ...rest: any[]) => Promise<any>;
};
