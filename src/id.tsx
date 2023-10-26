const now = new Date();
let index = 0;
export default function idGenerator() {
    return `${now.getTime()}-${++index}`;
}