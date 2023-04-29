export default class Info {
    /* This is a static method called `get` that takes in two parameters `args` and `process_env`. It
    returns an object with various information about the current environment and process, including
    the operating system, Node.js version, reserved memory usage, current working directory, root
    folder name, and process ID. */
    static get = (args, process_env) => {
        return {
            args,
            so: process_env.platform,
            node: process_env.version,
            reserved_memory: process_env.memoryUsage().heapUsed,
            root: process_env.cwd(),
            root_folder: process_env.cwd().split('\\').pop(),
            process_id: process_env.pid,
        }
    }
}
