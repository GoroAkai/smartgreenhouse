// src/utils/uty.ts

export const toJSTISOString = (date: Date): string => {
    const pad = (n: number) => n.toString().padStart(2, '0');

    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hour = pad(date.getHours());
    const minute = pad(date.getMinutes());
    const second = pad(date.getSeconds());

    return `${year}-${month}-${day}T${hour}:${minute}:${second}+09:00`;
};

export const getEnvironmentSuffix = () => {
    const branch = process.env.AWS_BRANCH;
    console.log("uty - AWS_BRANCH:", branch);
    if (!branch) return 'LOCAL';
    switch (branch) {
        case 'develop':
            return 'DEV';
        case 'main':
            return 'PROD';
        default:
            return branch.toUpperCase();
    }
};
